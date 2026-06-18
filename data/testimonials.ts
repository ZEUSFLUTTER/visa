import { getApprovedTestimonials, getTestimonials, getTestimonialById } from '@/lib/db';

export async function getApprovedTestimonialsFromDB() {
  return await getApprovedTestimonials();
}

export { getTestimonials, getTestimonialById };

// For backwards compatibility, we'll keep the old data but it's not used anymore
export const testimonials = [];
