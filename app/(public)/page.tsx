import TestimonialCarousel from '@/components/TestimonialCarousel';
import { getApprovedTestimonials } from '@/lib/db';
import { initDatabase, seedDatabase } from '@/lib/db';

// Initialize and seed database on startup
async function initializeDB() {
  try {
    await initDatabase();
    await seedDatabase();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDB();

export default async function Home() {
  const testimonials = await getApprovedTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        <TestimonialCarousel testimonials={testimonials} />
      </section>
    </div>
  );
}

