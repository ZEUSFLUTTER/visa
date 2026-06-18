'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '@/types/admin';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play avec boucle infinie
  useEffect(() => {
    if (testimonials.length <= 1) return; // Pas de rotation si 1 seul témoignage

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change toutes les 6 secondes (plus de temps pour lire)

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (testimonials.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Aucun témoignage disponible</p>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative min-h-[100svh] min-h-screen w-full overflow-hidden">
      {/* Background avec overlay */}
      <div className="absolute inset-0">
        {currentTestimonial.image ? (
          <img
            src={currentTestimonial.image}
            alt={currentTestimonial.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-black/60 to-pink-900/80" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 min-h-[100svh] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
          {/* Type de cancer (si disponible) */}
          {currentTestimonial.cancerType && (
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-xs md:text-sm border border-white/20">
                {currentTestimonial.cancerType}
              </span>
            </div>
          )}

          {/* Témoignage */}
          <blockquote className="mb-6 md:mb-8 max-w-3xl lg:max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-relaxed mb-4 md:mb-6 drop-shadow-xl line-clamp-4 md:line-clamp-5">
              "{currentTestimonial.story}"
            </p>
          </blockquote>

          {/* Nom */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="h-0.5 md:h-1 w-8 md:w-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
            <p className="text-lg md:text-xl lg:text-2xl text-white font-semibold">
              {currentTestimonial.name}
            </p>
            <div className="h-0.5 md:h-1 w-8 md:w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mt-6 md:mt-8">
            <a
              href="/cancers"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 md:hover:-translate-y-1 w-full sm:w-auto text-center text-sm md:text-base"
            >
              En Savoir Plus
            </a>
            <a
              href="/contact"
              className="bg-white/10 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/30 w-full sm:w-auto text-center text-sm md:text-base"
            >
              Partager Votre Histoire
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 md:p-3 rounded-full transition-all disabled:opacity-50 border border-white/20"
        aria-label="Témoignage précédent"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 md:p-3 rounded-full transition-all disabled:opacity-50 border border-white/20"
        aria-label="Témoignage suivant"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 md:w-12 bg-gradient-to-r from-pink-500 to-purple-500'
                : 'w-1.5 md:w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-1.5 md:gap-2 text-white/60">
          <span className="text-xs md:text-sm font-medium">Défiler vers le bas</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
