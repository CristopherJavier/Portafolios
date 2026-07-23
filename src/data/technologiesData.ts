export type TechnologyStatus = 'Uso en proyectos' | 'En aprendizaje' | 'Fundamentos';

export type TechnologyIconKey =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'vite'
  | 'bootstrap'
  | 'firebase'
  | 'sql'
  | 'postgresql'
  | 'supabase'
  | 'nodejs'
  | 'git'
  | 'github'
  | 'figma'
  | 'unity'
  | 'blender'
  | 'python'
  | 'visual-studio-code'
  | 'chatgpt'
  | 'claude'
  | 'gemini'
  | 'codex'
  | 'github-copilot';

export type TechnologyItem = {
  id: string;
  name: string;
  status: TechnologyStatus;
  iconKey: TechnologyIconKey;
};

export type TechnologyGroup = {
  id: string;
  title: string;
  description?: string;
  technologies: TechnologyItem[];
};

export const technologiesSceneContent = {
  title: 'Tecnologías',
} as const;

export const technologyGroups: TechnologyGroup[] = [
  {
    id: 'web-development',
    title: 'Desarrollo web',
    technologies: [
      { id: 'html', name: 'HTML', status: 'Uso en proyectos', iconKey: 'html' },
      { id: 'css', name: 'CSS', status: 'Uso en proyectos', iconKey: 'css' },
      { id: 'javascript', name: 'JavaScript', status: 'Uso en proyectos', iconKey: 'javascript' },
      { id: 'typescript', name: 'TypeScript', status: 'Uso en proyectos', iconKey: 'typescript' },
      { id: 'react', name: 'React', status: 'Uso en proyectos', iconKey: 'react' },
      { id: 'vite', name: 'Vite', status: 'Fundamentos', iconKey: 'vite' },
      { id: 'bootstrap', name: 'Bootstrap', status: 'Fundamentos', iconKey: 'bootstrap' },
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend y datos',
    technologies: [
      { id: 'firebase', name: 'Firebase', status: 'Uso en proyectos', iconKey: 'firebase' },
      { id: 'sql', name: 'SQL', status: 'Uso en proyectos', iconKey: 'sql' },
      { id: 'postgresql', name: 'PostgreSQL', status: 'Uso en proyectos', iconKey: 'postgresql' },
      { id: 'supabase', name: 'Supabase', status: 'Uso en proyectos', iconKey: 'supabase' },
      { id: 'nodejs', name: 'Node.js', status: 'Uso en proyectos', iconKey: 'nodejs' },
    ],
  },
  {
    id: 'version-control',
    title: 'Control de versiones',
    technologies: [
      { id: 'git', name: 'Git', status: 'Uso en proyectos', iconKey: 'git' },
      { id: 'github', name: 'GitHub', status: 'Uso en proyectos', iconKey: 'github' },
    ],
  },
  {
    id: 'design-creation',
    title: 'Diseño y creación',
    technologies: [
      { id: 'figma', name: 'Figma', status: 'Uso en proyectos', iconKey: 'figma' },
      { id: 'unity', name: 'Unity', status: 'En aprendizaje', iconKey: 'unity' },
      { id: 'blender', name: 'Blender', status: 'En aprendizaje', iconKey: 'blender' },
    ],
  },
  {
    id: 'additional-programming',
    title: 'Programación adicional',
    technologies: [{ id: 'python', name: 'Python', status: 'Fundamentos', iconKey: 'python' }],
  },
  {
    id: 'tools',
    title: 'Herramientas',
    technologies: [
      {
        id: 'visual-studio-code',
        name: 'Visual Studio Code',
        status: 'Uso en proyectos',
        iconKey: 'visual-studio-code',
      },
    ],
  },
  {
    id: 'applied-artificial-intelligence',
    title: 'Inteligencia artificial aplicada',
    description:
      'Uso práctico de herramientas de inteligencia artificial como apoyo en el aprendizaje, el desarrollo de proyectos, la resolución de problemas y la creación de contenido digital.',
    technologies: [
      { id: 'chatgpt', name: 'ChatGPT', status: 'Uso en proyectos', iconKey: 'chatgpt' },
      { id: 'claude', name: 'Claude', status: 'Uso en proyectos', iconKey: 'claude' },
      { id: 'gemini', name: 'Gemini', status: 'Uso en proyectos', iconKey: 'gemini' },
      { id: 'codex', name: 'Codex', status: 'Uso en proyectos', iconKey: 'codex' },
      { id: 'github-copilot', name: 'GitHub Copilot', status: 'Uso en proyectos', iconKey: 'github-copilot' },
    ],
  },
];
