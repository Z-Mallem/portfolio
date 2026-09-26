window.PortfolioData = {
  profile: { firstName: 'Prénom', lastName: 'Nom', initials: 'PN', description: 'Description personnelle à ajouter.', photo: null, cv: null, city: 'Roanne', phone: '06 64 11 62 98', email: 'zaidmallem@icloud.com', linkedin: null, github: null },
  settings: { showSampleProjects: true, showUpcomingCertifications: true, contactEndpoint: null },
  // L'ordre est volontaire : le stage figure sous le bac, même si les dates se chevauchent.
  journey: [
    { id: 'bts', title: '1re année BTS SIO', subtitle: 'Services Informatiques aux Organisations', period: 'Septembre 2026 → Aujourd’hui', place: 'CNED — formation à distance', department: null, icon: 'graduation', current: true, summary: 'Description à ajouter.', details: 'Contenu à renseigner.' },
    { id: 'licence', title: 'Licence Mathématiques-Informatique', subtitle: null, period: 'Septembre 2024 → Mai 2026', place: 'Université Claude Bernard Lyon 1', department: '69', icon: 'graduation', current: false, summary: 'Description à ajouter.', details: 'Contenu à renseigner.' },
    { id: 'bac', title: 'Baccalauréat général', subtitle: 'Spécialités : Mathématiques et Physique-Chimie', period: 'Juin 2024', place: 'Lycée Jean Puy · Roanne', department: '42', icon: 'award', current: false, summary: 'Description à ajouter.', details: 'Contenu à renseigner.' },
    { id: 'stage', title: 'Stage dans un cabinet d’avocat', subtitle: 'Missions principalement liées à l’informatique', period: 'Période à renseigner', place: 'Roanne', department: '42', icon: 'briefcase', current: false, summary: 'Description à ajouter.', details: 'Stage commencé avant le bac et poursuivi après. Dates précises à renseigner.' }
  ],
  skillCategories: [
    { id: 'development', label: 'Développement web & applications', filter: 'Développement', icon: 'code', number: '01' },
    { id: 'tools', label: 'Outils & environnements', filter: 'Outils', icon: 'tools', number: '02' },
    { id: 'databases', label: 'Bases de données', filter: 'Bases de données', icon: 'database', number: '03' },
    { id: 'design', label: 'Méthodes de conception', filter: 'Conception', icon: 'network', number: '04' }
  ],
  // Les identifiants relient les compétences aux projets ; gardez-les stables.
  skills: [
    { id: 'csharp', name: 'C#', category: 'development', logo: 'csharp' },
    { id: 'python', name: 'Python', category: 'development', logo: 'python' },
    { id: 'java', name: 'Java', category: 'development', logo: 'java' },
    { id: 'php', name: 'PHP', category: 'development', logo: 'php' },
    { id: 'html', name: 'HTML', category: 'development', logo: 'html5' },
    { id: 'css', name: 'CSS', category: 'development', logo: 'css3' },
    { id: 'javascript', name: 'JavaScript', category: 'development', logo: 'javascript' },
    { id: 'sql', name: 'SQL', category: 'development', symbol: 'SQL' },
    { id: 'git', name: 'Git', category: 'tools', logo: 'git' },
    { id: 'github', name: 'GitHub', category: 'tools', logo: 'github' },
    { id: 'visualstudio', name: 'Visual Studio', category: 'tools', logo: 'visualstudio' },
    { id: 'netbeans', name: 'NetBeans', category: 'tools', logo: 'netbeans' },
    { id: 'eclipse', name: 'Eclipse', category: 'tools', logo: 'eclipse' },
    { id: 'pycharm', name: 'PyCharm', category: 'tools', logo: 'pycharm' },
    { id: 'wampserver', name: 'WampServer', category: 'tools', symbol: 'W' },
    { id: 'virtualbox', name: 'VirtualBox', category: 'tools', symbol: 'VB' },
    { id: 'wordpress', name: 'WordPress', category: 'tools', logo: 'wordpress' },
    { id: 'mysql', name: 'MySQL', category: 'databases', logo: 'mysql' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'databases', logo: 'postgresql' },
    { id: 'mongodb', name: 'MongoDB', category: 'databases', logo: 'mongodb' },
    { id: 'merise', name: 'Merise', category: 'design', symbol: 'M' },
    { id: 'uml', name: 'UML', category: 'design', symbol: 'UML' }
  ],
  priorSkills: ['C', 'C++', 'Python', 'Scheme', 'Unix / Linux', 'Algorithmique'],
  certifications: [
    { id: 'pix', name: 'PIX', organization: 'Pix', status: 'Obtenue', date: null, description: 'Description à ajouter.', proof: null, upcoming: false },
    { id: 'future', name: 'Prochaine certification', organization: null, status: 'À venir', date: null, description: 'Contenu à renseigner.', proof: null, upcoming: true }
  ],
  projectCategories: [
    { id: 'school', label: 'Scolaire', filter: 'Scolaires' },
    { id: 'professional', label: 'Professionnel', filter: 'Professionnels' },
    { id: 'personal', label: 'Personnel', filter: 'Personnels' }
  ],
  projects: [
    {
      id: 'projet-scolaire-01', title: 'Projet scolaire 01', category: 'school', sample: true, featured: true, e5: true,
      date: null, summary: 'Description à ajouter.', cover: null, skillIds: ['csharp', 'sql', 'git'],
      context: null, objectives: null, realization: null, result: null,
      illustrations: [], screenshots: [], diagrams: [], resources: [], repository: null, download: null, demo: null, pdf: null, block1: []
    },
    {
      id: 'projet-professionnel-01', title: 'Projet professionnel 01', category: 'professional', sample: true, featured: false, e5: false,
      date: null, summary: 'Description à ajouter.', cover: null, skillIds: ['python', 'mysql'],
      context: null, objectives: null, realization: null, result: null,
      illustrations: [], screenshots: [], diagrams: [], resources: [], repository: null, download: null, demo: null, pdf: null, block1: []
    },
    {
      id: 'projet-personnel-01', title: 'Projet personnel 01', category: 'personal', sample: true, featured: false, e5: false,
      date: null, summary: 'Description à ajouter.', cover: null, skillIds: ['html', 'css', 'javascript'],
      context: null, objectives: null, realization: null, result: null,
      illustrations: [], screenshots: [], diagrams: [], resources: [], repository: null, download: null, demo: null, pdf: null, block1: []
    }
  ]
};
