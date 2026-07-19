import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Code, Database, FileText, Layout, Play } from 'lucide-react';
import { PersonalProfile } from '../types';

interface PresentationProps {
  profile: PersonalProfile;
}

export default function Presentation({ profile }: PresentationProps) {
  const [showCVModal, setShowCVModal] = useState(false);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Abstract background code snippets for aesthetic touch
  const codeSnippets = [
    { text: 'import { useState } from "react";', top: '15%', left: '8%' },
    { text: 'SELECT * FROM alumnos JOIN tutores ON ...', top: '22%', left: '60%' },
    { text: 'const db = new SQLRelationalSchema();', top: '75%', left: '10%' },
    { text: 'interface JuniorDeveloper extends Human {', top: '65%', left: '72%' },
    { text: '  availability: "FullTime" | "Remote";', top: '70%', left: '74%' },
    { text: '}', top: '75%', left: '74%' },
    { text: 'useEffect(() => { buildHabit() }, []);', top: '40%', left: '82%' },
  ];

  return (
    <section
      id="presentation"
      className="relative min-height-[100vh] flex flex-col items-center justify-center bg-portfolio-bg-main overflow-hidden py-20 px-6"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Code background snippets */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden hidden md:block" aria-hidden="true">
        {codeSnippets.map((snippet, idx) => (
          <div
            key={idx}
            className="absolute text-[11px] font-mono text-slate-300 opacity-30 hover:opacity-90 hover:text-portfolio-accent transition-all duration-500 bg-slate-100/50 p-1.5 rounded border border-slate-200/40 shadow-xs pointer-events-auto cursor-default"
            style={{ top: snippet.top, left: snippet.left }}
          >
            {snippet.text}
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-portfolio-border rounded-full shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-portfolio-success animate-pulse"></span>
          <span className="text-xs font-medium text-portfolio-text-secondary uppercase tracking-wider font-mono">
            {profile.status}
          </span>
        </motion.div>

        {/* Dynamic Title Hierarchy */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-portfolio-accent font-mono font-medium tracking-widest text-sm uppercase"
          >
            Hola, soy
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="font-display font-bold text-portfolio-text-primary tracking-tight"
            style={{ fontSize: 'var(--typography-scale-h1, clamp(2.5rem, 6vw, 4rem))' }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="font-display font-medium text-portfolio-text-secondary tracking-tight text-lg max-w-2xl mx-auto sm:text-xl"
          >
            {profile.role}
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="text-portfolio-text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
        >
          Construyendo interfaces, diagramas estructurados y resolviendo problemas técnicos un commit a la vez. Comprometido con la ética, transparencia y accesibilidad.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4"
        >
          <button
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-8 py-3.5 bg-portfolio-primary hover:bg-slate-800 text-white font-semibold rounded shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            aria-label="Ver mis proyectos reales"
          >
            <span>Ver proyectos</span>
            <Play className="w-4 h-4 text-portfolio-accent transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => setShowCVModal(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-portfolio-text-primary border border-portfolio-border font-semibold rounded shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            aria-label="Ver y guardar Curriculum Vitae"
          >
            <FileText className="w-4 h-4 text-portfolio-text-secondary" />
            <span>Descargar CV / Resumen</span>
          </button>
        </motion.div>

        {/* Micro pillars of learning representation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid grid-cols-3 gap-6 pt-16 max-w-lg mx-auto w-full border-t border-slate-200/60"
        >
          <div className="flex flex-col items-center">
            <Layout className="w-5 h-5 text-portfolio-accent mb-2" />
            <span className="text-[10px] font-mono text-portfolio-text-secondary uppercase tracking-wider font-semibold">Frontend</span>
          </div>
          <div className="flex flex-col items-center">
            <Database className="w-5 h-5 text-portfolio-accent mb-2" />
            <span className="text-[10px] font-mono text-portfolio-text-secondary uppercase tracking-wider font-semibold">Bases de Datos</span>
          </div>
          <div className="flex flex-col items-center">
            <Code className="w-5 h-5 text-portfolio-accent mb-2" />
            <span className="text-[10px] font-mono text-portfolio-text-secondary uppercase tracking-wider font-semibold">Lógica Pura</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer select-none"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] font-mono text-portfolio-text-secondary uppercase tracking-widest font-semibold">Scroll para descubrir</span>
          <ArrowDown className="w-4 h-4 text-portfolio-accent animate-bounce" />
        </motion.div>
      </div>

      {/* CV Modal / Printable CV Sheet */}
      {showCVModal && (
        <div className="fixed inset-0 bg-black/65 z-100 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col animate-fade-in text-left">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-portfolio-accent" />
                <span className="font-display font-semibold text-portfolio-text-primary text-sm sm:text-base">Currículum Profesional - {profile.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-portfolio-accent hover:bg-portfolio-accent-hover text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Imprimir / Guardar PDF</span>
                </button>
                <button
                  onClick={() => setShowCVModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Cerrar currículum"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Area */}
            <div className="p-8 sm:p-12 overflow-y-auto flex-1 id-printable-cv" id="cv-print-area">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b-2 border-portfolio-primary pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold font-display text-slate-900">{profile.name}</h2>
                    <p className="text-sm font-medium text-portfolio-accent font-mono mt-1">{profile.role}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{profile.location}</p>
                  </div>
                  <div className="text-right text-xs text-slate-600 font-mono space-y-1">
                    <p>📧 {profile.social.email}</p>
                    <p>🔗 {profile.social.github.replace('https://', '')}</p>
                    <p>🔗 {profile.social.linkedin.replace('https://', '')}</p>
                  </div>
                </div>

                {/* Perfil */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">Perfil Profesional</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                {/* Fundamentos Técnicos */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">Fundamentos Técnicos</h3>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">Uso con confianza:</p>
                      <p className="text-slate-600 mt-1">HTML5, CSS3, JavaScript (ES6+), Consultas Relacionales SQL, Modelado de Datos (Draw.io)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">En práctica continua:</p>
                      <p className="text-slate-600 mt-1">React, C#, Git, Gestión de versiones de GitHub</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Explorando activamente:</p>
                      <p className="text-slate-600 mt-1">Firebase Services, Vite, Arquitectura de sistemas modulares frontend</p>
                    </div>
                  </div>
                </div>

                {/* Proyectos Clave */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">Proyectos Reales Seleccionados</h3>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>Guardería Pequeños Pasos — Caso de estudio SQL</span>
                        <span className="text-slate-400 font-normal">Completado</span>
                      </div>
                      <p className="text-slate-500 font-mono text-[10px] mt-0.5">Tecnologías: SQL | Normalización | Diagramas ER</p>
                      <p className="text-slate-600 mt-1">Esquema relacional de gestión escolar. Normalización estructurada en 3FN y scripts relacionales de consultas optimizadas para garantizar consistencia.</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>App Administrativa Multi-Rol: Grupo La Aurora</span>
                        <span className="text-amber-600 font-normal">En Desarrollo</span>
                      </div>
                      <p className="text-slate-500 font-mono text-[10px] mt-0.5">Tecnologías: React | JavaScript (ES6) | CSS3</p>
                      <p className="text-slate-600 mt-1">Sistema corporativo que distribuye privilegios (Admin/General). Gestión interna de estados robustos y enrutamiento protegido.</p>
                    </div>
                  </div>
                </div>

                {/* Formación */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">Formación Académica</h3>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Ingeniería de Sistemas y Computación (Estudiante activo)</p>
                    <p className="text-slate-500">Enfoque en fundamentos de bases de datos, algoritmos, y programación modular.</p>
                  </div>
                </div>

                {/* Declaración Ética */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded text-[10px] text-slate-500 leading-relaxed italic">
                  * Este documento y la información provista en el portafolio están basados en el Código de Ética IEEE-CS y ACM, garantizando una representación rigurosa, transparente y verídica de mis habilidades y progreso sin métricas simuladas.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Light inline placeholder for X Icon
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
