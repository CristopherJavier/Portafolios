import { useState } from 'react';
import { ExternalLink, Github, Database, ShieldAlert, Layout, CheckCircle, Terminal, RefreshCw, Send, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsProps {
  items: ProjectItem[];
}

export default function Projects({ items }: ProjectsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = items[activeIdx];

  // --- PROJECT 1 SQL SIMULATOR STATE ---
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM alumnos INNER JOIN aulas ...');
  const [sqlResult, setSqlResult] = useState<any[]>([
    { alumno: "Martín Castro", aula: "Abejas Pintoras", edad: 3, tutor: "Elena Gómez" },
    { alumno: "Lucas Ortega", aula: "Delfines Soles", edad: 4, tutor: "Juan Ortega" },
    { alumno: "Sofía Medina", aula: "Abejas Pintoras", edad: 3, tutor: "Elena Gómez" },
  ]);
  const [isSqlRunning, setIsSqlRunning] = useState(false);

  const handleRunSql = () => {
    setIsSqlRunning(true);
    setTimeout(() => {
      setIsSqlRunning(false);
      // alternate mock dataset to simulate executing query
      if (sqlQuery.includes('COUNT') || sqlQuery.includes('count')) {
        setSqlResult([
          { aula: "Abejas Pintoras", total_alumnos: 12 },
          { aula: "Delfines Soles", total_alumnos: 15 },
          { aula: "Ositos Creativos", total_alumnos: 10 },
        ]);
      } else {
        setSqlResult([
          { alumno: "Martín Castro", aula: "Abejas Pintoras", edad: 3, tutor: "Elena Gómez" },
          { alumno: "Lucas Ortega", aula: "Delfines Soles", edad: 4, tutor: "Juan Ortega" },
          { alumno: "Sofía Medina", aula: "Abejas Pintoras", edad: 3, tutor: "Elena Gómez" },
        ]);
      }
    }, 800);
  };

  // --- PROJECT 2 MULTI-ROLE SIMULATOR STATE ---
  const [simulatedRole, setSimulatedRole] = useState<'admin' | 'general'>('general');
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "SISTEMA: Sesión iniciada como 'general'",
    "SISTEMA: Cargando datos públicos corporativos"
  ]);

  const changeRole = (role: 'admin' | 'general') => {
    setSimulatedRole(role);
    setSystemLogs(prev => [
      `ROL_CAMBIADO: Privilegios actualizados a '${role.toUpperCase()}'`,
      role === 'admin' 
        ? "PERMISO: Acceso concedido a /admin/nomina y /admin/auditoria" 
        : "RESTRICCIÓN: Intentando acceder a ruta protegida... Redirigiendo a /dashboard",
      ...prev
    ].slice(0, 5));
  };

  // --- PROJECT 3 GEMINI PROMPT SIMULATOR STATE ---
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<'button' | 'card' | 'input'>('button');
  const [isTypewriting, setIsTypewriting] = useState(false);
  const [simulatedJsonOutput, setSimulatedJsonOutput] = useState<string>(
    JSON.stringify({
      "$schema": "gemini-ui-v1",
      "component": "Button",
      "theme": "CosmicSlate",
      "properties": {
        "text": "Confirmar Inscripción",
        "size": "medium",
        "intent": "accent",
        "accessibility": {
          "ariaLabel": "Inscribirse a la guardería escolar",
          "focusRing": true
        }
      }
    }, null, 2)
  );

  const generatePromptJson = (category: 'button' | 'card' | 'input') => {
    setSelectedPromptCategory(category);
    setIsTypewriting(true);
    
    const templates = {
      button: {
        "$schema": "gemini-ui-v1",
        "component": "Button",
        "theme": "CosmicSlate",
        "properties": {
          "text": "Confirmar Matrícula",
          "size": "medium",
          "intent": "accent",
          "accessibility": {
            "ariaLabel": "Confirmar datos y guardar matrícula",
            "focusRing": true
          }
        }
      },
      card: {
        "$schema": "gemini-ui-v1",
        "component": "CardProfile",
        "padding": "24px",
        "layout": "asymmetric",
        "properties": {
          "avatarShape": "rounded-lg",
          "highContrast": true,
          "borderStyle": "subtle_grid"
        },
        "accessibility": {
          "role": "region",
          "ariaLabel": "Perfil del tutor del estudiante"
        }
      },
      input: {
        "$schema": "gemini-ui-v1",
        "component": "AccessibleInputField",
        "label": "Correo del Tutor",
        "inputType": "email",
        "required": true,
        "properties": {
          "validationMessage": "Ingrese un correo electrónico institucional válido.",
          "outlineColor": "#2563EB"
        }
      }
    };

    setTimeout(() => {
      setSimulatedJsonOutput(JSON.stringify(templates[category], null, 2));
      setIsTypewriting(false);
    }, 600);
  };

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 bg-portfolio-bg-main border-b border-portfolio-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
              Sección 04 / Proyectos
            </span>
            <h2 className="font-display font-bold text-portfolio-text-primary text-3xl sm:text-4xl mt-3 tracking-tight">
              Proyectos Reales y Simulaciones Activas
            </h2>
            <p className="text-portfolio-text-secondary text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
              Casos de estudio prácticos que demuestran mi capacidad para resolver problemas concretos. Interactúa con las consolas de simulación a la derecha.
            </p>
          </div>

          {/* Project Tabs (Navigable) */}
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 self-start md:self-auto" role="tablist">
            {items.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setActiveIdx(idx)}
                role="tab"
                aria-selected={activeIdx === idx}
                aria-controls={`project-panel-${project.id}`}
                id={`project-tab-${project.id}`}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-white text-portfolio-text-primary shadow-xs'
                    : 'text-portfolio-text-secondary hover:text-portfolio-text-primary'
                }`}
              >
                Proyecto {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Project Content */}
        <div
          id={`project-panel-${activeProject.id}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${activeProject.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Technical Narrative (7 columns) */}
          <div className="lg:col-span-6 bg-white border border-portfolio-border rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Type, Status and Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-slate-100 text-portfolio-text-secondary px-2 py-0.5 rounded">
                  {activeProject.type}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className={`w-2 h-2 rounded-full ${
                    activeProject.status === 'Completado' ? 'bg-portfolio-success' : 'bg-portfolio-pending animate-pulse'
                  }`} />
                  <span className={activeProject.status === 'Completado' ? 'text-portfolio-success' : 'text-portfolio-pending'}>
                    {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-portfolio-text-primary text-xl sm:text-2xl leading-tight">
                  {activeProject.name}
                </h3>
                <p className="text-portfolio-text-secondary text-sm leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">Tecnologías Clave:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-portfolio-bg-main border border-portfolio-border text-portfolio-text-primary px-2.5 py-1 rounded font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learnings Banner */}
              <div className="bg-blue-50/60 p-4 border border-blue-100 rounded-lg space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-portfolio-accent flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-portfolio-success" />
                  Aprendizaje Adquirido:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                  {activeProject.learnings}
                </p>
              </div>
            </div>

            {/* Links Block */}
            <div className="pt-8 border-t border-slate-100 flex items-center gap-4 mt-6">
              {activeProject.links.github ? (
                <a
                  href={activeProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-portfolio-primary hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded transition-all focus:ring-2 focus:ring-portfolio-accent"
                  aria-label={`Ver código fuente de ${activeProject.name} en GitHub`}
                >
                  <Github className="w-4 h-4 text-portfolio-accent" />
                  <span>Código en GitHub</span>
                </a>
              ) : (
                <span className="text-xs text-portfolio-text-secondary italic font-mono bg-slate-50 px-3 py-2 rounded">
                  * Herramienta interna / Propietario
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Simulator (6 columns) */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* SIMULATOR 1: Guardería Pequeños Pasos SQL Shell */}
            {activeIdx === 0 && (
              <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 p-5 flex-1 flex flex-col justify-between font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Terminal className="w-4 h-4 text-portfolio-accent" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">SQL Sandbox relacional</span>
                    </div>
                    <span className="text-[9px] bg-portfolio-success/20 text-portfolio-success border border-portfolio-success/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Online</span>
                  </div>

                  {/* Schema Info */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60 mb-4 text-[10px] text-slate-400 space-y-1">
                    <p className="font-bold text-slate-300">Esquema Guardería Pequeños Pasos:</p>
                    <p>├─ <span className="text-portfolio-accent">alumnos</span> (id_alumno, nombre, edad, id_aula)</p>
                    <p>└─ <span className="text-portfolio-accent">aulas</span> (id_aula, nombre_aula, tutor)</p>
                  </div>

                  {/* SQL Input Area */}
                  <div className="space-y-1.5 mb-4">
                    <label className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Query Script:</label>
                    <div className="relative">
                      <textarea
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        className="w-full bg-slate-950 text-slate-200 p-3 rounded border border-slate-800 focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent focus:outline-none h-24 resize-none leading-relaxed"
                      />
                      <button
                        onClick={handleRunSql}
                        disabled={isSqlRunning}
                        className="absolute bottom-3 right-3 bg-portfolio-accent hover:bg-portfolio-accent-hover text-white px-3 py-1.5 rounded flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        {isSqlRunning ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3 fill-white" />
                        )}
                        <span>{isSqlRunning ? 'Ejecutando...' : 'Ejecutar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* SQL Result Output */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Consola de Salida:</span>
                    <div className="bg-slate-950 rounded border border-slate-800 p-3 max-h-48 overflow-y-auto">
                      <table className="w-full text-left text-[11px] text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            {sqlResult.length > 0 && Object.keys(sqlResult[0]).map((key) => (
                              <th key={key} className="pb-1.5 pr-2 font-bold">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {sqlResult.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                              {Object.values(row).map((val: any, cIdx) => (
                                <td key={cIdx} className="py-1.5 pr-2 text-slate-300">{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Prueba alternando query con: <code className="text-slate-400">COUNT</code></span>
                  <button 
                    onClick={() => setSqlQuery('SELECT COUNT(id_alumno), aulas.nombre_aula FROM alumnos INNER JOIN aulas GROUP BY aulas.nombre_aula')}
                    className="text-portfolio-accent hover:underline cursor-pointer"
                  >
                    Usar plantilla COUNT
                  </button>
                </div>
              </div>
            )}

            {/* SIMULATOR 2: La Aurora Multi-Role Manager */}
            {activeIdx === 1 && (
              <div className="bg-portfolio-bg-main rounded-xl border border-portfolio-border p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2 text-portfolio-text-primary">
                      <Layout className="w-4 h-4 text-portfolio-accent" />
                      <span className="text-[10px] uppercase font-bold tracking-wider font-mono">Manejador de Roles Aurora</span>
                    </div>
                    <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono">Simulando Router</span>
                  </div>

                  {/* Toggle Controls */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">Cambiar Rol Actual:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => changeRole('general')}
                        className={`py-2 px-4 rounded text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                          simulatedRole === 'general'
                            ? 'bg-portfolio-primary text-white border-portfolio-primary shadow-xs'
                            : 'bg-white text-slate-600 border-portfolio-border hover:bg-slate-50'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>Rol: General</span>
                      </button>
                      <button
                        onClick={() => changeRole('admin')}
                        className={`py-2 px-4 rounded text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                          simulatedRole === 'admin'
                            ? 'bg-portfolio-accent text-white border-portfolio-accent shadow-xs'
                            : 'bg-white text-slate-600 border-portfolio-border hover:bg-slate-50'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>Rol: Administrador</span>
                      </button>
                    </div>
                  </div>

                  {/* View Representation */}
                  <div className="bg-white p-4 rounded-lg border border-portfolio-border space-y-3 shadow-2xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-[11px] font-bold text-slate-800">Panel Aurora — Vista de Empleados</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                        simulatedRole === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Sesión: {simulatedRole}
                      </span>
                    </div>

                    {/* Restricted elements */}
                    <div className="space-y-2">
                      <div className="p-2 bg-slate-50 rounded flex justify-between text-xs">
                        <span>Ficha Alumno: Alejandro Silva</span>
                        <span className="text-portfolio-success font-medium font-mono">Público</span>
                      </div>

                      {simulatedRole === 'admin' ? (
                        <div className="p-2 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded flex justify-between text-xs animate-fade-in">
                          <span>Salarios y Planilla ($4,500 USD)</span>
                          <span className="text-emerald-700 font-bold font-mono">Confidencial</span>
                        </div>
                      ) : (
                        <div className="p-2 bg-slate-100/60 border border-slate-200/50 rounded flex justify-between text-xs text-slate-400 font-mono italic">
                          <span>[Ruta Protegida - Oculta]</span>
                          <span className="text-red-500">Bloqueado</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Console logs */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">Logs de Middleware Aurora:</span>
                    <div className="bg-slate-900 text-slate-300 p-3 rounded font-mono text-[10px] space-y-1 h-24 overflow-y-auto border border-slate-800 shadow-inner">
                      {systemLogs.map((log, lIdx) => (
                        <p key={lIdx} className={log.includes('PERMISO') ? 'text-emerald-400' : log.includes('RESTRICCIÓN') ? 'text-amber-400' : 'text-slate-400'}>
                          &gt; {log}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 mt-4 leading-normal italic font-mono">
                  * El sistema simula la lógica de middlewares y enrutamiento protegido que implemento en mis aplicaciones reales de React.
                </p>
              </div>
            )}

            {/* SIMULATOR 3: Gemini UI Specification Builder */}
            {activeIdx === 2 && (
              <div className="bg-slate-950 text-slate-300 rounded-xl border border-slate-800 p-5 flex-1 flex flex-col justify-between font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Sparkles className="w-4 h-4 text-portfolio-accent" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Gemini JSON prompt compiler</span>
                    </div>
                    <span className="text-[9px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Compiling</span>
                  </div>

                  {/* Interactive selector */}
                  <div className="space-y-2 mb-4">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Seleccionar Prompt a Compilar:</p>
                    <div className="flex gap-2">
                      {(['button', 'card', 'input'] as const).map((category) => (
                        <button
                          key={category}
                          onClick={() => generatePromptJson(category)}
                          className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-bold border cursor-pointer transition-all ${
                            selectedPromptCategory === category
                              ? 'bg-portfolio-accent border-portfolio-accent text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Output Code */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">JSON Generado por Prompt:</span>
                      {isTypewriting && <span className="text-[10px] text-purple-400 animate-pulse">Compilando...</span>}
                    </div>
                    <pre className="bg-slate-900 p-4 rounded border border-slate-800 text-[11px] leading-relaxed max-h-56 overflow-y-auto text-emerald-400 shadow-inner">
                      <code>{simulatedJsonOutput}</code>
                    </pre>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Estructuración JSON validada para renderizadores dinámicos.</span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
