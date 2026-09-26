(() => {
  const data = window.PortfolioData;
  const { icon, escape:e, safeUrl, resource, skillsFor, projectLink, visibleProjects } = window.Portfolio;
  const projects = visibleProjects();
  const id = new URLSearchParams(location.search).get('id');
  const index = projects.findIndex(project => project.id === id);
  const project = projects[index];
  const root = document.querySelector('#project-content');
  if (!project) {
    document.title = 'Projet introuvable — Portfolio';
    root.innerHTML = `<div class="project-not-found"><p class="eyebrow">PROJET INTROUVABLE</p><h1>Cette fiche n’est<br><em>pas disponible.</em></h1><p>Le lien est incomplet ou le projet n’est plus présenté.</p><a class="button primary" href="index.html#projets">Revenir aux projets ${icon('arrow-right')}</a></div>`;
    return;
  }
  // Optional collections always retain their placeholder instead of breaking the page.
  for (const key of ['illustrations','screenshots','diagrams','resources','block1']) project[key] ??= [];
  const category = data.projectCategories.find(item => item.id === project.category);
  document.title = `${project.title} — ${data.profile.firstName} ${data.profile.lastName}`;
  document.querySelector('meta[name="description"]').content = `${project.title} — ${project.summary || 'Fiche de réalisation.'}`;
  const content = (label,text,number) => `<section class="project-text-section" aria-labelledby="block-${number}"><span class="content-number">${number}</span><div><h2 id="block-${number}">${e(label)}</h2><p>${e(text || 'Contenu à renseigner.')}</p></div></section>`;
  const gallery = (title, items, type) => `<section class="project-gallery-group"><h3>${e(title)}</h3><div class="detail-gallery">${items.length ? items.map(item => {
    const src = safeUrl(item.src);
    return src ? `<figure><a href="${e(src)}" target="_blank" rel="noopener noreferrer"><img src="${e(src)}" alt="${e(item.alt || title)}" width="800" height="500" loading="lazy"></a>${item.caption ? `<figcaption>${e(item.caption)}</figcaption>` : ''}</figure>` : `<div class="media-placeholder">${icon(type)}<span>Image à remplacer</span></div>`;
  }).join('') : `<div class="media-placeholder">${icon(type)}<span>${type === 'network' ? 'Schéma à ajouter' : 'Image à remplacer'}</span></div>`}</div></section>`;
  const adjacent = (target,label,forward) => target ? `<a href="${projectLink(target)}" class="adjacent-project ${forward ? 'is-next' : ''}"><span>${e(label)}</span><strong>${e(target.title)} ${icon(forward ? 'arrow-right' : 'arrow-up-right')}</strong></a>` : `<span class="adjacent-project is-disabled ${forward ? 'is-next' : ''}" aria-disabled="true"><span>${e(label)}</span><strong>${forward ? 'Dernier projet' : 'Premier projet'}</strong></span>`;
  root.innerHTML = `<nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="index.html#accueil">Accueil</a><span aria-hidden="true">/</span><a href="index.html#projets">Projets</a><span aria-hidden="true">/</span><span aria-current="page">${e(project.title)}</span></nav>
    <header class="project-intro"><p class="eyebrow">RÉALISATION ${String(index + 1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</p><div class="project-intro-badges"><span class="badge">${e(category?.label || project.category)}</span>${project.e5 ? '<span class="badge e5-badge">E5</span>' : ''}${project.featured ? '<span class="badge">Projet principal</span>' : ''}</div><h1>${e(project.title)}<span class="title-dot">.</span></h1><p class="project-intro-summary">${e(project.summary || 'Description à ajouter.')}</p><p class="project-period">${icon('file')} ${e(project.date || 'Date / période à renseigner')}</p>${project.sample ? '<p class="project-demo-note">Fiche de démonstration · contenus à remplacer.</p>' : ''}</header>
    <div class="project-detail-layout"><div class="project-main-content">
    ${content('Contexte',project.context,'01')}${content('Objectifs',project.objectives,'02')}${content('Réalisation',project.realization,'03')}${content('Résultat',project.result,'04')}
    </div><aside class="project-sidebar"><section class="project-tech-panel"><p class="eyebrow">DANS CE PROJET</p><h2>Technologies utilisées</h2><div class="tags">${skillsFor(project).map(skill => `<span class="tag">${e(skill.name)}</span>`).join('') || '<span class="placeholder-text">Technologies à renseigner.</span>'}</div>${project.sample ? '<p class="placeholder-text">Sélection illustrative à adapter.</p>' : ''}</section><section class="block1-panel"><div class="block1-heading">${icon('graduation')}<span class="eyebrow">BTS SIO · BLOC 1</span></div><h2>Compétences du bloc 1</h2>${project.block1.length ? `<ul>${project.block1.map(item => `<li><strong>${e(item.label)}</strong><p>${e(item.evidence || 'Preuve à renseigner.')}</p>${safeUrl(item.url) ? `<a class="text-link" href="${e(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">Voir la preuve ${icon('external')}</a>` : ''}</li>`).join('')}</ul>` : '<p>Compétences à associer.</p><p class="block1-note">Éléments de preuve à ajouter.</p>'}</section></aside></div>
    <section class="project-media-section" aria-labelledby="media-title"><div class="subsection-heading"><h2 id="media-title">Le projet en images<span class="title-dot">.</span></h2><span>ILLUSTRER & DOCUMENTer</span></div><div class="media-columns">${gallery('Illustrations',project.illustrations,'image')}${gallery('Captures d’écran',project.screenshots,'code')}${gallery('Schémas',project.diagrams,'network')}</div></section>
    <section class="project-resources" aria-labelledby="resources-title"><h2 id="resources-title">Ressources</h2><div class="resource-grid">${resource('Code source · GitHub',project.repository,'github')}${resource('Téléchargement',project.download,'arrow-down')}${resource('Site / production',project.demo,'external')}${resource('Document PDF',project.pdf,'file')}${project.resources.map(item => resource(item.label,item.url,item.type || 'file')).join('')}</div></section>
    <nav class="project-pagination" aria-label="Parcourir les projets">${adjacent(projects[index-1],'Projet précédent',false)}${adjacent(projects[index+1],'Projet suivant',true)}</nav>
    <div class="project-back"><a class="button secondary" href="index.html#projets">Tous les projets ${icon('arrow-up-right')}</a></div>`;
})();
