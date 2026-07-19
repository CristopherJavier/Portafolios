import React, { useState } from 'react';
import { Settings, X, Save, RotateCcw, BookOpen, Check, HelpCircle } from 'lucide-react';
import { PortfolioData } from '../types';

interface CustomizerProps {
  data: PortfolioData;
  onSave: (updatedData: PortfolioData) => void;
  onReset: () => void;
}

export default function Customizer({ data, onSave, onReset }: CustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'metadata' | 'ethics'>('profile');
  
  // Local state for the inputs
  const [name, setName] = useState(data.personalProfile.name);
  const [initials, setInitials] = useState(data.personalProfile.initials);
  const [role, setRole] = useState(data.personalProfile.role);
  const [bio, setBio] = useState(data.personalProfile.bio);
  const [status, setStatus] = useState(data.personalProfile.status);
  const [location, setLocation] = useState(data.personalProfile.location);
  const [availability, setAvailability] = useState(data.personalProfile.availability);
  const [github, setGithub] = useState(data.personalProfile.social.github);
  const [linkedin, setLinkedin] = useState(data.personalProfile.social.linkedin);
  const [email, setEmail] = useState(data.personalProfile.social.email);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PortfolioData = {
      ...data,
      personalProfile: {
        name,
        initials,
        role,
        bio,
        status,
        location,
        availability,
        social: {
          github,
          linkedin,
          email
        }
      }
    };
    onSave(updated);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('¿Estás seguro de que deseas restablecer los datos originales de demostración?')) {
      onReset();
      // Sync local state
      setName(data.personalProfile.name);
      setInitials(data.personalProfile.initials);
      setRole(data.personalProfile.role);
      setBio(data.personalProfile.bio);
      setStatus(data.personalProfile.status);
      setLocation(data.personalProfile.location);
      setAvailability(data.personalProfile.availability);
      setGithub(data.personalProfile.social.github);
      setLinkedin(data.personalProfile.social.linkedin);
      setEmail(data.personalProfile.social.email);
      
      const resetToast = document.getElementById('toast-reset');
      if (resetToast) {
        resetToast.classList.remove('opacity-0');
        setTimeout(() => resetToast.classList.add('opacity-0'), 3000);
      }
    }
  };

  return (
    <>
      {/* Floating button to trigger the Customizer */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-portfolio-accent text-white px-4 py-3 rounded-full shadow-lg hover:bg-portfolio-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm font-medium border border-blue-400/20"
        aria-label="Personalizar Portafolio"
        id="btn-customizer"
      >
        <Settings className="w-4 h-4 animate-spin-slow" />
        <span>Personalizar Portafolio</span>
      </button>

      {/* Floating toasts */}
      {showSavedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-portfolio-success text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in text-sm font-medium">
          <Check className="w-4 h-4" />
          <span>¡Portafolio actualizado con tus datos!</span>
        </div>
      )}

      <div
        id="toast-reset"
        className="fixed bottom-24 right-6 z-50 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 transition-all duration-300 opacity-0 pointer-events-none text-sm font-medium"
      >
        <RotateCcw className="w-4 h-4 text-portfolio-accent" />
        <span>Datos restablecidos</span>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-portfolio-bg-alt border-l border-portfolio-border shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="customizer-panel"
      >
        {/* Header */}
        <div className="p-4 border-b border-portfolio-border flex items-center justify-between bg-portfolio-primary text-white">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-portfolio-accent" />
            <h2 className="font-display font-semibold text-lg">Panel de Personalización</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md hover:bg-white/10 text-slate-300 transition-colors"
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs inside panel */}
        <div className="flex border-b border-portfolio-border bg-slate-50 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-portfolio-accent text-portfolio-accent bg-white'
                : 'border-transparent text-portfolio-text-secondary hover:text-portfolio-text-primary'
            }`}
          >
            Mi Información
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
              activeTab === 'metadata'
                ? 'border-portfolio-accent text-portfolio-accent bg-white'
                : 'border-transparent text-portfolio-text-secondary hover:text-portfolio-text-primary'
            }`}
          >
            Metadatos y Config
          </button>
          <button
            onClick={() => setActiveTab('ethics')}
            className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
              activeTab === 'ethics'
                ? 'border-portfolio-accent text-portfolio-accent bg-white'
                : 'border-transparent text-portfolio-text-secondary hover:text-portfolio-text-primary'
            }`}
          >
            Código Ético
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4">
              <p className="text-xs text-portfolio-text-secondary leading-relaxed bg-blue-50 text-blue-800 p-3 rounded-md border border-blue-100">
                Llena este formulario con tus datos reales. Al guardarlos, se actualizarán dinámicamente todas las secciones del portafolio (Hero, Sobre Mí, Contacto, etc.) y se guardarán en tu navegador.
              </p>

              <div>
                <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Mateo Silva"
                  className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Iniciales (2-3 Letras)</label>
                  <input
                    type="text"
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                    placeholder="Ej: MS"
                    className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                    maxLength={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Medellín, Colombia"
                    className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Rol Profesional / Título</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ej: Estudiante de Programación y Desarrollador Junior"
                  className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Estado / Disponibilidad</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Ej: Construyendo experiencia y fundamentos sólidos"
                  className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Línea de Estado Corta (Disponibilidad)</label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="Ej: Disponible para vacantes Junior"
                  className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-portfolio-text-primary mb-1">Biografía Breve</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe tu pasión por el desarrollo, curiosidad y ética de trabajo..."
                  className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none h-24 resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="border-t border-portfolio-border pt-3 space-y-3">
                <h3 className="text-xs font-bold text-portfolio-text-primary uppercase tracking-wider">Enlaces y Redes</h3>
                
                <div>
                  <label className="block text-xs font-medium text-portfolio-text-secondary mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej: tu_correo@gmail.com"
                    className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-portfolio-text-secondary mb-1">Enlace a GitHub</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/tu_usuario"
                    className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-portfolio-text-secondary mb-1">Enlace a LinkedIn</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/tu_perfil"
                    className="w-full text-sm p-2 border border-portfolio-border rounded bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-portfolio-primary text-white py-2.5 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium mt-4 cursor-pointer"
              >
                <Save className="w-4 h-4 text-portfolio-accent" />
                <span>Aplicar Cambios en Vivo</span>
              </button>
            </form>
          )}

          {activeTab === 'metadata' && (
            <div className="space-y-4 text-sm text-portfolio-text-secondary">
              <div className="bg-slate-50 p-3 rounded border border-portfolio-border">
                <h4 className="font-semibold text-portfolio-text-primary mb-1 text-xs">Especificaciones Técnicas</h4>
                <div className="space-y-1 text-xs">
                  <p><strong className="text-slate-700">Versión:</strong> {data.projectMetadata.version}</p>
                  <p><strong className="text-slate-700">Enfoque:</strong> {data.projectMetadata.description}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded border border-portfolio-border">
                <h4 className="font-semibold text-portfolio-text-primary mb-1 text-xs">Soporte Offline & LocalStorage</h4>
                <p className="text-xs leading-relaxed">
                  Toda tu información ingresada se almacena localmente en tu navegador. Puedes refrescar la página sin perder tus cambios.
                </p>
              </div>

              <div className="pt-4 border-t border-portfolio-border">
                <button
                  type="button"
                  onClick={handleResetData}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-md transition-colors text-sm font-medium cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restablecer Datos de Demo</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ethics' && (
            <div className="space-y-4 text-xs leading-relaxed text-portfolio-text-secondary">
              <div className="flex gap-2 items-start bg-blue-50/60 p-3 rounded border border-blue-100">
                <BookOpen className="w-5 h-5 text-portfolio-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-portfolio-text-primary text-xs mb-1">Garantía de Transparencia</h4>
                  <p>
                    {data.projectMetadata.ethicalFramework}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-portfolio-text-primary uppercase tracking-wider text-[10px]">
                  Principios Éticos de Ingeniería Aplicados:
                </p>

                <div className="p-3 bg-white border border-portfolio-border rounded-lg space-y-2">
                  <h5 className="font-bold text-portfolio-text-primary text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-portfolio-accent rounded-full"></span>
                    1. Honestidad en Habilidades
                  </h5>
                  <p className="pl-2.5 text-slate-500">
                    Se evitan barras de porcentaje aleatorias (ej: "React 90%") que no representan métricas reales u objetivas. En su lugar, se clasifican las habilidades según la frecuencia de uso y confianza real.
                  </p>
                </div>

                <div className="p-3 bg-white border border-portfolio-border rounded-lg space-y-2">
                  <h5 className="font-bold text-portfolio-text-primary text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-portfolio-accent rounded-full"></span>
                    2. Representación del Progreso Real
                  </h5>
                  <p className="pl-2.5 text-slate-500">
                    La sección de contribuciones en GitHub y la línea de tiempo demuestran constancia, hábitos, errores de aprendizaje y evolución, huyendo del "teatralismo tecnológico".
                  </p>
                </div>

                <div className="p-3 bg-white border border-portfolio-border rounded-lg space-y-2">
                  <h5 className="font-bold text-portfolio-text-primary text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-portfolio-accent rounded-full"></span>
                    3. Accesibilidad Universal (A11y)
                  </h5>
                  <p className="pl-2.5 text-slate-500">
                    Cumplimiento estricto de contrastes WCAG, estados de enfoque para navegación de teclado, HTML semántico y soporte nativo para reducción de movimiento.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-portfolio-border flex justify-between items-center text-[11px] text-portfolio-text-secondary">
          <span>{data.projectMetadata.title} v{data.projectMetadata.version}</span>
          <a
            href="https://www.ieee.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-portfolio-accent font-medium flex items-center gap-1"
          >
            IEEE-CS & ACM Code
          </a>
        </div>
      </div>
    </>
  );
}
