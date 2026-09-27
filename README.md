# Portfolio — BTS SIO option SLAM

Un site statique en HTML, CSS et JavaScript, sans framework, sans dépendance à installer et sans compilation. Les polices et les logos sont locaux. Aucune requête tierce n'est nécessaire pour afficher le site.

## Ouvrir le site

**Le plus simple :** ouvrir `dist/index.html` dans un navigateur. L'architecture sans modules ni chargement de données par réseau est prévue pour cette ouverture directe. Elle n'a pas pu être vérifiée dans le navigateur intégré de développement, qui interdit les URL `file://` ; les vérifications réelles ont été effectuées avec le serveur local ci-dessous. L'accès au presse-papiers dépend des autorisations du navigateur ; un texte sélectionnable prend le relais en cas de refus.

**Pour travailler localement**, avec Node.js 20 ou plus installé, ouvrir un terminal dans ce dossier :

```sh
node scripts/serve.mjs
```

Ouvrir **http://127.0.0.1:4173**. Le serveur écoute uniquement sur votre ordinateur. Actualiser le navigateur après chaque modification ; `Ctrl+C` arrête le serveur. Aucun `npm install` n'est nécessaire.

Vérifier les fichiers, liens, ancres et données après une modification :

```sh
node scripts/check.mjs
```

## Structure

```text
portfolio/
├── dist/                          Tout le site à publier
│   ├── index.html                 Page principale et textes de structure
│   ├── projet.html                Modèle partagé de toutes les fiches
│   ├── .nojekyll                  Publication statique sur GitHub Pages
│   └── assets/
│       ├── css/styles.css         Identité, thèmes, composants, responsive
│       ├── css/project.css        Présentation des fiches projets
│       ├── js/data.js             CONTENUS À PERSONNALISER
│       ├── js/theme-init.js       Préférence de thème avant l'affichage
│       ├── js/common.js           Navigation, thème, fenêtres, utilitaires
│       ├── js/home.js             Sections, filtres et formulaire
│       ├── js/project.js          Fiches, ressources, projets précédent/suivant
│       ├── images/                Photo, miniatures, captures, favicon
│       ├── documents/             CV et autres PDF à ajouter
│       ├── fonts/                 Police Manrope locale
│       └── logos/                 Logos SVG locaux
├── scripts/serve.mjs              Petit serveur local sans dépendance
├── scripts/check.mjs              Vérification de cohérence
├── licenses/                     Sources et licences des ressources
├── VERIFICATIONS.md              Contrôles effectués et limites
└── README.md
```

`dist` contient ici directement les sources du site : il n'est pas généré, vous pouvez le modifier. Les scripts et la documentation ne sont pas nécessaires à l'hébergement.

## Où modifier quoi ?

| Contenu | Emplacement |
| --- | --- |
| Prénom, nom, initiales, présentation | `data.js` → `profile` |
| Ville, téléphone, e-mail, LinkedIn, GitHub | `data.js` → `profile` |
| Photo et CV | `data.js` → `profile.photo`, `profile.cv` |
| Parcours et panneaux « En savoir plus » | `data.js` → `journey` |
| Compétences et catégories | `data.js` → `skills`, `skillCategories` |
| Acquis antérieurs | `data.js` → `priorSkills` |
| Certifications | `data.js` → `certifications` |
| Projets et toutes les fiches | `data.js` → `projects` |
| Périodes de stage, titre de formation, titres de sections | `index.html` |
| Couleurs, espaces, rayons, police, transitions | `styles.css` → couche `tokens` |
| Métadonnées de l'accueil | `<head>` de `index.html` |

Le prénom et le nom restent volontairement « Prénom Nom » : ils n'ont pas été déduits de l'adresse e-mail. Mettre aussi à jour le `<title>` initial et la description de `index.html` pour les moteurs de recherche. Le titre est actualisé à partir des données dans le navigateur.

Les descriptions sont du texte simple, échappé automatiquement. Vous pouvez utiliser `\n` pour les retours à la ligne des blocs détaillés. Ne collez pas de HTML dans les contenus.

## Remplacer la photo, les miniatures et le CV

Déposer les fichiers dans `dist/assets/images/` ou `dist/assets/documents/`, puis renseigner des chemins **relatifs**, sans `/` au début :

```js
photo: 'assets/images/portrait.webp',
cv: 'assets/documents/cv.pdf',
linkedin: 'https://www.linkedin.com/in/votre-identifiant/',
github: 'https://github.com/votre-identifiant',
```

`null` conserve un emplacement explicite. Le bouton CV ouvre alors une fiche « CV à ajouter ». Avec un chemin valide, il ouvre le PDF dans un nouvel onglet. Les liens sociaux apparaissent comme « À renseigner » jusqu'à l'ajout d'une URL.

Une photo au format portrait et des miniatures au format paysage sont préférables. Compresser les images en WebP ou JPEG et renseigner les descriptions alternatives des illustrations. La favicon `assets/images/favicon.svg` utilise un « P » de portfolio : elle peut être remplacée par vos initiales définitives.

## Ajouter une compétence

Ajouter un objet dans `skills` :

```js
{
  id: 'nouvelle-technologie',
  name: 'Nom de la technologie',
  category: 'development',
  symbol: 'NT',
  description: 'Description à ajouter.',
  usage: 'Utilisation à renseigner.',
  learningContext: 'Contexte à renseigner.'
},
```

Catégories : `development`, `tools`, `databases`, `design`. Pour un logo, déposer `nom.svg` dans `assets/logos/`, puis utiliser `logo: 'nom'` à la place de `symbol`. Les symboles de SQL, WampServer, VirtualBox, Merise et UML sont des repères typographiques, pas des logos officiels. Les noms restent toujours affichés.

Les informations absentes dans la fiche obtiennent un court placeholder. Une nouvelle catégorie s'ajoute dans `skillCategories` ; son filtre et son groupe sont créés automatiquement. Ne changez pas les identifiants déjà utilisés dans `project.skillIds`.

## Ajouter une certification

Ajouter dans `certifications` :

```js
{
  id: 'certification-02',
  name: 'Nom de la certification',
  organization: 'Organisme',
  status: 'Obtenue',
  date: 'Date à renseigner',
  description: 'Description à ajouter.',
  proof: 'assets/documents/justificatif.pdf',
  upcoming: false
},
```

Utiliser `proof: null` si le justificatif manque. La carte PIX actuelle conserve le statut fourni « Obtenue ». Pour une carte future, utiliser `status: 'À venir'` et `upcoming: true`. Supprimer cette carte ou passer `settings.showUpcomingCertifications` à `false` pour la masquer.

## Ajouter un projet et sa fiche détaillée

Dupliquer un objet existant dans `projects`. Il n'y a **aucun nouveau fichier HTML à créer** : la fiche commune lit son identifiant dans l'URL, par exemple `projet.html?id=mon-projet`.

```js
{
  id: 'mon-projet',
  title: 'Titre du projet',
  category: 'school',
  sample: false,
  featured: true,
  e5: true,
  date: 'Période à renseigner',
  summary: 'Description à ajouter.',
  cover: { src: 'assets/images/mon-projet.webp', alt: 'Aperçu du projet' },
  skillIds: ['csharp', 'sql', 'git'],
  context: 'Contexte à renseigner.',
  objectives: 'Objectifs à renseigner.',
  realization: 'Réalisation à renseigner.',
  result: 'Résultat à renseigner.',
  illustrations: [],
  screenshots: [],
  diagrams: [],
  resources: [],
  repository: null,
  download: null,
  demo: null,
  pdf: null,
  block1: []
},
```

Catégories : `school`, `professional`, `personal`. `featured` ajoute une mise en avant ; `e5` ajoute le badge E5. Pour les exemples actuels, ces badges et les technologies sont illustratifs : ils ne prétendent pas décrire des réalisations validées.

L'ordre du tableau définit celui des cartes et des liens précédent/suivant. L'identifiant doit être unique, avec lettres minuscules, chiffres et tirets. Un identifiant absent ou inconnu affiche une page explicite avec retour aux projets.

Les collections facultatives peuvent être omises ou laissées vides : leurs emplacements restent visibles. Pour ajouter des médias :

```js
screenshots: [
  {
    src: 'assets/images/capture-projet.webp',
    alt: 'Description précise de la capture',
    caption: 'Légende à renseigner.'
  }
],
resources: [
  { label: 'Documentation', url: 'assets/documents/documentation.pdf' }
],
block1: [
  {
    label: 'Libellé exact de la compétence à renseigner',
    evidence: 'Preuve et contribution personnelles à décrire.',
    url: 'assets/documents/preuve.pdf'
  }
],
```

Les liens utilisent `target="_blank"` avec `rel="noopener noreferrer"`. La relation compétence ↔ projet repose sur `skillIds`. Les fiches de compétence affichent automatiquement les projets associés dont `sample` vaut `false`.

## Gérer les contenus temporaires

Les trois projets livrés portent `sample: true`. Pour conserver seulement vos réalisations réelles, renseigner celles-ci avec `sample: false` et passer `settings.showSampleProjects` à `false`. Les cartes de démonstration et leurs fiches deviennent alors indisponibles. Si aucun projet ne reste, un état vide est affiché.

Les éléments répétitifs s'enlèvent en supprimant leur objet du tableau. Les textes et documents manquants restent identifiables ; remplacez-les avant la publication. Une recherche de « à ajouter », « à renseigner », « à remplacer » et `null` aide à repérer les derniers emplacements.

## Formulaire de contact

Par défaut, `settings.contactEndpoint: null`. Le formulaire valide les quatre champs, affiche un bref état de vérification, puis indique explicitement qu'**aucun message n'a été envoyé**. Le texte saisi est conservé. Aucune donnée du formulaire n'est enregistrée localement.

Pour un envoi réel, connecter un service ou une fonction HTTPS qui accepte :

```http
POST /contact
Content-Type: application/json

{"name":"…","email":"…","subject":"…","message":"…"}
```

Le service doit retourner un statut HTTP de succès et `{"success":true}` uniquement quand il a réellement accepté le message. Renseigner son URL publique dans `settings.contactEndpoint`. Si le service utilise un autre format, adapter le petit bloc `fetch` dans `home.js`.

Le code gère déjà la validation, les doubles soumissions, une limite de 12 secondes, les erreurs et la confirmation. Un champ invisible piège les robots simples. Côté service, ajouter validation, limitation de fréquence et protection antispam ; autoriser le domaine du portfolio via CORS. Les clés d'envoi restent exclusivement côté serveur. GitHub Pages héberge les fichiers statiques : il ne traite pas lui-même les e-mails. Adapter aussi la mention d'information sur le traitement des données au service choisi.

## Thèmes et animations

Les deux palettes se modifient dans `styles.css`, sous `:root` et `:root[data-theme=dark]`. La préférence système est suivie tant qu'aucun choix manuel n'est enregistré. Le choix manuel persiste sous la clé `portfolio-theme` du navigateur. Les formulaires ne sont pas concernés par cette mémorisation.

Les animations, le défilement fluide et le halo décoratif respectent `prefers-reduced-motion`. Le curseur natif reste visible. La navigation mobile et les fiches sont utilisables au clavier ; Échap ferme le menu et les fenêtres de détail.

## Publier plus tard sur GitHub Pages

Le projet n'est pas publié. Pour une publication simple sans outil de compilation :

1. Créer un dépôt GitHub destiné au portfolio.
2. Copier **le contenu** de `dist/` à la racine du dépôt : `index.html` doit se trouver à la racine. Inclure `.nojekyll`.
3. Dans le dépôt, ouvrir **Settings → Pages**.
4. Choisir **Deploy from a branch**, puis la branche contenant les fichiers et le dossier **/(root)**.
5. Enregistrer et attendre la fin du déploiement GitHub.

Autre possibilité : copier le contenu de `dist/` dans `docs/` et sélectionner **/docs**. Le dossier `dist/` n'est pas une source directement sélectionnable pour ce mode de publication.

Tous les chemins sont relatifs : l'accueil et les fiches fonctionnent aussi sous `https://votre-compte.github.io/nom-du-depot/`. Aucune règle de réécriture n'est nécessaire. Les modifications futures consistent à remettre les fichiers modifiés dans la source choisie.

Référence : [documentation officielle GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Ressources et licences

Police [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), licence SIL OFL 1.1. Logos [Devicon](https://github.com/devicons/devicon), licence MIT ; noms et marques appartiennent à leurs titulaires. Les sources et copies des licences sont dans `licenses/`. La typographie d'accent utilise Georgia, une police système.

Les illustrations de remplacement sont des emplacements graphiques sobres. Aucune photographie fictive, identité personnelle ou réalisation réelle n'a été inventée.
