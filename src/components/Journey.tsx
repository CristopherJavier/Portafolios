import { useState, useEffect, useRef } from 'react';
import { Calendar, CheckCircle2, ChevronRight, GraduationCap, Code2, Database } from 'lucide-react';
import { Milestone } from '../types';

interface JourneyProps {
  milestones: Milestone[];
}

export default function Journey({ milestones }: JourneyProps) {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('m1');
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>('m1');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section to fill the central timeline bar dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll ratio relative to this section
      const totalHeight = rect.height;
      const startOfSection = rect.top; // when top of section touches viewport top
      
      const scrolled = -startOfSection;
      const progress = Math.min(Math.max(scrolled / (totalHeight - viewportHeight / 2), 0), 1);
      
      setScrollProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use Intersection Observer to highlight active nodes as they cross the center of the screen
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Center band of viewport
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveMilestoneId(entry.target.id.replace('node-', ''));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    milestones.forEach(m => {
      const el = document.getElementById(`node-${m.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [milestones]);

  // Additional detail mock data to make each milestone look authentic and rewarding
  const milestoneDeepData: Record<string, {
    hours: string;
    challenges: string[];
    snippet: string;
    icon: any;
  }> = {
    m1: {
      hours: "~120 Horas",
      challenges: [
        "Resolución de problemas algorítmicos complejos sin librerías externas.",
        "Dominio de estructuras lógicas: bucles anidados, colecciones y funciones recursivas.",
        "Escritura de código autodocumentado bajo nomenclatura clara."
      ],
      snippet: `// Algoritmo de ordenación manual
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
      icon: Code2
    },
    m2: {
      hours: "~150 Horas",
      challenges: [
        "Diseño lógico y físico de diagramas Entidad-Relación usando Draw.io.",
        "Normalización rigurosa hasta la Tercera Forma Normal (3FN).",
        "Estructuración de JOINS complejos, filtrados con WHERE/HAVING y agregaciones."
      ],
      snippet: `-- Consulta relacional de auditoría escolar
SELECT a.nombre, c.grado, COUNT(m.id_matricula) AS materias
FROM alumnos a
INNER JOIN cursos c ON a.id_curso = c.id_curso
LEFT JOIN matriculas m ON a.id_alumno = m.id_alumno
WHERE c.seccion = 'A'
GROUP BY a.id_alumno, c.grado
HAVING COUNT(m.id_matricula) >= 2;`,
      icon: Database
    },
    m3: {
      hours: "~180 Horas",
      challenges: [
        "Creación de interfaces web semánticas y accesibles siguiendo directrices WCAG.",
        "Gestión de flujos de renderizado dinámico con React (useState, useEffect).",
        "Diseño modular de componentes atómicos con Tailwind CSS adaptativo."
      ],
      snippet: `// Componente dinámico de estado
export function ActivityBadge({ count }) {
  const isHigh = count > 100;
  return (
    <div className={\`flex items-center gap-1.5 px-3 py-1.5 rounded \${
      isHigh ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-600'
    }\`}>
      <span className={\`w-1.5 h-1.5 rounded-full \${isHigh ? 'bg-emerald-500' : 'bg-slate-400'}\`}></span>
      <span className="text-xs font-mono font-bold">{count} aportes</span>
    </div>
  );
}`,
      icon: GraduationCap
    }
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="py-24 sm:py-32 bg-portfolio-bg-main relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Sticky Section Header */}
        <div className="md:sticky md:top-20 z-20 bg-portfolio-bg-main/90 backdrop-blur-md py-4 mb-16 border-b border-slate-200/40">
          <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Sección 02 / Trayectoria
          </span>
          <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
            Mi Progreso y Curva de Aprendizaje
          </h2>
          <p className="text-portfolio-text-secondary text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
            Un desglose cronológico de mi formación técnica. Sin promesas exageradas: fundamentos de ingeniería, teoría de datos y desarrollo web moderno.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mt-8">
          
          {/* Main vertical line of timeline (Background gray) */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[3px] bg-slate-200 -translate-x-[1.5px]" />

          {/* Active green/blue line drawn dynamically on scroll */}
          <div
            className="absolute left-4 sm:left-1/2 top-4 w-[3px] bg-portfolio-accent -translate-x-[1.5px] transition-all duration-300 ease-out origin-top"
            style={{ height: `${scrollProgress}%`, maxHeight: 'calc(100% - 10px)' }}
          />

          {/* List of Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, idx) => {
              const isActive = activeMilestoneId === milestone.id;
              const isExpanded = expandedMilestone === milestone.id;
              const sideData = milestoneDeepData[milestone.id];
              const IconComponent = sideData?.icon || Code2;
              
              return (
                <div
                  key={milestone.id}
                  id={`node-${milestone.id}`}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline bullet node */}
                  <div className="absolute left-4 sm:left-1/2 w-8 h-8 rounded-full bg-white border-2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 z-10"
                    style={{
                      borderColor: isActive ? 'var(--color-portfolio-accent)' : '#CBD5E1',
                      boxShadow: isActive ? '0 0 10px rgba(37, 99, 235, 0.3)' : 'none'
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-portfolio-accent scale-110' : 'bg-slate-300'
                    }`} />
                  </div>

                  {/* Spacer or date indicator for symmetric layout */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8 text-left sm:text-right font-mono text-xs text-portfolio-text-secondary pt-1.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                      isActive 
                        ? 'bg-blue-50 text-portfolio-accent border-blue-200' 
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {milestone.date}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">{sideData?.hours} de Estudio</div>
                  </div>

                  {/* Milestone Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8 pt-4 sm:pt-0">
                    <div
                      className={`p-6 bg-portfolio-bg-alt rounded-lg border text-left transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'border-portfolio-accent shadow-md bg-white' 
                          : 'border-portfolio-border hover:border-slate-300 bg-white/60'
                      }`}
                      onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                      role="button"
                      aria-expanded={isExpanded}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setExpandedMilestone(isExpanded ? null : milestone.id);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-semibold text-portfolio-text-primary text-base sm:text-lg flex items-center gap-2">
                            <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-portfolio-accent' : 'text-slate-400'}`} />
                            {milestone.title}
                          </h3>
                          <p className="text-xs text-portfolio-text-secondary font-mono font-medium mt-1">
                            {milestone.description}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transform transition-transform duration-200 ${
                          isExpanded ? 'rotate-90 text-portfolio-accent' : ''
                        }`} />
                      </div>

                      {/* Expandable Technical Details Area */}
                      <div className={`transition-all duration-300 overflow-hidden ${
                        isExpanded ? 'max-h-[500px] opacity-100 mt-5 pt-5 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}>
                        <div className="space-y-4">
                          <p className="text-xs text-portfolio-text-secondary leading-relaxed">
                            {milestone.details}
                          </p>
                          
                          {/* Key Milestones/Challenges list */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-portfolio-text-primary uppercase tracking-wider">Hitos de Aprendizaje:</span>
                            <ul className="space-y-1.5 text-xs text-portfolio-text-secondary">
                              {sideData?.challenges.map((challenge, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-portfolio-success shrink-0 mt-0.5" />
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Code Preview or Syntax Representation */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-portfolio-text-primary uppercase tracking-wider">Estructura / Script Demostrativo:</span>
                            <pre className="p-3 bg-slate-900 text-slate-300 rounded text-[10px] font-mono leading-relaxed overflow-x-auto shadow-inner border border-slate-800">
                              <code>{sideData?.snippet}</code>
                            </pre>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
