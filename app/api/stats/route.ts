import { NextResponse } from 'next/server';
import { getCancers, getTestimonials, getBlogPosts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cancers = await getCancers();
    const testimonials = await getTestimonials();
    const blogPosts = await getBlogPosts();

    const pendingTestimonials = testimonials.filter((t: any) => !t.approved);
    const approvedTestimonials = testimonials.filter((t: any) => t.approved);
    const publishedPosts = blogPosts.filter((p: any) => p.published);

    // 5 most recent testimonials (pending first)
    const recentTestimonials = [...pendingTestimonials, ...approvedTestimonials]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map((t: any) => ({
        id: t.id,
        name: t.name,
        cancerType: t.cancerType,
        excerpt: t.story.slice(0, 80) + '...',
        date: t.date,
        approved: t.approved,
      }));

    // 3 most recent blog posts
    const recentPosts = blogPosts
      .sort((a: any, b: any) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, 3)
      .map((p: any) => ({
        id: p.id,
        title: p.title,
        author: p.author,
        publishedDate: p.publishedDate,
        category: p.category,
        published: p.published,
        image: p.image,
      }));

    return NextResponse.json({
      stats: {
        testimonials: testimonials.length,
        approvedTestimonials: approvedTestimonials.length,
        pendingTestimonials: pendingTestimonials.length,
        blogPosts: blogPosts.length,
        publishedPosts: publishedPosts.length,
        cancers: cancers.length,
      },
      recentTestimonials,
      recentPosts,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
