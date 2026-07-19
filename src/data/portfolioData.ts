export type SceneTone = 'ink' | 'paper' | 'mist' | 'brand';

export interface PortfolioScene {
  id: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  tone: SceneTone;
  height: 'compact' | 'regular' | 'feature';
}

export interface PortfolioProject {
  id: string;
  name: string;
  featured?: boolean;
  status: string;
  description: string;
  problem: string;
  audience: string;
  features: string[];
  technologies: string[];
  captures: Array<{ src: string; alt: string; label: string }>;
  learnings: string[];
  links: { demo?: string; repository?: string };
}

export interface PortfolioData {
  identity: {
    name: string; monogram: string; role: string; description: string; location: string; availability: string;
    photo: { src: string; alt: string };
    contact: { email: string; github: string; linkedin: string; curriculum: string };
  };
  presentation: {
    phrase: string;
  };
  origin: {
    story: string;
    currentStudies: string;
    motivation: string;
    initialGoal: string;
    secondaryPhoto: { src: string; alt: string };
  };
  scenes: PortfolioScene[];
  learningPrinciples: string[];
  technologyCategories: Array<{ id: string; label: string }>;
  technologies: Array<{ name: string; category: string; stages: string[] }>;
  technologyStages: Array<{ id: string; label: string }>;
  projects: PortfolioProject[];
  github: {
    /** `manual` is an editable summary, not a representation of daily GitHub events. */
    source: 'manual' | 'api';
    contributions: number;
    message: string;
    profileUrl: string;
    featuredRepositories: Array<{ name: string; description: string; technologies: string[]; url: string }>;
  };
  education: {
    studies: Array<{ title: string; status: 'current' | 'completed'; date: string; institution: string; evidenceUrl: string }>;
    courses: Array<{ title: string; status: 'completed' | 'in-progress'; date: string; institution: string; evidenceUrl: string }>;
    certifications: Array<{ name: string; level: 'primary' | 'secondary'; date: string; institution: string; evidenceUrl: string }>;
  };
  goals: string[];
}

/** Fuente única de contenido. Completa solo datos y recursos verificados antes de publicar. */
export const portfolioData: PortfolioData = {
  identity: {
    name: 'Cristopher Javier',
    monogram: 'CJ',
    role: 'Desarrollador en formación / desarrollador junior',
    description: 'Estoy comenzando en programación, construyendo proyectos propios y desarrollando progresivamente mis conocimientos.',
    location: 'República Dominicana',
    availability: '',
    photo: { src: '', alt: 'Fotografía principal de Cristopher Javier' },
    contact: { email: '', github: '', linkedin: '', curriculum: '' },
  },
  presentation: {
    phrase: '',
  },
  origin: {
    story: '',
    currentStudies: '',
    motivation: '',
    initialGoal: '',
    secondaryPhoto: { src: '', alt: 'Fotografía secundaria relacionada con el inicio de Cristopher Javier' },
  },
  scenes: [
    { id: 'presentacion', number: '01', label: 'El inicio', title: 'Construyendo mi camino en desarrollo de software.', summary: 'Una presentación personal sobre el punto en el que estoy y la dirección en la que avanzo.', tone: 'ink', height: 'feature' },
    { id: 'punto-de-partida', number: '02', label: 'Punto de partida', title: 'El punto de partida.', summary: 'Un capítulo para documentar cómo comenzó este recorrido.', tone: 'paper', height: 'regular' },
    { id: 'forma-de-aprender', number: '03', label: 'Método', title: 'Aprender, probar y volver a construir.', summary: 'Mi forma de avanzar a través de curiosidad, práctica y proyectos propios.', tone: 'mist', height: 'regular' },
    { id: 'tecnologias', number: '04', label: 'Sistema actual', title: 'Tecnología puesta en contexto.', summary: 'Herramientas organizadas por práctica actual, flujo de trabajo y exploración.', tone: 'ink', height: 'feature' },
    { id: 'proyecto-principal', number: '05', label: 'Caso principal', title: 'FloristManager', summary: 'Aplicación web creada para apoyar la gestión de una pequeña floristería. Permite trabajar con inventario de flores, movimientos, catálogo y cotizaciones.', tone: 'paper', height: 'feature' },
    { id: 'otros-proyectos', number: '06', label: 'Más capítulos', title: 'Cada proyecto añade una capa.', summary: 'Trabajos secundarios presentados como capítulos, no como una cuadrícula de tarjetas.', tone: 'mist', height: 'regular' },
    { id: 'progreso', number: '07', label: 'Constancia', title: 'El progreso también es volver mañana.', summary: 'La actividad es una señal de hábito y aprendizaje, no una promesa de seniority.', tone: 'ink', height: 'compact' },
    { id: 'formacion', number: '08', label: 'Base', title: 'Formación que acompaña la práctica.', summary: 'Estudios y certificaciones con jerarquía clara y verificable.', tone: 'paper', height: 'regular' },
    { id: 'proximo-nivel', number: '09', label: 'Dirección', title: 'Preparado para el siguiente paso.', summary: 'Metas realistas para convertir la formación actual en experiencia profesional.', tone: 'brand', height: 'regular' },
    { id: 'contacto', number: '10', label: 'Cierre', title: 'La próxima conversación puede abrir otro capítulo.', summary: 'Una invitación clara a conectar, colaborar o considerar una oportunidad junior.', tone: 'ink', height: 'feature' },
  ],
  learningPrinciples: [
    'Aprendo construyendo proyectos.',
    'Investigo los problemas que encuentro.',
    'Intento comprender lo que implemento.',
    'Mejoro los proyectos mediante iteraciones.',
    'Todavía estoy desarrollando mis fundamentos.',
    'Valoro la constancia por encima de aparentar experiencia.',
  ],
  technologyCategories: [
    { id: 'current', label: 'Uso actual' },
    { id: 'practice', label: 'En práctica' },
    { id: 'workflow', label: 'Herramientas de trabajo' },
    { id: 'exploring', label: 'Explorando' },
  ],
  technologyStages: [
    { id: 'structure', label: 'Estructura' },
    { id: 'interface', label: 'Interfaz' },
    { id: 'logic', label: 'Lógica' },
    { id: 'data', label: 'Datos' },
    { id: 'versioning', label: 'Control de versiones' },
    { id: 'publishing', label: 'Publicación' },
  ],
  technologies: [
    { name: 'HTML', category: 'current', stages: ['structure'] },
    { name: 'CSS', category: 'current', stages: ['interface'] },
    { name: 'JavaScript', category: 'current', stages: ['logic'] },
    { name: 'React', category: 'practice', stages: ['interface', 'logic'] },
    { name: 'Vite', category: 'workflow', stages: ['publishing'] },
    { name: 'C#', category: 'practice', stages: ['logic'] },
    { name: 'SQL', category: 'practice', stages: ['data'] },
    { name: 'Git', category: 'workflow', stages: ['versioning'] },
    { name: 'GitHub', category: 'workflow', stages: ['versioning', 'publishing'] },
    { name: 'Firebase', category: 'exploring', stages: ['data', 'publishing'] },
  ],
  projects: [
    {
      id: 'florist-manager',
      name: 'FloristManager',
      featured: true,
      description: 'Aplicación web creada para apoyar la gestión de una pequeña floristería. Permite trabajar con inventario de flores, movimientos, catálogo y cotizaciones.',
      problem: '',
      audience: '',
      features: [],
      technologies: [],
      captures: [],
      status: '',
      learnings: [],
      links: { demo: '', repository: '' },
    },
    { id: 'secondary-01', name: '', description: '', problem: '', audience: '', features: [], technologies: [], captures: [], status: '', learnings: [], links: { demo: '', repository: '' } },
    { id: 'secondary-02', name: '', description: '', problem: '', audience: '', features: [], technologies: [], captures: [], status: '', learnings: [], links: { demo: '', repository: '' } },
    { id: 'secondary-03', name: '', description: '', problem: '', audience: '', features: [], technologies: [], captures: [], status: '', learnings: [], links: { demo: '', repository: '' } },
  ],
  // Change `source` to `api` only after wiring a verified GitHub integration.
  github: {
    source: 'manual',
    contributions: 105,
    message: 'Cada aporte resume un momento en el que decidí continuar construyendo, probando y aprendiendo.',
    profileUrl: '',
    featuredRepositories: [],
  },
  education: {
    studies: [],
    courses: [],
    certifications: [
      { name: 'BAM Certified', level: 'secondary', date: '', institution: '', evidenceUrl: '' },
      { name: 'KRII', level: 'secondary', date: '', institution: '', evidenceUrl: '' },
    ],
  },
  goals: ['Continuar fortaleciendo fundamentos de desarrollo de software.', 'Mejorar en React y desarrollo web.', 'Construir proyectos más completos.', 'Aprender a colaborar mejor con Git y GitHub.', 'Obtener una primera oportunidad profesional.', 'Continuar documentando el progreso.'],
};
