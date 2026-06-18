import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL?.includes('localhost') 
    ? undefined 
    : { 
        rejectUnauthorized: false // Nécessaire pour Supabase et autres services cloud
      },
});

let initialized = false;

// Initialize database tables
export async function initDatabase() {
  if (initialized) return;
  
  // Si pas de POSTGRES_URL, ne pas initialiser (mode build sans DB)
  if (!process.env.POSTGRES_URL) {
    console.log('⚠️  No POSTGRES_URL found - skipping database initialization');
    initialized = true;
    return;
  }
  
  // En mode build Vercel, ne pas se connecter à la DB
  if (process.env.VERCEL && process.env.NEXT_PHASE === 'phase-production-build') {
    console.log('⚠️  Build phase detected - skipping database initialization');
    initialized = true;
    return;
  }
  
  try {
    const client = await pool.connect();
    try {
      // Create cancers table
      await client.query(`
        CREATE TABLE IF NOT EXISTS cancers (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          color VARCHAR(20),
          image TEXT,
          shortDescription TEXT,
          description TEXT,
          epidemiology TEXT,
          riskPopulation TEXT,
          riskFactors JSONB,
          symptoms JSONB,
          screening JSONB,
          testimonials JSONB,
          resources JSONB
        );
      `).catch(err => {
        if (err.code !== '42P07') throw err; // Ignorer "table already exists"
      });

      // Create testimonials table
      await client.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          image TEXT,
          story TEXT NOT NULL,
          cancerType VARCHAR(255),
          date VARCHAR(50),
          approved BOOLEAN DEFAULT TRUE
        );
      `).catch(err => {
        if (err.code !== '42P07') throw err;
      });

      // Create blog posts table
      await client.query(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          image TEXT,
          author VARCHAR(255),
          publishedDate VARCHAR(50),
          readTime INTEGER,
          category VARCHAR(100),
          tags JSONB,
          published BOOLEAN DEFAULT TRUE
        );
      `).catch(err => {
        if (err.code !== '42P07') throw err;
      });

      initialized = true;
      console.log('Database initialized successfully');
    } finally {
      client.release();
    }
  } catch (error) {
    // Ne pas bloquer si les tables existent déjà ou si connexion échoue
    console.log('Database initialization completed (tables may already exist or connection unavailable)');
    initialized = true;
  }
}

// Cancers operations
export async function getCancers() {
  await initDatabase();
  
  // Fallback si pas de DB : retourner les données du fichier JSON
  if (!process.env.POSTGRES_URL) {
    const fs = require('fs');
    const path = require('path');
    try {
      const dataPath = path.join(process.cwd(), 'data', 'cancers.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data;
    } catch (error) {
      console.error('Error reading cancers.json:', error);
      return [];
    }
  }
  
  const result = await pool.query('SELECT * FROM cancers');
  return result.rows.map(row => ({
    ...row,
    riskFactors: row.riskfactors || { modifiable: [], nonModifiable: [] },
    symptoms: row.symptoms || { early: [], advanced: [], warningSign: [] },
    screening: row.screening || { primaryPrevention: [], availableTests: [], recommendations: [], resultsInterpretation: '', screeningCenters: [] },
    testimonials: row.testimonials || [],
    resources: row.resources || []
  }));
}

export async function getCancerById(id: string) {
  await initDatabase();
  
  // Fallback si pas de DB : retourner les données du fichier JSON
  if (!process.env.POSTGRES_URL) {
    const fs = require('fs');
    const path = require('path');
    try {
      const dataPath = path.join(process.cwd(), 'data', 'cancers.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data.find((c: any) => c.id === id) || null;
    } catch (error) {
      console.error('Error reading cancers.json:', error);
      return null;
    }
  }
  
  const result = await pool.query('SELECT * FROM cancers WHERE id = $1', [id]);
  const row = result.rows[0];
  if (!row) return null;
  return {
    ...row,
    riskFactors: row.riskfactors || { modifiable: [], nonModifiable: [] },
    symptoms: row.symptoms || { early: [], advanced: [], warningSign: [] },
    screening: row.screening || { primaryPrevention: [], availableTests: [], recommendations: [], resultsInterpretation: '', screeningCenters: [] },
    testimonials: row.testimonials || [],
    resources: row.resources || []
  };
}

export async function createCancer(cancer: any) {
  await initDatabase();
  await pool.query(`
    INSERT INTO cancers (
      id, name, color, image, shortDescription, description, 
      epidemiology, riskPopulation, riskFactors, symptoms, 
      screening, testimonials, resources
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  `, [
    cancer.id, cancer.name, cancer.color, cancer.image, 
    cancer.shortDescription, cancer.description, cancer.epidemiology, 
    cancer.riskPopulation, JSON.stringify(cancer.riskFactors || { modifiable: [], nonModifiable: [] }), 
    JSON.stringify(cancer.symptoms || { early: [], advanced: [], warningSign: [] }), 
    JSON.stringify(cancer.screening || { primaryPrevention: [], availableTests: [], recommendations: [], resultsInterpretation: '', screeningCenters: [] }), 
    JSON.stringify(cancer.testimonials || []), JSON.stringify(cancer.resources || [])
  ]);
  return cancer;
}

export async function updateCancer(id: string, updates: any) {
  await initDatabase();
  await pool.query(`
    UPDATE cancers SET
      name = $2,
      color = $3,
      image = $4,
      shortDescription = $5,
      description = $6,
      epidemiology = $7,
      riskPopulation = $8,
      riskFactors = $9,
      symptoms = $10,
      screening = $11,
      testimonials = $12,
      resources = $13
    WHERE id = $1
  `, [
    id,
    updates.name,
    updates.color,
    updates.image,
    updates.shortDescription,
    updates.description,
    updates.epidemiology,
    updates.riskPopulation,
    JSON.stringify(updates.riskFactors || { modifiable: [], nonModifiable: [] }),
    JSON.stringify(updates.symptoms || { early: [], advanced: [], warningSign: [] }),
    JSON.stringify(updates.screening || { primaryPrevention: [], availableTests: [], recommendations: [], resultsInterpretation: '', screeningCenters: [] }),
    JSON.stringify(updates.testimonials || []),
    JSON.stringify(updates.resources || [])
  ]);
  return getCancerById(id);
}

export async function deleteCancer(id: string) {
  await initDatabase();
  await pool.query('DELETE FROM cancers WHERE id = $1', [id]);
}

// Testimonials operations
export async function getTestimonials() {
  await initDatabase();
  
  // Fallback si pas de DB
  if (!process.env.POSTGRES_URL) {
    const fs = require('fs');
    const path = require('path');
    try {
      const dataPath = path.join(process.cwd(), 'data', 'testimonials.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data;
    } catch (error) {
      return [];
    }
  }
  
  const result = await pool.query('SELECT * FROM testimonials');
  return result.rows;
}

export async function getApprovedTestimonials() {
  await initDatabase();
  
  // Fallback si pas de DB
  if (!process.env.POSTGRES_URL) {
    const fs = require('fs');
    const path = require('path');
    try {
      const dataPath = path.join(process.cwd(), 'data', 'testimonials.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data.filter((t: any) => t.approved !== false);
    } catch (error) {
      return [];
    }
  }
  
  const result = await pool.query('SELECT * FROM testimonials WHERE approved = TRUE');
  return result.rows;
}

export async function getTestimonialById(id: string) {
  await initDatabase();
  const result = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createTestimonial(testimonial: any) {
  await initDatabase();
  await pool.query(`
    INSERT INTO testimonials (id, name, image, story, cancerType, date, approved)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `, [
    testimonial.id, testimonial.name, testimonial.image, 
    testimonial.story, testimonial.cancerType, 
    testimonial.date, testimonial.approved ?? true
  ]);
  return testimonial;
}

export async function updateTestimonial(id: string, updates: any) {
  await initDatabase();
  await pool.query(`
    UPDATE testimonials SET
      name = $2,
      image = $3,
      story = $4,
      cancerType = $5,
      date = $6,
      approved = $7
    WHERE id = $1
  `, [
    id,
    updates.name,
    updates.image,
    updates.story,
    updates.cancerType,
    updates.date,
    updates.approved
  ]);
  return getTestimonialById(id);
}

export async function deleteTestimonial(id: string) {
  await initDatabase();
  await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
}

// Blog operations
export async function getBlogPosts() {
  await initDatabase();
  
  // Fallback si pas de DB
  if (!process.env.POSTGRES_URL) {
    const fs = require('fs');
    const path = require('path');
    try {
      const dataPath = path.join(process.cwd(), 'data', 'blog.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data;
    } catch (error) {
      return [];
    }
  }
  
  const result = await pool.query('SELECT * FROM blog_posts');
  return result.rows.map(row => ({
    ...row,
    tags: row.tags || []
  }));
}

export async function getBlogPostBySlug(slug: string) {
  await initDatabase();
  
  // Fallback si pas de DB
  if (!process.env.POSTGRES_URL) {
    const fs = require('fs');
    const path = require('path');
    try {
      const dataPath = path.join(process.cwd(), 'data', 'blog.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data.find((p: any) => p.slug === slug) || null;
    } catch (error) {
      return null;
    }
  }
  
  const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
  const row = result.rows[0];
  if (!row) return null;
  return {
    ...row,
    tags: row.tags || []
  };
}

export async function createBlogPost(post: any) {
  await initDatabase();
  await pool.query(`
    INSERT INTO blog_posts (
      id, title, slug, excerpt, content, image, 
      author, publishedDate, readTime, category, tags, published
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `, [
    post.id, post.title, post.slug, post.excerpt, post.content, 
    post.image, post.author, post.publishedDate, post.readTime, 
    post.category, JSON.stringify(post.tags || []), post.published ?? true
  ]);
  return post;
}

export async function updateBlogPost(slug: string, updates: any) {
  await initDatabase();
  await pool.query(`
    UPDATE blog_posts SET
      title = $2,
      slug = $3,
      excerpt = $4,
      content = $5,
      image = $6,
      author = $7,
      publishedDate = $8,
      readTime = $9,
      category = $10,
      tags = $11,
      published = $12
    WHERE slug = $1
  `, [
    slug,
    updates.title,
    updates.slug,
    updates.excerpt,
    updates.content,
    updates.image,
    updates.author,
    updates.publishedDate,
    updates.readTime,
    updates.category,
    JSON.stringify(updates.tags || []),
    updates.published
  ]);
  return getBlogPostBySlug(updates.slug || slug);
}

export async function deleteBlogPost(slug: string) {
  await initDatabase();
  await pool.query('DELETE FROM blog_posts WHERE slug = $1', [slug]);
}

// Insert initial data if tables are empty
export async function seedDatabase() {
  await initDatabase();
  console.log('Database ready, no static data seeded.');
}

// Initialize and seed on module load
seedDatabase().catch(err => console.error('Error initializing database:', err));
