(() => {
  const data = window.PortfolioData;
  const { icon, escape: e, safeUrl, skillsFor, projectLink, showDialog, resource, visibleProjects, toast, reveal } = window.Portfolio;
  document.title = `${data.profile.firstName} ${data.profile.lastName} — Portfolio · BTS SIO SLAM`;
  const portrait = safeUrl(data.profile.photo);
  if (portrait) document.querySelector('#portrait-slot').innerHTML = `<img src="${e(portrait)}" width="255" height="318" alt="Portrait de ${e(data.profile.firstName)} ${e(data.profile.lastName)}">`;
  const today = new Intl.DateTimeFormat('fr-FR', {dateStyle:'long'}).format(new Date());
  document.querySelector('#timeline').innerHTML = data.journey.map(entry => `<article class="timeline-entry ${entry.current ? 'is-current' : ''}">
    <div class="timeline-date"><p${entry.current ? ` title="Aujourd’hui : ${e(today)}"` : ''}>${e(entry.period)}</p>${entry.current ? '<span class="badge current-badge"><span class="status-dot"></span>En cours</span>' : ''}</div>
    <div class="timeline-marker">${icon(entry.icon)}</div>
    <div class="timeline-card"><h3>${e(entry.title)}</h3>${entry.subtitle ? `<p class="timeline-subtitle">${e(entry.subtitle)}</p>` : ''}<p class="timeline-location">${icon('map-pin')}<span>${e(entry.place)}${entry.department ? ` <span class="department">${e(entry.department)}</span>` : ''}</span></p><p class="timeline-summary">${e(entry.summary)}</p>
    <details class="timeline-details"><summary>En savoir plus <span>${icon('plus')}</span></summary><div class="details-content"><p>${e(entry.details)}</p></div></details></div>
  </article>`).join('');
  const filterButton = (id, text, pressed) => `<button type="button" class="filter-button" data-filter="${e(id)}" aria-pressed="${pressed}">${e(text)}</button>`;
  document.querySelector('#skill-filters').innerHTML = filterButton('all','Tout afficher',true) + data.skillCategories.map(group => filterButton(group.id,group.filter,false)).join('');
  const skillLogo = skill => skill.logo ? `<span class="skill-logo"><img src="assets/logos/${e(skill.logo)}.svg" width="27" height="27" alt="" loading="lazy"></span>` : `<span class="skill-logo symbol-logo" aria-hidden="true">${e(skill.symbol || skill.name.slice(0,2))}</span>`;
  document.querySelector('#skill-groups').innerHTML = data.skillCategories.map(group => {
    const skills = data.skills.filter(skill => skill.category === group.id);
    return `<article class="skill-group" data-category="${e(group.id)}"><div class="skill-group-heading"><div>${icon(group.icon)}<h3>${e(group.label)}</h3></div><span class="group-number">${e(group.number)}</span></div><div class="skill-grid">${skills.map(skill => `<div class="skill-tile">${skillLogo(skill)}<span>${e(skill.name)}</span><button class="skill-info" type="button" data-skill="${e(skill.id)}" aria-label="En savoir plus sur ${e(skill.name)}">${icon('info')}</button></div>`).join('')}</div></article>`;
  }).join('');
  document.querySelector('#skill-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-filter]'); if (!button) return;
    document.querySelectorAll('#skill-filters button').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    document.querySelectorAll('.skill-group').forEach(el => el.hidden = button.dataset.filter !== 'all' && el.dataset.category !== button.dataset.filter);
    document.querySelector('#skill-status').textContent = button.dataset.filter === 'all' ? 'Toutes les catégories sont affichées.' : `Catégorie affichée : ${button.textContent}.`;
  });
  document.querySelector('#skill-groups').addEventListener('click', event => {
    const trigger = event.target.closest('[data-skill]'); if (!trigger) return;
    const skill = data.skills.find(item => item.id === trigger.dataset.skill);
    const projects = visibleProjects().filter(project => !project.sample && (project.skillIds ?? []).includes(skill.id));
    showDialog(skill.name, `<div class="dialog-skill-logo">${skillLogo(skill)}<span>En cours d’acquisition</span></div><h3>Description</h3><p>${e(skill.description || 'Description à ajouter.')}</p><h3>Utilisation</h3><p>${e(skill.usage || 'Utilisation à renseigner.')}</p><h3>Contexte d’apprentissage</h3><p>${e(skill.learningContext || 'Contexte à renseigner.')}</p>${projects.length ? `<h3>Projets associés</h3><ul class="related-projects">${projects.map(project => `<li><a href="${projectLink(project)}">${e(project.title)} ${icon('arrow-up-right')}</a></li>`).join('')}</ul>` : ''}`, 'COMPÉTENCE');
  });
  document.querySelector('#prior-tags').innerHTML = data.priorSkills.map(name => `<span class="tag">${e(name)}</span>`).join('');
  document.querySelector('#certifications').innerHTML = data.certifications.filter(cert => data.settings.showUpcomingCertifications || !cert.upcoming).map(cert => `<article class="certification-card ${cert.upcoming ? 'is-upcoming' : ''}"><div class="certification-emblem">${cert.id === 'pix' ? '<span>pix</span>' : icon('award')}</div><div class="certification-content"><div class="certification-title"><h4>${e(cert.name)}</h4><span class="badge ${cert.upcoming ? '' : 'current-badge'}">${cert.upcoming ? '' : icon('check')}${e(cert.status)}</span></div><p>${e(cert.description || 'Description à ajouter.')}</p><p class="certification-meta">${e(cert.organization || 'Organisme à renseigner')} · ${e(cert.date || 'Date à renseigner')}</p>${!cert.upcoming ? (safeUrl(cert.proof) ? `<a class="text-link" href="${e(safeUrl(cert.proof))}" target="_blank" rel="noopener noreferrer">Voir le justificatif ${icon('arrow-up-right')}</a>` : `<button class="text-link plain-button" type="button" data-proof="${e(cert.id)}">Voir le justificatif ${icon('file')}</button>`) : ''}</div></article>`).join('');
  document.querySelector('#certifications').addEventListener('click', event => {
    const trigger = event.target.closest('[data-proof]');
    if (!trigger) return;
    const certification = data.certifications.find(item => item.id === trigger.dataset.proof);
    showDialog(`Justificatif ${certification.name}`, '<p>Justificatif à ajouter.</p>', 'CERTIFICATION');
  });
  document.querySelector('#project-filters').innerHTML = filterButton('all','Tout',true) + data.projectCategories.map(category => filterButton(category.id,category.filter,false)).join('');
  const projects = visibleProjects();
  document.querySelector('#project-grid').innerHTML = projects.map((project,index) => {
    const category = data.projectCategories.find(item => item.id === project.category);
    const cover = safeUrl(project.cover?.src);
    return `<article class="project-card ${project.featured ? 'is-featured' : ''}" data-category="${e(project.category)}"><a href="${projectLink(project)}" class="project-image ${e(project.category)}" tabindex="-1" aria-hidden="true">${cover ? `<img src="${e(cover)}" alt="" width="600" height="380" loading="lazy">` : `<span class="image-index">${String(index+1).padStart(2,'0')} / ${e(category?.label || 'PROJET').toUpperCase()}</span><span class="project-glyph">${project.category === 'school' ? '&lt;/&gt;' : project.category === 'professional' ? '{ }' : '[ ]'}</span><span class="image-placeholder-label">${icon('image')} Image à remplacer</span>`}${project.featured ? '<span class="featured-label">PROJET PRINCIPAL</span>' : ''}</a><div class="project-card-body"><div class="project-meta"><span class="badge">${e(category?.label || project.category)}</span>${project.e5 ? '<span class="badge e5-badge">E5</span>' : ''}<span class="project-date">${e(project.date || 'Date à renseigner')}</span></div><h3>${e(project.title)}</h3><p>${e(project.summary || 'Description à ajouter.')}</p><div class="tags">${skillsFor(project).map(skill => `<span class="tag">${e(skill.name)}</span>`).join('')}</div><a class="project-link" href="${projectLink(project)}">Voir le projet <span class="sr-only">${e(project.title)}</span>${icon('arrow-up-right')}</a></div></article>`;
  }).join('');
  const updateProjectCount = () => {
    const count = [...document.querySelectorAll('.project-card')].filter(el => !el.hidden).length;
    document.querySelector('#project-count').textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}`;
    document.querySelector('#project-empty').hidden = count !== 0;
  };
  document.querySelector('#project-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-filter]'); if (!button) return;
    document.querySelectorAll('#project-filters button').forEach(el => el.setAttribute('aria-pressed',String(el === button)));
    document.querySelectorAll('.project-card').forEach(el => el.hidden = button.dataset.filter !== 'all' && el.dataset.category !== button.dataset.filter);
    updateProjectCount();
  });
  updateProjectCount(); document.querySelector('#sample-note').hidden = !projects.some(project => project.sample);
  document.querySelector('#contact-details').innerHTML = `<div class="contact-detail">${icon('map-pin')}<div><span>LOCALISATION</span><p>${e(data.profile.city)}</p></div></div><div class="contact-detail">${icon('mail')}<div><span>E-MAIL</span><a href="mailto:${e(data.profile.email)}">${e(data.profile.email)}</a></div><button class="icon-button copy-email" type="button" aria-label="Copier l’adresse e-mail">${icon('copy')}</button></div><div class="contact-detail">${icon('phone')}<div><span>TÉLÉPHONE</span><a href="tel:${e(data.profile.phone.replace(/^0/,'+33').replace(/\s/g,''))}">${e(data.profile.phone)}</a></div></div>`;
  document.querySelector('.copy-email').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(data.profile.email); toast('Adresse e-mail copiée.'); }
    catch { showDialog('Copier l’adresse e-mail', `<p>Sélectionnez l’adresse pour la copier :</p><p class="copy-fallback">${e(data.profile.email)}</p>`, 'CONTACT'); }
  });
  document.querySelector('#social-links').innerHTML = resource('LinkedIn',data.profile.linkedin,'linkedin') + resource('GitHub',data.profile.github,'github');
  const form = document.querySelector('#contact-form');
  const fields = ['name','email','subject','message'];
  const status = document.querySelector('#form-status');
  let sending = false;
  const validate = name => {
    const input = form.elements[name]; const value = input.value.trim(); let error = '';
    if (!value) error = 'Ce champ est obligatoire.';
    else if (name === 'email' && (input.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) error = 'Renseignez une adresse e-mail valide.';
    else if (name === 'message' && value.length < 10) error = 'Votre message doit contenir au moins 10 caractères.';
    else if (value.length > input.maxLength) error = `Maximum : ${input.maxLength} caractères.`;
    document.querySelector(`#${name}-error`).textContent = error;
    if(error) input.setAttribute('aria-invalid','true'); else input.removeAttribute('aria-invalid');
    return !error;
  };
  fields.forEach(name => {
    const input = form.elements[name];
    input.addEventListener('blur', () => { if(input.value || input.hasAttribute('aria-invalid')) validate(name); });
    input.addEventListener('input', () => { if(input.hasAttribute('aria-invalid')) validate(name); if(!sending) {status.textContent=''; status.className='form-status';} });
  });
  if(data.settings.contactEndpoint) document.querySelector('.form-note').textContent = 'Les champs marqués d’un astérisque sont obligatoires.';
  form.addEventListener('submit', async event => {
    event.preventDefault(); if(sending) return;
    const results = fields.map(name => validate(name));
    if(results.includes(false)) { form.elements[fields[results.indexOf(false)]].focus(); return; }
    if(form.elements.website.value) {status.textContent='L’envoi n’a pas pu être validé. Contactez-moi directement par e-mail.';return;}
    sending = true;
    const button = form.querySelector('[type="submit"]'); button.disabled = true; form.setAttribute('aria-busy','true');
    const label = button.querySelector('.submit-label'); label.textContent = data.settings.contactEndpoint ? 'Envoi en cours…' : 'Vérification…';
    status.className='form-status'; status.textContent='';
    try {
      if (!data.settings.contactEndpoint) {
        await new Promise(resolve => setTimeout(resolve,450));
        status.textContent = 'Formulaire validé. Mode démonstration : aucun message envoyé. Vous pouvez me contacter directement par e-mail.';
        status.classList.add('is-success');
      } else {
        const endpoint = safeUrl(data.settings.contactEndpoint);
        if (!endpoint || !endpoint.startsWith('https://')) throw new Error('Invalid contact endpoint');
        const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(Object.fromEntries(fields.map(name => [name,form.elements[name].value.trim()]))), signal:AbortSignal.timeout(12000)});
        const result = await response.json();
        // Success is displayed only after explicit confirmation from the configured service.
        if(!response.ok || result.success !== true) throw new Error('Unconfirmed delivery');
        status.textContent = 'Message envoyé. Merci pour votre prise de contact.'; status.classList.add('is-success'); form.reset();
      }
    } catch { status.textContent = 'L’envoi n’a pas abouti. Votre message est conservé. Réessayez ou contactez-moi directement par e-mail.'; status.classList.add('is-error'); }
    finally { sending=false; button.disabled=false; label.textContent='Envoyer'; form.removeAttribute('aria-busy'); status.focus({preventScroll:true}); }
  });
  reveal(document);
})();
