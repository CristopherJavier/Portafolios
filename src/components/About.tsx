import { motion } from 'motion/react';
import { Shield, BookOpen, Cpu, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AboutProps {
  bio: string;
}

export default function About({ bio }: AboutProps) {
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);

  // Ethical commitments list
  const commitments = [
    {
      icon: Shield,
      title: "Transparencia Absoluta",
      desc: "Representar habilidades de forma honesta, sin inflar experiencia con porcentajes ficticios."
    },
    {
      icon: BookOpen,
      title: "Enfoque en Fundamentos",
      desc: "Priorizar la comprensión de estructuras de datos, lógica pura y diseño relacional antes que la saturación de frameworks."
    },
    {
      icon: Cpu,
      title: "Compromiso de Accesibilidad",
      desc: "Estructurar aplicaciones legibles por lectores de pantalla y navegables mediante teclado."
    }
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-white border-y border-portfolio-border relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Sección 01 / Sobre Mí
          </span>
          <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
            Curiosidad, Rigor y Ética
          </h2>
          <div className="w-12 h-1 bg-portfolio-accent mt-4 rounded"></div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Text Content (60%) */}
          <div className="lg:col-span-7 space-y-6 text-portfolio-text-secondary text-sm sm:text-base leading-relaxed">
            <p className="text-portfolio-text-primary font-display font-medium text-lg sm:text-xl leading-normal">
              Mi enfoque principal está en construir una base sólida y robusta en el desarrollo de software.
            </p>
            
            <p>
              Creo fielmente que un gran programador no se mide por la cantidad de frameworks que puede nombrar, sino por su capacidad para comprender los flujos lógicos, normalizar esquemas relacionales complejos y escribir código limpio y comprensible.
            </p>
            
            <p>
              Disfruto profundamente desglosar problemas en partes manejables, ya sea estructurando una base de datos libre de redundancias o diseñando un estado modular de React que facilite la navegación fluida.
            </p>

            <p className="bg-slate-50 p-4 border-l-4 border-portfolio-primary rounded-r text-portfolio-text-primary text-xs sm:text-sm italic">
              "Actualmente busco oportunidades donde pueda aportar valor real con mis conocimientos básicos mientras aprendo y crezco al lado de desarrolladores experimentados bajo metodologías ágiles."
            </p>

            {/* Commitments Grid */}
            <div className="pt-8 space-y-4">
              <h3 className="font-display font-semibold text-portfolio-text-primary text-sm uppercase tracking-wider">
                Mis Pilares de Desarrollo (Código Ético):
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {commitments.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-portfolio-bg-main border border-portfolio-border hover:border-blue-200 hover:shadow-xs transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-portfolio-accent mb-2.5" />
                      <h4 className="font-display font-semibold text-portfolio-text-primary text-xs mb-1.5">{item.title}</h4>
                      <p className="text-[11px] text-portfolio-text-secondary leading-normal">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Composition (40%) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-portfolio-bg-main border border-portfolio-border rounded-xl p-5 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full filter blur-xl opacity-40 pointer-events-none" />
              
              {/* Header block resembling code editor */}
              <div className="flex items-center justify-between border-b border-portfolio-border pb-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <span className="text-[10px] font-mono text-portfolio-text-secondary uppercase tracking-wider">normal_form_schema.sql</span>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-mono text-portfolio-accent font-semibold flex items-center gap-1.5">
                  <span>●</span> RELACIÓN: ALUMNOS_MATRICULADOS
                </p>

                {/* Simulated database table visualization */}
                <div className="border border-portfolio-border rounded overflow-hidden text-[10px] font-mono bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="p-2 font-bold">id_alumno (PK)</th>
                        <th className="p-2 font-bold">nombre</th>
                        <th className="p-2 font-bold">id_aula (FK)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr
                        className={`transition-colors duration-200 ${hoveredBlock === 0 ? 'bg-blue-50/70' : ''}`}
                        onMouseEnter={() => setHoveredBlock(0)}
                        onMouseLeave={() => setHoveredBlock(null)}
                      >
                        <td className="p-2 text-portfolio-accent">ALU_001</td>
                        <td className="p-2">Mateo Silva</td>
                        <td className="p-2 text-indigo-600">AULA_A</td>
                      </tr>
                      <tr
                        className={`transition-colors duration-200 ${hoveredBlock === 1 ? 'bg-blue-50/70' : ''}`}
                        onMouseEnter={() => setHoveredBlock(1)}
                        onMouseLeave={() => setHoveredBlock(null)}
                      >
                        <td className="p-2 text-portfolio-accent">ALU_002</td>
                        <td className="p-2">Sofía Pérez</td>
                        <td className="p-2 text-indigo-600">AULA_B</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-portfolio-text-secondary leading-relaxed bg-white p-3 rounded border border-portfolio-border">
                  {hoveredBlock === 0 ? (
                    <strong className="text-portfolio-text-primary block mb-0.5">Integridad Referencial:</strong>
                  ) : hoveredBlock === 1 ? (
                    <strong className="text-portfolio-text-primary block mb-0.5">Claves Foráneas (FK):</strong>
                  ) : (
                    <strong className="text-portfolio-text-primary block mb-0.5">Esquema Normalizado 3FN:</strong>
                  )}
                  {hoveredBlock === 0
                    ? 'ALU_001 vincula dinámicamente al alumno con su clase sin duplicidad de datos en el sistema escolar.'
                    : hoveredBlock === 1
                    ? 'AULA_B se valida con la tabla AULAS asegurando que ningún alumno sea asignado a un aula inexistente.'
                    : 'Pasa el cursor sobre las tuplas de la base de datos simulada para auditar las restricciones de integridad relacional.'
                  }
                </p>

                {/* Micro checklist representing self-review checklist */}
                <div className="pt-4 border-t border-portfolio-border space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Verificaciones de Calidad:</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-portfolio-text-primary">
                      <CheckCircle className="w-3.5 h-3.5 text-portfolio-success" />
                      <span>Ningún grupo repetitivo de datos (1FN)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-portfolio-text-primary">
                      <CheckCircle className="w-3.5 h-3.5 text-portfolio-success" />
                      <span>Dependencias funcionales completas (2FN)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-portfolio-text-primary">
                      <CheckCircle className="w-3.5 h-3.5 text-portfolio-success" />
                      <span>Sin dependencias transitivas (3FN)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
