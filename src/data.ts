import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  projectMetadata: {
    title: "Portafolio Personal - Desarrollador Junior",
    version: "1.0.0",
    description: "Portafolio interactivo enfocado en progreso, fundamentos técnicos y potencial de crecimiento. Evita métricas falsas y se centra en narrar la trayectoria de aprendizaje y proyectos reales.",
    ethicalFramework: "Basado en los principios del Código de Ética de la Ingeniería de Software/Sistemas (IEEE-CS y ACM) para garantizar transparencia en las habilidades y accesibilidad en el diseño."
  },
  personalProfile: {
    name: "Mateo Silva",
    initials: "MS",
    role: "Estudiante de Programación y Desarrollador Junior",
    bio: "Apasionado por la arquitectura de software limpia y la resolución de problemas lógicos. Dedico mi tiempo a asimilar fundamentos técnicos sólidos de frontend y bases de datos relacionales, creyendo fielmente en que la transparencia, el código ordenado y la automejora continua son los pilares de un excelente ingeniero de sistemas.",
    status: "Construyendo experiencia y fundamentos sólidos",
    location: "Medellín, Colombia",
    availability: "Disponible para vacantes Junior y Proyectos Open Source",
    social: {
      github: "https://github.com/mateosilvadev",
      linkedin: "https://linkedin.com/in/mateosilvadev",
      email: "mateosilvadev@gmail.com"
    }
  },
  milestones: [
    {
      id: "m1",
      title: "Primeras líneas de código",
      description: "Comprendiendo la lógica de programación y estructuras de control.",
      date: "Feb 2025",
      details: "Dominé los fundamentos de la programación secuencial, condicionales y ciclos en JavaScript y C#. Me enfoqué en resolver más de 100 ejercicios de algoritmos para entrenar el pensamiento analítico."
    },
    {
      id: "m2",
      title: "El salto a bases de datos",
      description: "Aprendizaje de diagramas Entidad-Relación y SQL puro.",
      date: "May 2025",
      details: "Estudié a fondo la normalización de bases de datos (hasta 3FN). Creé scripts complejos de consultas relacionales utilizando uniones, subconsultas y optimización de índices para garantizar la integridad referencial."
    },
    {
      id: "m3",
      title: "Construyendo para la web",
      description: "Integración de HTML, CSS, JavaScript y React.",
      date: "Jul 2025",
      details: "Comencé a estructurar interfaces web modernas y adaptables, asegurando que sigan buenas prácticas de accesibilidad web (WCAG 2.1) y un flujo de estados dinámico con React."
    }
  ],
  skillCategories: [
    {
      name: "Utilizo con confianza",
      items: ["HTML", "CSS", "JavaScript", "SQL", "Draw.io"]
    },
    {
      name: "Sigo practicando y mejorando",
      items: ["React", "C#", "Git", "GitHub"]
    },
    {
      name: "Comenzando a explorar",
      items: ["Firebase", "Vite", "Arquitectura Frontend"]
    }
  ],
  projects: [
    {
      id: "p1",
      name: "Guardería Pequeños Pasos",
      type: "Diseño de Base de Datos",
      technologies: ["SQL", "Diagramas ER", "Normalización"],
      description: "Caso de estudio completo para un sistema escolar de educación infantil. Diseñé el esquema relacional desde cero, normalicé las entidades para evitar anomalías, dibujé diagramas Entidad-Relación precisos y programé scripts SQL de inserción y consultas optimizadas.",
      learnings: "Dominio de la integridad referencial de llaves foráneas y optimización de esquemas relacionales a través de la normalización.",
      status: "Completado",
      links: {
        github: "https://github.com/mateosilvadev/guarderia-pequenos-pasos"
      }
    },
    {
      id: "p2",
      name: "App Multi-Rol: Grupo Corporativo La Aurora",
      type: "Aplicación Administrativa",
      technologies: ["React", "JavaScript", "CSS"],
      description: "Diseño, especificación de requerimientos y prototipo funcional para un sistema administrativo con manejo estricto de roles de usuario (administrador y general). Cuenta con autenticación simulada persistente y paneles diferenciados.",
      learnings: "Implementación efectiva de rutas protegidas en React, gestión de estados centralizados y diseño de interfaces de usuario modulares altamente responsivas.",
      status: "En desarrollo",
      links: {
        github: "https://github.com/mateosilvadev/la-aurora-app"
      }
    },
    {
      id: "p3",
      name: "Gemini UI Designer Prompt",
      type: "Prompt Engineering / Herramientas Internas",
      technologies: ["JSON", "Prompt Design", "IA"],
      description: "Configuración y refinamiento de un asistente de IA especializado en generar especificaciones técnicas estructuradas en formato JSON para equipos de desarrollo frontend. Garantiza salidas consistentes que encajan con sistemas de diseño predefinidos.",
      learnings: "Estructuración estricta de datos, ingeniería de contexto, control de tokens y diseño de interfaces máquina-a-máquina fluidas.",
      status: "Completado",
      links: {
        github: "https://github.com/mateosilvadev/gemini-ui-prompter"
      }
    }
  ],
  githubActivity: {
    contributions: 105,
    message: "Construyendo el hábito. Estas contribuciones representan mi progreso diario, pruebas, errores y aprendizajes, no un dominio absoluto."
  },
  education: {
    academic: "Ingeniería de Sistemas - Universidad Tecnológica (En curso)",
    courses: [
      "Oracle Academy: Database Foundations & SQL Certification",
      "Udemy: React - La Guía Completa (Hooks, MERN, Context, Redux)",
      "edX: Introducción a la Computación y Programación Práctica"
    ]
  },
  goals: [
    { id: "g1", text: "Fortalecer mis fundamentos de ingeniería de software.", icon: "binary" },
    { id: "g2", text: "Construir proyectos integrando frontend y bases de datos reales.", icon: "database" },
    { id: "g3", text: "Colaborar en equipo y aprender metodologías ágiles en un entorno real.", icon: "users" }
  ]
};
