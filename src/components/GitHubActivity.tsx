import { useEffect, useState, useRef } from 'react';
import { GitCommit, GitBranch, Terminal, RefreshCw, Activity, ArrowUpRight } from 'lucide-react';

interface GitHubActivityProps {
  contributions: number;
  message: string;
  githubUrl: string;
}

export default function GitHubActivity({ contributions, message, githubUrl }: GitHubActivityProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const [animatedSquares, setAnimatedSquares] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  // Generate 12 weeks * 7 days = 84 contribution squares
  const totalSquares = 84;
  const squareDensities = Array.from({ length: totalSquares }, (_, idx) => {
    // Make weekends lower, mid-week higher density to look realistic
    const day = idx % 7;
    if (day === 0 || day === 6) {
      return Math.random() > 0.85 ? 1 : 0; // low weekend activity
    }
    const rand = Math.random();
    if (rand > 0.8) return 3; // high density
    if (rand > 0.5) return 2; // medium density
    if (rand > 0.2) return 1; // low density
    return 0; // no activity
  });

  // Highlight color mapping
  const densityColors = [
    'bg-slate-100 dark:bg-slate-800 border-slate-200/50', // 0: None
    'bg-emerald-100 text-emerald-800 border-emerald-200/40', // 1: Low
    'bg-emerald-300 text-emerald-900 border-emerald-400/30', // 2: Med
    'bg-emerald-500 text-white border-emerald-600/20' // 3: High
  ];

  const densityNames = ["Sin aportes", "1-2 commits", "3-5 commits", "6+ commits (Hito)"];

  // Handle intersection observer to trigger counts and grid lighting
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Counter animation & Grid Cascade illumination
  useEffect(() => {
    if (!hasIntersected) return;

    // Counter animation
    let start = 0;
    const end = contributions;
    if (start === end) return;

    const totalDuration = 1500; // ms
    const incrementTime = Math.max(Math.floor(totalDuration / end), 15);

    const timer = setInterval(() => {
      start += 2;
      if (start >= end) {
        clearInterval(timer);
        setCurrentCount(end);
      } else {
        setCurrentCount(start);
      }
    }, incrementTime);

    // Staggered squares lighting effect
    const reveals = Array(totalSquares).fill(false);
    let sqIdx = 0;
    
    const squareTimer = setInterval(() => {
      if (sqIdx >= totalSquares) {
        clearInterval(squareTimer);
      } else {
        reveals[sqIdx] = true;
        setAnimatedSquares([...reveals]);
        sqIdx++;
      }
    }, 15);

    return () => {
      clearInterval(timer);
      clearInterval(squareTimer);
    };
  }, [hasIntersected, contributions]);

  // Generate date label for tooltip
  const getCommitLabel = (index: number, density: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (totalSquares - index));
    const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    
    let commitsText = "Sin commits";
    if (density === 1) commitsText = "2 commits (Pruebas de rutas)";
    if (density === 2) commitsText = "4 commits (Corrección de esquemas)";
    if (density === 3) commitsText = "7 commits (Diseño de componentes)";
    
    return `${formattedDate}: ${commitsText}`;
  };

  return (
    <section
      id="github_activity"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-white border-b border-portfolio-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Sección 05 / Actividad y Hábito
          </span>
          <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
            Consistencia y Ritmo en GitHub
          </h2>
          <div className="w-12 h-1 bg-portfolio-accent mt-4 rounded"></div>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Metrics and Counter (5 columns) */}
          <div className="lg:col-span-5 bg-portfolio-bg-main border border-portfolio-border rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-portfolio-text-secondary font-mono text-xs">
                <Terminal className="w-4 h-4 text-portfolio-accent" />
                <span>GITHUB_AGENT_STATISTICS</span>
              </div>

              {/* Counter Display */}
              <div className="space-y-1">
                <span className="text-portfolio-text-secondary text-xs sm:text-sm font-medium font-mono uppercase tracking-wider block">
                  Contribuciones Recientes
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl sm:text-6xl text-portfolio-text-primary tracking-tight">
                    ~{currentCount}
                  </span>
                  <span className="text-xs font-mono font-bold text-portfolio-success uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Construyendo Hábito
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-portfolio-text-secondary leading-relaxed bg-white p-4 rounded-lg border border-portfolio-border">
                "{message}"
              </p>

              {/* Integrity Disclaimer */}
              <div className="flex gap-2.5 items-start bg-blue-50/60 p-3.5 rounded border border-blue-100 text-[11px] leading-relaxed text-slate-700 font-mono">
                <Activity className="w-4 h-4 text-portfolio-accent shrink-0 mt-0.5" />
                <p>
                  * <strong>Auditoría Transparente:</strong> Estos aportes reflejan mi entrenamiento diario de código: resolución de ejercicios lógicos, pruebas fallidas, scripts relacionales y refactorizaciones. No indica un nivel senior absoluto, sino perseverancia técnica.
                </p>
              </div>
            </div>

            {/* External link */}
            <div className="pt-8 border-t border-slate-200/60 mt-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-portfolio-accent hover:text-portfolio-accent-hover font-semibold uppercase tracking-wider flex items-center gap-1 group"
                aria-label="Ver mi perfil completo en GitHub"
              >
                <span>Explorar Perfil en GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Matrix Heatmap (7 columns) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between text-slate-300 font-mono text-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400">Heatmap de Código (Últimas 12 Semanas)</span>
                <div className="flex gap-2 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <GitCommit className="w-3.5 h-3.5" />
                    <span>Commits</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Ramas</span>
                  </div>
                </div>
              </div>

              {/* Grid of contribution squares */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
                  {squareDensities.map((density, idx) => {
                    const isRevealed = animatedSquares[idx];
                    const activeColorClass = densityColors[density];
                    
                    return (
                      <div
                        key={idx}
                        className={`aspect-square rounded border transition-all duration-300 relative group cursor-crosshair ${
                          isRevealed 
                            ? activeColorClass 
                            : 'bg-slate-950 border-slate-900 opacity-20'
                        }`}
                      >
                        {/* Custom visual tooltip shown on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950 text-white text-[9px] px-2 py-1 rounded border border-slate-800 whitespace-nowrap z-30 shadow-lg pointer-events-none">
                          {getCommitLabel(idx, density)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between pt-4 text-[10px] text-slate-500 border-t border-slate-800/60">
                  <span>Menos commits</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-200 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded bg-emerald-300 border border-emerald-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-600 inline-block"></span>
                  </div>
                  <span>Más commits</span>
                </div>
              </div>

              {/* Additional micro stats logs */}
              <div className="bg-slate-950 p-3 rounded border border-slate-800/60 text-[10px] space-y-1.5 text-slate-400">
                <p className="text-slate-300 font-bold">Resumen de Logs Recientes:</p>
                <p className="text-slate-400">&gt; <span className="text-slate-500">p1_guarderia</span>: Inserción de 50 registros de prueba SQL completados.</p>
                <p className="text-slate-400">&gt; <span className="text-slate-500">p2_aurora</span>: Enrutamiento seguro para roles de administración validado.</p>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-4">
              <RefreshCw className="w-3.5 h-3.5 text-slate-600 animate-spin-slow" />
              <span>Actualizado automáticamente hace un ciclo.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
