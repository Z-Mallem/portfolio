window.PortfolioData = {
  profile: { firstName: 'Zaïd', lastName: 'Mallem', initials: 'ZM', description: "L’informatique m’a toujours passionné, en particulier le domaine de la programmation et du développement. J’aime comprendre le fonctionnement des programmes, résoudre les problèmes rencontrés et surtout développer une application jusqu’à la voir fonctionner.\n\nAprès deux années en licence Mathématiques-Informatique à l’Université Lyon 1, j’ai choisi de me réorienter vers un BTS SIO option SLAM afin de suivre une formation plus professionnalisante et davantage centrée sur la pratique. Une fois mon BTS acquis , je souhaite poursuivre dans le domaine du développement d’applications.", photo: 'assets/images/zaid-mallem-portrait.png', cv: 'assets/documents/zaid-mallem-cv.pdf', city: 'Roanne', phone: '06 64 11 62 98', email: 'zaidmallem@icloud.com', linkedin: "https://www.linkedin.com/in/zaïd-mallem-347114415", github: "https://github.com/Z-Mallem" },
  settings: { showSampleProjects: true, showUpcomingCertifications: true, contactEndpoint: null },
  // L'ordre est volontaire : le stage figure sous le bac, même si les dates se chevauchent.
  journey: [
    { id: 'bts', title: '1re année BTS SIO', subtitle: 'Services Informatiques aux Organisations', period: 'Septembre 2026 → Aujourd’hui', place: 'CNED — formation à distance', department: null, icon: 'graduation', current: true, summary: "Formation professionnalisante orientée vers la conception, le développement et la maintenance d’applications informatiques ainsi que la cybersécurité applicative", details: "Le BTS Services Informatiques aux Organisations (SIO) est une formation en deux ans préparant aux métiers de l’informatique. Elle forme des techniciens supérieur spécialisés dans le développement d’applications (option SLAM) ou dans la gestion des systèmes et réseaux (option SISR)\n\nJe suis l’option SLAM (Solutions Logicielles et Applications Métiers), principalement orientée vers  le développement, la maintenance et l’évolution d’applications ; les bases de données, le génie logiciel, les technologies web et la cybersécurité applicative." },
    { id: 'licence', title: 'Licence Mathématiques-Informatique', subtitle: null, period: 'Septembre 2024 → Mai 2026', place: 'Université Claude Bernard Lyon 1', department: '69', icon: 'graduation', current: false, summary: "Formation universitaire associant enseignements en mathématiques et en informatique, notamment autour de la programmation, de l’algorithmique et des fondamentaux de l’informatique.", details: "J’ai suivi pendant deux années une licence Mathématiques-Informatique à l’Université Claude Bernard Lyon 1. La première avec la majeure mathématique ; car bien que l’informatique m’ait toujours intéressé, en dehors de l’enseignement général en SNT il n’y avait pas de spécialité en rapport avec l’informatique dans mon lycée. Je craignais donc un potentiel retard sur les autres en prenant la majeur informatique ; laquelle j’ai finalement choisis lors de ma seconde année. \n\nCette formation m’a permis d’acquérir des bases en programmation, en algorithmique et plus largement dans les fondamentaux de l’informatique, tout en suivant un enseignement important en mathématiques. \n\nJ’ai ensuite choisi de me réorienter vers le BTS SIO afin de poursuivre dans une formation davantage professionnalisante, pratique et centrée sur l’informatique et le développement. là ou la licence était très général et davantage centrée sur les math." },
    { id: 'bac', title: 'Baccalauréat général', subtitle: 'Spécialités : Mathématiques et Physique-Chimie', period: 'Juin 2024', place: 'Lycée Jean Puy · Roanne', department: '42', icon: 'award', current: false, summary: "Baccalauréat général avec les spécialités Mathématiques et Physique-Chimie. Bien que mon lycée ne proposait pas la spécialité NSI, j’étais déjà particulièrement intéressé par l’informatique et la programmation.", details: "J’ai obtenu un baccalauréat général avec les spécialités Mathématiques et Physique-Chimie. Mon lycée ne proposant pas la spécialité NSI, je n’ai pas pu suivre d’enseignement informatique approfondi, même si ce domaine m’intéressait déjà beaucoup, en particulier la programmation.\n\nMes enseignants avaient d’ailleurs régulièrement remarqué cette appétence et m’avaient encouragé à poursuivre dans cette voie. Après le bac, je me suis donc naturellement orienté vers l’informatique, tout en conservant les mathématiques, qui étaient alors mon domaine de formation principal." },
    { id: 'stage', title: 'Stages en cabinet d’avocat', subtitle: 'Missions principalement liées à l’informatique', period: "[Pré Bac]", place: 'Roanne', department: '42', icon: 'briefcase', current: false, summary: "[Stages réalisés dans des cabinet d’avocat, avec plusieurs missions notamment liées à l’informatique et à l’utilisation des outils numériques du cabinet. ]", details: "[Lors de ces stages, j’ai pu découvrir le métier d’avocat dans plusieurs cabinets, observer les différentes tâches réalisées au quotidien et assister à des audiences au tribunal. \n\nJ’ai également effectué plusieurs missions liées à l’informatique, notamment la refonte et la gestion du site internet de l’un des cabinets, ainsi que la gestion de fichiers et de ressources numériques. \n\nCes expériences m’ont permis de découvrir l’utilisation de l’informatique dans un environnement professionnel différent du secteur informatique classique, tout en mettant en pratique certaines de mes connaissances dans un contexte concret.\n\nCes stages ont été réalisés sur plusieurs périodes. Les premiers ayant commencé avant l’obtention de mon baccalauréat, ils sont donc présentés à cet emplacement dans la chronologie du parcours. ]" }
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
