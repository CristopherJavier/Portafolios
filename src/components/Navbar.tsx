import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  initials: string;
  name: string;
  availability: string;
}

export default function Navbar({ initials, name, availability }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#presentation');

  // Sticky menu auto-hide on scroll-down, show on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle active navigation item based on section element intersections
  useEffect(() => {
    const sections = ['presentation', 'about', 'journey', 'skills', 'projects', 'github_activity', 'education', 'goals', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies center part
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: "Inicio", target: "#presentation" },
    { label: "Sobre mí", target: "#about" },
    { label: "Progreso", target: "#journey" },
    { label: "Habilidades", target: "#skills" },
    { label: "Proyectos", target: "#projects" },
    { label: "Contacto", target: "#contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 bg-portfolio-bg-alt/90 backdrop-blur-md border-b border-portfolio-border ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / Initials */}
        <a
          href="#presentation"
          onClick={(e) => handleNavClick(e, '#presentation')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-2 rounded-lg p-1"
          aria-label={`Ir al inicio - Portafolio de ${name}`}
        >
          <div className="w-10 h-10 bg-portfolio-primary text-white rounded-lg flex items-center justify-center font-display font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
            {initials}
          </div>
          <div className="hidden sm:block">
            <span className="block font-display font-semibold text-sm text-portfolio-text-primary leading-none">
              {name}
            </span>
            <span className="text-[10px] text-portfolio-text-secondary flex items-center gap-1.5 mt-0.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-portfolio-success animate-pulse inline-block"></span>
              {availability}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.target}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className={`px-4 py-2 text-xs font-medium tracking-wide rounded-md transition-all duration-200 uppercase focus:outline-none ${
                activeSection === item.target
                  ? 'text-portfolio-accent bg-blue-50/50'
                  : 'text-portfolio-text-secondary hover:text-portfolio-text-primary hover:bg-slate-50'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="ml-3 px-4 py-2 bg-portfolio-primary text-white hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1"
          >
            <span>Contacto</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-portfolio-accent" />
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-portfolio-text-secondary hover:text-portfolio-text-primary focus:outline-none focus:ring-2 focus:ring-portfolio-accent rounded-md"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-nav-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-portfolio-border ${
          isMobileMenuOpen ? 'max-h-screen opacity-100 py-4 bg-portfolio-bg-alt' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.target}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeSection === item.target
                  ? 'text-portfolio-accent bg-blue-50/50 font-bold'
                  : 'text-portfolio-text-secondary hover:text-portfolio-text-primary hover:bg-slate-50'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center justify-center gap-2 w-full py-3 bg-portfolio-primary text-white hover:bg-slate-800 text-sm font-bold uppercase tracking-wider rounded transition-colors mt-2"
          >
            <span>Conectar</span>
            <ArrowUpRight className="w-4 h-4 text-portfolio-accent" />
          </a>
        </nav>
      </div>
    </header>
  );
}
