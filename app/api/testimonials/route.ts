import { NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await createTestimonial({
      ...body,
      id: body.id || Date.now().toString()
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
