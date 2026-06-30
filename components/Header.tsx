'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/cancers', label: 'Cancers Féminins' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-pink-50 shadow-md py-2'
          : 'bg-pink-50/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white">
              <Image
                src="/logo.png"
                alt="Logo VISA"
                width={64}
                height={64}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-gray-600">Prévention du Cancer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donation"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              Faire un Don
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/donation"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium text-center hover:shadow-lg transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Faire un Don
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
