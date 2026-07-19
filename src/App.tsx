import { useState, useEffect } from 'react';
import { defaultPortfolioData } from './data';
import { PortfolioData } from './types';
import Navbar from './components/Navbar';
import Presentation from './components/Presentation';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import EducationAndGoals from './components/EducationAndGoals';
import Contact from './components/Contact';
import Customizer from './components/Customizer';
import { Heart, Shield } from 'lucide-react';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);

  // Load custom data from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_developer_custom_data');
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved));
      } catch (e) {
        // Fallback to defaults on corrupt storage
        setPortfolioData(defaultPortfolioData);
      }
    }
  }, []);

  const handleSaveCustomData = (updatedData: PortfolioData) => {
    setPortfolioData(updatedData);
    localStorage.setItem('portfolio_developer_custom_data', JSON.stringify(updatedData));
  };

  const handleResetCustomData = () => {
    setPortfolioData(defaultPortfolioData);
    localStorage.removeItem('portfolio_developer_custom_data');
  };

  const profile = portfolioData.personalProfile;

  return (
    <div className="min-h-screen bg-portfolio-bg-main flex flex-col justify-between selection:bg-blue-100 selection:text-portfolio-accent">
      
      {/* Dynamic Sticky Navigation Bar */}
      <Navbar
        initials={profile.initials}
        name={profile.name}
        availability={profile.availability}
      />

      {/* Main Sections Body */}
      <main className="flex-1 w-full" id="main-content">
        
        {/* Presentation Hero Section */}
        <Presentation profile={profile} />

        {/* Humanized Profile Section */}
        <About bio={profile.bio} />

        {/* Timeline curriculum progress */}
        <Journey milestones={portfolioData.milestones} />

        {/* Honest tech categorization */}
        <Skills categories={portfolioData.skillCategories} />

        {/* Dual pane projects & playgrounds */}
        <Projects items={portfolioData.projects} />

        {/* Habit building GitHub representation */}
        <GitHubActivity
          contributions={portfolioData.githubActivity.contributions}
          message={portfolioData.githubActivity.message}
          githubUrl={profile.social.github}
        />

        {/* Education verification & Objectives */}
        <EducationAndGoals
          education={portfolioData.education}
          goals={portfolioData.goals}
        />

        {/* Contact direct messaging form & Copy Mail */}
        <Contact
          email={profile.social.email}
          message={portfolioData.contact?.message || "Actualmente estoy buscando mi primera oportunidad profesional como desarrollador junior. Si mi perfil encaja con lo que buscas o simplemente quieres conectar, envíame un mensaje."}
          social={profile.social}
        />

      </main>

      {/* Dynamic Customizer Control Panel */}
      <Customizer
        data={portfolioData}
        onSave={handleSaveCustomData}
        onReset={handleResetCustomData}
      />

      {/* Ethical and semantic footer */}
      <footer className="bg-portfolio-primary text-slate-300 py-12 px-6 border-t border-slate-800 font-sans" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-display font-bold text-white text-sm">
              {profile.name} — Portafolio Profesional
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Compromiso de accesibilidad universal & veracidad de habilidades
            </p>
          </div>

          {/* Code Ethics indicator badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded">
            <Shield className="w-4 h-4 text-portfolio-accent shrink-0" />
            <span className="font-mono text-[10px]">
              Código Ético IEEE-CS / ACM
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>Construido con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para la web</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
