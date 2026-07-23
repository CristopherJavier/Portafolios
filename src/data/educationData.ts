export type EducationItem = {
  id: string;
  name: string;
  logo?: string;
  logoAlt?: string;
  period?: string;
  description?: string;
};

export const educationInstitutions: EducationItem[] = [
  { id: 'utesa', name: 'UTESA' },
  {
    id: 'teco-academy',
    name: 'T-eco Academy',
    logo: '/images/education/t-eco-academy.jpg',
    logoAlt: 'Logo de T-eco Academy',
  },
];
