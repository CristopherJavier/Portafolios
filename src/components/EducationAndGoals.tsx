import { Award, BookOpen, GraduationCap, Code, Database, Users, CheckCircle2 } from 'lucide-react';
import { AcademicGoal } from '../types';

interface EducationAndGoalsProps {
  education: {
    academic: string;
    courses: string[];
  };
  goals: AcademicGoal[];
}

export default function EducationAndGoals({ education, goals }: EducationAndGoalsProps) {
  // Map goal icons
  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case 'binary':
        return <Code className="w-6 h-6 text-portfolio-accent" />;
      case 'database':
        return <Database className="w-6 h-6 text-portfolio-accent" />;
      case 'users':
        return <Users className="w-6 h-6 text-portfolio-accent" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-portfolio-accent" />;
    }
  };

  return (
    <div className="bg-portfolio-bg-main">
      
      {/* SECTION: EDUCATION */}
      <section
        id="education"
        className="py-24 sm:py-32 border-b border-portfolio-border"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
              Sección 06 / Formación Académica
            </span>
            <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
              Estudios y Certificaciones
            </h2>
            <div className="w-12 h-1 bg-portfolio-accent mt-4 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Side: Academic Degree Card (5 columns) */}
            <div className="lg:col-span-5 bg-white border border-portfolio-border rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-portfolio-accent" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-portfolio-accent uppercase font-bold tracking-wider">
                    Educación Formal Superior
                  </span>
                  <h3 className="font-display font-bold text-portfolio-text-primary text-lg sm:text-xl leading-tight">
                    {education.academic}
                  </h3>
                  <p className="text-xs text-portfolio-text-secondary font-mono">
                    Universidad Tecnológica Nacional
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-portfolio-text-secondary leading-relaxed">
                  Enfoque curricular en matemática discreta, análisis y estructuración de algoritmos, teoría relacional de base de datos, y fundamentos sólidos de ingeniería de sistemas bajo principios éticos y profesionales.
                </p>
              </div>

              {/* Status footer badge */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-portfolio-success"></span>
                <span className="text-[11px] font-mono text-portfolio-text-secondary font-semibold uppercase tracking-wider">
                  Matrícula Activa en Curso
                </span>
              </div>
            </div>

            {/* Right Side: Courses & Certifications Ledger (7 columns) */}
            <div className="lg:col-span-7 bg-white border border-portfolio-border rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Award className="w-5 h-5 text-portfolio-accent" />
                  <h3 className="font-display font-bold text-portfolio-text-primary text-sm uppercase tracking-wider">
                    Certificaciones de Especialización
                  </h3>
                </div>

                {/* Structured Certifications List */}
                <div className="space-y-4">
                  {education.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-portfolio-bg-main border border-portfolio-border rounded-lg flex items-start gap-4 transition-all hover:border-slate-300"
                    >
                      <div className="w-8 h-8 rounded bg-white border border-portfolio-border flex items-center justify-center shrink-0 font-mono text-xs font-bold text-portfolio-accent select-none">
                        0{idx + 1}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-portfolio-text-primary leading-tight">
                          {course}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-portfolio-text-secondary font-mono">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-portfolio-success"></span>
                            Completo
                          </span>
                          <span>•</span>
                          <span>Credencial Verificada</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-slate-400 font-mono mt-6 italic">
                * Las certificaciones complementan mi educación autodidacta orientada a satisfacer requerimientos reales de la industria.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: GOALS */}
      <section
        id="goals"
        className="py-24 sm:py-32 bg-white border-b border-portfolio-border"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
              Sección 07 / Objetivos Futuros
            </span>
            <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
              Alineación y Metas Profesionales
            </h2>
            <div className="w-12 h-1 bg-portfolio-accent mt-4 rounded"></div>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((goal, idx) => {
              return (
                <div
                  key={goal.id}
                  className="p-6 bg-portfolio-bg-main border border-portfolio-border hover:border-blue-200 rounded-xl hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg border border-portfolio-border flex items-center justify-center mb-6 group-hover:border-portfolio-accent group-hover:scale-105 transition-transform">
                    {getGoalIcon(goal.icon)}
                  </div>

                  <span className="text-[10px] font-mono text-portfolio-accent uppercase font-bold tracking-wider block mb-2">
                    Meta 0{idx + 1}
                  </span>

                  <p className="font-display font-semibold text-portfolio-text-primary text-sm sm:text-base leading-snug">
                    {goal.text}
                  </p>

                  <p className="text-xs text-portfolio-text-secondary leading-relaxed mt-3">
                    {idx === 0 
                      ? "Asimilando profundamente algoritmos, patrones de diseño modulares y buenas prácticas de documentación."
                      : idx === 1 
                      ? "Creando soluciones robustas mediante la integración de APIs optimizadas y modelado lógico de datos consistente."
                      : "Deseoso de asimilar flujos de integración continua (CI/CD) y metodologías Scrum en equipos profesionales."
                    }
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
