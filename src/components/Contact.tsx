import React, { useState, useEffect } from 'react';
import { Copy, Check, Send, Mail, Inbox, Trash2, Calendar, RefreshCw } from 'lucide-react';
import { SocialLinks, ContactMessage } from '../types';

interface ContactProps {
  email: string;
  message: string;
  social: SocialLinks;
}

export default function Contact({ email, message, social }: ContactProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Local messages inbox so recruiters can test form and see submissions!
  const [localMessages, setLocalMessages] = useState<ContactMessage[]>([]);

  // Load existing mock/test messages on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_contact_messages');
    if (saved) {
      try {
        setLocalMessages(JSON.parse(saved));
      } catch (e) {
        // Fallback
      }
    } else {
      // Pre-seed with one welcoming message to make the inbox look alive
      const seed: ContactMessage[] = [
        {
          id: 'seed-1',
          name: "Sonia García (Reclutadora)",
          email: "sonia.garcia@techcorp.com",
          message: "¡Excelente portafolio Mateo! Me gusta mucho la transparencia técnica en tus habilidades. Agendemos una llamada técnica.",
          timestamp: new Date().toLocaleDateString('es-ES')
        }
      ];
      setLocalMessages(seed);
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(seed));
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSending(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: formName,
        email: formEmail,
        message: formMsg,
        timestamp: new Date().toLocaleDateString('es-ES')
      };

      const updated = [newMessage, ...localMessages];
      setLocalMessages(updated);
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));

      // Clear Form & Show Feedback
      setFormName('');
      setFormEmail('');
      setFormMsg('');
      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 900);
  };

  const handleClearInbox = () => {
    if (confirm('¿Deseas vaciar la bandeja de entrada de simulación local?')) {
      setLocalMessages([]);
      localStorage.removeItem('portfolio_contact_messages');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-portfolio-bg-alt relative overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold text-portfolio-accent uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Sección 08 / Contacto
          </span>
          <h2 className="font-display font-bold text-portfolio-text-primary text-4xl tracking-tight">
            ¿Hablamos?
          </h2>
          <p className="text-portfolio-text-secondary text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Block: Copy Email & Socials (5 columns) */}
          <div className="md:col-span-5 bg-portfolio-bg-main border border-portfolio-border rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-portfolio-text-primary text-lg">
                Canales Directos
              </h3>
              
              <p className="text-xs text-portfolio-text-secondary leading-relaxed">
                Haz clic abajo para copiar mi dirección de correo electrónico institucional o explora mis perfiles en redes profesionales.
              </p>

              {/* Magnetic copy-button wrapper */}
              <div className="relative group">
                <button
                  onClick={handleCopyEmail}
                  className="w-full bg-white hover:bg-slate-50 border border-portfolio-border text-portfolio-text-primary p-4 rounded-lg flex items-center justify-between transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer focus:outline-none"
                  aria-label="Copiar correo electrónico de Mateo Silva al portapapeles"
                >
                  <div className="flex items-center gap-3 text-left">
                    <Mail className="w-5 h-5 text-portfolio-accent" />
                    <div>
                      <span className="block text-[10px] uppercase font-mono font-bold text-slate-400">Copiar Correo</span>
                      <span className="text-xs sm:text-sm font-semibold font-mono text-slate-800">{email}</span>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    {isCopied ? (
                      <Check className="w-4.5 h-4.5 text-portfolio-success animate-scale-up" />
                    ) : (
                      <Copy className="w-4 h-4 text-portfolio-text-secondary group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                </button>
                
                {/* Floating Tooltip feedback */}
                {isCopied && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-portfolio-primary text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-md animate-bounce">
                    ¡Copiado con éxito!
                  </div>
                )}
              </div>
            </div>

            {/* Social Links Block */}
            <div className="pt-8 border-t border-slate-200/60 mt-6 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">Redes Profesionales:</span>
              <div className="flex gap-3">
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-portfolio-border rounded text-center text-xs font-semibold text-portfolio-text-primary transition-colors focus:ring-2 focus:ring-portfolio-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-portfolio-border rounded text-center text-xs font-semibold text-portfolio-text-primary transition-colors focus:ring-2 focus:ring-portfolio-accent"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Block: Message Form (7 columns) */}
          <div className="md:col-span-7 bg-white border border-portfolio-border rounded-xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-portfolio-text-primary text-lg mb-4">
              Enviar Mensaje de Prueba
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-portfolio-text-secondary uppercase tracking-wider mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full text-xs sm:text-sm p-3 border border-portfolio-border rounded focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-portfolio-text-secondary uppercase tracking-wider mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Tu correo"
                    className="w-full text-xs sm:text-sm p-3 border border-portfolio-border rounded focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-portfolio-text-secondary uppercase tracking-wider mb-1">Mensaje</label>
                <textarea
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full text-xs sm:text-sm p-3 border border-portfolio-border rounded focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent focus:outline-none h-24 resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Status and Action bar */}
              <div className="flex items-center justify-between gap-4 pt-2">
                {showSuccess ? (
                  <span className="text-xs font-mono font-bold text-portfolio-success animate-fade-in bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    ✓ ¡Mensaje guardado en la bandeja local!
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 leading-normal font-mono">
                    * El mensaje se almacenará en el sandbox del navegador.
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="bg-portfolio-primary hover:bg-slate-800 text-white px-5 py-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {isSending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-portfolio-accent" />
                  )}
                  <span>{isSending ? 'Enviando...' : 'Enviar'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* INBOX SIMULATOR DISPLAY (Durable Local Storage) */}
        <div className="bg-slate-900 text-slate-300 rounded-xl border border-slate-800 p-6 sm:p-8 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4.5 h-4.5 text-portfolio-accent" />
              <h4 className="font-display font-bold text-white text-xs sm:text-sm tracking-wider uppercase">
                Bandeja de Mensajes Recibidos (Simulación Local)
              </h4>
            </div>
            
            {localMessages.length > 0 && (
              <button
                onClick={handleClearInbox}
                className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                aria-label="Vaciar bandeja de simulación"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar</span>
              </button>
            )}
          </div>

          {localMessages.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              <p>No hay mensajes en el almacenamiento local.</p>
              <p className="mt-1">Envía un mensaje de prueba arriba para poblar esta consola en tiempo real.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {localMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-slate-950 p-4 rounded border border-slate-800/80 space-y-2 text-xs text-slate-300 animate-scale-up"
                >
                  <div className="flex justify-between items-start gap-4 flex-wrap border-b border-slate-900 pb-1.5 text-[10px] text-slate-400">
                    <div>
                      <strong className="text-white">{msg.name}</strong> 
                      <span className="text-slate-500"> &lt;{msg.email}&gt;</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-500">
                      <Calendar className="w-3 h-3 text-portfolio-accent" />
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line text-slate-300 text-[11px]">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
