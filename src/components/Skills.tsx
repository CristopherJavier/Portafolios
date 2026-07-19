import { useState } from 'react';
import { Eye, HelpCircle, Laptop, HeartHandshake, Award } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Map of skills to descriptions to make the grid highly informative upon focus/hover
  const skillDetails: Record<string, { desc: string; icon: string; color: string }> = {
    "HTML": { desc: "Estructuras semánticas, etiquetas accesibles y formularios validados.", icon: "🌐", color: "bg-orange-50 text-orange-600 border-orange-100" },
    "CSS": { desc: "Flexbox, Grid, variables CSS, responsive design y accesibilidad visual.", icon: "🎨", color: "bg-blue-50 text-blue-600 border-blue-100" },
    "JavaScript": { desc: "Manejo del DOM, ES6+, promesas, llamadas a API e interactividad dinámica.", icon: "⚡", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
    "SQL": { desc: "Estructuración de esquemas, normalización 3FN, JOINS y queries optimizadas.", icon: "🗄️", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    "Draw.io": { desc: "Diseño de diagramas Entidad-Relación precisos para flujos relacionales.", icon: "📐", color: "bg-sky-50 text-sky-600 border-sky-100" },
    "React": { desc: "Desarrollo basado en componentes, gestión de estado local y hooks comunes.", icon: "⚛️", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
    "C#": { desc: "Programación Orientada a Objetos, estructuras de datos y lógica en backend.", icon: "🎯", color: "bg-purple-50 text-purple-600 border-purple-100" },
    "Git": { desc: "Control de versiones, manejo de commits, ramas y resolución de conflictos.", icon: "🌿", color: "bg-red-50 text-red-600 border-red-100" },
    "GitHub": { desc: "Repositorios remotos, Pull Requests, despliegues sencillos y hábitos de código.", icon: "🐙", color: "bg-slate-100 text-slate-800 border-slate-200" },
    "Firebase": { desc: "Iniciando con Firestore para persistencia de datos relacionales y Auth.", icon: "🔥", color: "bg-amber-50 text-amber-600 border-amber-100" },
    "Vite": { desc: "Empaquetador rápido para optimización en entorno de desarrollo de React.", icon: "⚡", color: "bg-violet-50 text-violet-600 border-violet-100" },
    "Arquitectura Frontend": { desc: "Estructuración limpia de carpetas, código DRY y reutilización.", icon: "🧱", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  };

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-white border-b border-portfolio-border relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Sección 03 / Habilidades
          </span>
          <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
            Clasificación Honesta de Conocimientos
          </h2>
          <p className="text-portfolio-text-secondary text-xs sm:text-sm mt-2 leading-relaxed max-w-xl">
            Siguiendo los principios de ética profesional de la ACM y IEEE-CS, evito barómetros artificiales como "React al 90%". En su lugar, organizo mi repertorio técnico con transparencia absoluta según el nivel de experiencia real.
          </p>
          <div className="w-12 h-1 bg-portfolio-accent mt-4 rounded"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => {
            // Pick an indicator icon and subtitle based on category title
            let subText = "";
            let categoryIcon = <Laptop className="w-4 h-4 text-portfolio-accent" />;
            if (catIdx === 0) {
              subText = "Herramientas que aplico con fluidez en mis proyectos escolares y prácticos.";
              categoryIcon = <Award className="w-4.5 h-4.5 text-portfolio-accent" />;
            } else if (catIdx === 1) {
              subText = "Tecnologías en proceso de profundización activa con proyectos prácticos.";
              categoryIcon = <HeartHandshake className="w-4.5 h-4.5 text-portfolio-accent" />;
            } else {
              subText = "Conceptos y herramientas que estoy investigando y asimilando actualmente.";
              categoryIcon = <Eye className="w-4.5 h-4.5 text-portfolio-accent" />;
            }

            return (
              <div
                key={category.name}
                className="p-6 bg-portfolio-bg-main border border-portfolio-border rounded-xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                    {categoryIcon}
                    <h3 className="font-display font-bold text-portfolio-text-primary text-sm sm:text-base tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-portfolio-text-secondary leading-relaxed mb-6 font-mono">
                    {subText}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.items.map((skill) => {
                      const details = skillDetails[skill] || { desc: "Formación continua e investigación activa.", icon: "🔧", color: "bg-slate-50 text-slate-600" };
                      const isAnotherHovered = hoveredSkill !== null && hoveredSkill !== skill;
                      
                      return (
                        <div
                          key={skill}
                          className={`p-3 bg-white border rounded-lg transition-all duration-300 cursor-help ${
                            isAnotherHovered ? 'opacity-35 scale-98' : 'opacity-100 scale-100 border-portfolio-border hover:border-portfolio-accent hover:shadow-xs'
                          }`}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          tabIndex={0}
                          role="text"
                          aria-label={`${skill}: ${details.desc}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg select-none">{details.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className="block text-xs font-semibold text-portfolio-text-primary leading-tight">
                                {skill}
                              </span>
                              <span className="block text-[10px] text-portfolio-text-secondary truncate mt-0.5 font-mono">
                                {details.desc}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Micro legend */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Pasa el cursor para ver detalles técnicos</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
