export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface PersonalProfile {
  name: string;
  initials: string;
  role: string;
  bio: string;
  status: string;
  location: string;
  availability: string;
  social: SocialLinks;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  details: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  type: string;
  technologies: string[];
  description: string;
  learnings: string;
  status: 'Completado' | 'En desarrollo' | 'Planificado';
  links: {
    github?: string;
    demo?: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface AcademicGoal {
  id: string;
  text: string;
  icon: string;
}

export interface PortfolioData {
  projectMetadata: {
    title: string;
    version: string;
    description: string;
    ethicalFramework: string;
  };
  personalProfile: PersonalProfile;
  milestones: Milestone[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  githubActivity: {
    contributions: number;
    message: string;
  };
  education: {
    academic: string;
    courses: string[];
  };
  goals: AcademicGoal[];
}
