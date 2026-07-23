export type EducationItem = {
  id: string;
  name: string;
  program: string;
  period: string;
  description: string;
  logo?: string;
  logoAlt?: string;
};

export const educationSceneContent = {
  title: 'Formación',
} as const;

export const educationInstitutions: EducationItem[] = [
  {
    id: 'utesa',
    name: 'UTESA',
    program: 'Ingeniería en Sistemas Computacionales',
    period: '2024 — Actualidad',
    description:
      'Actualmente curso Ingeniería en Sistemas Computacionales, fortaleciendo mis conocimientos en programación, bases de datos y desarrollo de software.',
    logo: '/images/education/utesa-logo.png',
    logoAlt: 'Logo de UTESA',
  },
  {
    id: 'teco-academy',
    name: 'T-eco Academy',
    program: 'Formación en herramientas digitales y creativas',
    period: '2026 — Actualidad',
    description:
      'Formación multidisciplinaria en herramientas digitales, con aprendizaje práctico de Unity, fundamentos de Blender, diseño y prototipado en Figma y uso aplicado de herramientas de inteligencia artificial.',
    logo: '/images/education/t-eco-academy.jpg',
    logoAlt: 'Logo de T-eco Academy',
  },
];
