'use strict';
const projects = [
  {
    id:'relecov-tools', category:'bioinformatics', name:'relecov-tools', stack:'Python · CLI · metadata',
    description:'From laboratory uploads to validated genomic metadata and analysis workflows.',
    overview:'A set of Python tools supporting the RELECOV genomic surveillance network: data ingestion, metadata validation, analysis orchestration and public-repository submission.',
    context:'I develop and maintain Python tooling for SFTP ingestion, metadata transformation, schema-based validation, reporting and database integration. Within the BU-ISCIII team, I work on operational reliability and on connecting laboratory uploads to analysis and data management.',
    contributions:[['Upload sample metadata to RELECOV Platform and iSkyLIMS, preserving unique sample identifiers.','https://github.com/BU-ISCIII/relecov-tools/pull/882'],['Add a read-only SFTP report for pending laboratory uploads.','https://github.com/BU-ISCIII/relecov-tools/pull/881'],['Add detached background execution for long-running wrapper jobs.','https://github.com/BU-ISCIII/relecov-tools/pull/880']],
    url:'https://github.com/BU-ISCIII/relecov-tools',
    visual:'<div class="window-label">relecov-tools / terminal</div><pre class="code-preview"><span class="prompt">$</span> relecov-tools --help\n<span class="highlight">download</span>       laboratory files\n<span class="highlight">validate</span>       genomic metadata\n<span class="highlight">pipeline-manager</span>  analysis workflows</pre>'
  },
  {
    id:'relecov-platform', category:'bioinformatics', name:'relecov-platform', stack:'Python · Django · SQL',
    description:'A web platform connecting samples, genomic metadata and surveillance visualizations.',
    overview:'RELECOV Platform centralizes genomic data and metadata, supports validation and submission workflows, and provides surveillance dashboards. It integrates with iSkyLIMS and Nextstrain.',
    context:'I develop and maintain the Django backend, REST integrations, relational models and validation workflows. My work includes optimizing variant ingestion with bulk operations, transactions, lookup caches and composite indexes, alongside server-side sample browsing. The platform is developed collaboratively within BU-ISCIII.',
    contributions:[['Move the Sample Browser to server-side filtering, ordering and pagination.','https://github.com/BU-ISCIII/relecov-platform/pull/399'],['Replace per-sample database queries with bulk loading for cached graphics.','https://github.com/BU-ISCIII/relecov-platform/pull/401'],['Generate unique sample identifiers from the highest existing valid identifier.','https://github.com/BU-ISCIII/relecov-platform/pull/424']],
    url:'https://github.com/BU-ISCIII/relecov-platform',
    visual:'<div class="window-label">relecov-platform / overview</div><pre class="code-preview"><span class="comment"># genomic surveillance, connected</span>\n<span class="highlight">samples</span>     laboratory metadata\n<span class="highlight">platform</span>    validation &amp; data access\n<span class="highlight">dashboards</span>  surveillance metrics</pre>'
  },
  {
    id:'impact-tools', category:'bioinformatics', name:'impact-tools', stack:'Python · EGA · Slurm',
    description:'Tools for genomic file encryption, HPC execution and EGA submission workflows.',
    overview:'Tools developed within BU-ISCIII for IMPaCT-related genomic data workflows. My work includes Crypt4GH encryption, metadata preparation and submission through the FEGA Submitter Portal API.',
    context:'Within this collaborative BU-ISCIII project, I work on file validation, sample-based submissions, resumable execution and HPC encryption support. This connects with my operational work on LocalEGA/FEGA: Linux and Podman services, PostgreSQL, RabbitMQ, storage, permissions and secure file handling.',
    contributions:[['Support sample-based CRAM and VCF encryption and EGA submissions.','https://github.com/BU-ISCIII/impact-tools/pull/20'],['Prepare metadata drafts and API payloads, with dry runs and resume support.','https://github.com/BU-ISCIII/impact-tools/pull/16'],['Generate Slurm arrays and aggregate reports for parallel encryption.','https://github.com/BU-ISCIII/impact-tools/pull/15']],
    url:'https://github.com/BU-ISCIII/impact-tools',
    visual:'<div class="window-label">impact-tools / workflow</div><pre class="code-preview"><span class="comment"># from genomic files to EGA</span>\n<span class="highlight">encrypt</span>   Crypt4GH / Slurm arrays\n<span class="highlight">prepare</span>   metadata &amp; validation\n<span class="highlight">submit</span>    FEGA API / resumable runs</pre>',
    note:'Dataset finalisation remains a manual operation in the Submitter Portal.'
  },
  {
    id:'apadac', category:'web', name:'protectora-apadac.org', stack:'Next.js · TypeScript · CMS',
    description:'A website helping an animal shelter share adoption profiles and ways to get involved.',
    overview:'I develop the website for APADAC, the animal shelter in Callosa de Segura. The site brings together animals available for adoption, adoption guidance, success stories, announcements and ways to help.',
    context:'I designed, developed and deployed the platform, covering the Next.js frontend, TypeScript, Tailwind CSS, content management and Linux hosting. I also set up HTTPS, email and backups. The goal is to make adoption information accessible and help the shelter keep its content up to date.',
    contributions:[], url:'https://protectora-apadac.org',
    visual:'<div class="apadac-logo-wrap"><img src="/assets/apadac.png" alt="APADAC logo" width="72" height="72" loading="lazy"></div><div><strong>APADAC</strong><p>adoption · community · care<br>Callosa de Segura, Spain</p></div>',
    note:'Visit the live website to explore animal profiles, adoption information and ways to support the shelter.'
  }
];
const grid=document.querySelector('#project-grid');
function renderProjects(filter='all'){
  grid.replaceChildren();
  for(const project of projects.filter(p=>filter==='all'||p.category===filter)){
    const article=document.createElement('article');article.className='project-card';
    article.innerHTML=`<button class="project-open" aria-label="Explore ${project.name}"><div class="project-visual ${project.id==='apadac'?'apadac-visual':''}">${project.visual}</div><div class="project-body"><div class="project-title"><h3>${project.name}</h3><span class="project-arrow" aria-hidden="true">↗</span></div><p class="project-desc">${project.description}</p><div class="project-meta"><span>${project.stack}</span><span class="project-category">${project.category==='web'?'community':'BU-ISCIII'}</span></div></div></button>`;
    article.querySelector('button').addEventListener('click',()=>showProject(project));grid.append(article);
  }
}
const dialog=document.querySelector('#detail-dialog'), content=document.querySelector('#dialog-content');
let dialogTrigger=null;
function openDialog(html,command){
  dialogTrigger=document.activeElement;
  content.innerHTML=html;document.querySelector('#dialog-command').textContent=command;
  dialog.showModal();document.body.classList.add('modal-open');
}
function closeDialog(){dialog.close()}
dialog.querySelector('.close-button').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');dialogTrigger?.focus()});
function showProject(p){
  const work=p.contributions.length?`<h3>my contributions</h3><ul>${p.contributions.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></li>`).join('')}</ul>`:'';
  openDialog(`<h2 id="dialog-title">${p.name}</h2><p class="dialog-kicker">${p.stack}</p><p>${p.overview}</p><h3>context &amp; role</h3><p>${p.context}</p>${work}${p.note?`<p class="dialog-note">${p.note}</p>`:''}<div class="dialog-links"><a class="button accent" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.category==='web'?'visit website':'view repository'} ↗</a></div>`,`$ cat projects/${p.id}.md`);
}
document.querySelector('#summary-button').addEventListener('click',()=>openDialog('<h2 id="dialog-title">Alejandro Bernabeu</h2><p class="dialog-kicker">bioinformatics engineer · Python · Nextflow · web</p><h3>currently</h3><p>Bioinformatics Analyst at Instituto de Salud Carlos III since October 2024, with CIBER appointment since July 2025. I develop NGS workflows and software for genomic surveillance.</p><h3>selected work</h3><p>relecov-tools · relecov-platform · impact-tools. Python tooling, Django backend development, data validation, performance improvements and EGA workflows.</p><h3>background</h3><p>MSc in Computational Biology, BSc in Biotechnology. Earlier research internships at CSIC and IBMCP, working on protein modelling and genomic-data analysis.</p><h3>open source &amp; web</h3><p>Contributions to buisciii-tools, nf-core/viralrecon and nf-core/bacass. Design, development and deployment of protectora-apadac.org.</p><h3>looking for</h3><p>Remote bioinformatics and software engineering roles. Based in Orihuela, Spain · English C1.</p><div class="dialog-links"><a class="button accent" href="mailto:aberdur7@gmail.com">email ↗</a><a class="button" href="https://www.linkedin.com/in/alejandro-bernabeu-durendez" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a class="button" href="/assets/Alejandro_Bernabeu_CV.pdf" download>CV · English ↓</a><button class="button" id="summary-projects">projects ↓</button></div>','$ cat summary.md'));
content.addEventListener('click',e=>{if(e.target.id==='summary-projects'){closeDialog();location.hash='projects';}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderProjects(button.dataset.filter)}));
function updateTime(){document.querySelector('#local-time').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}
updateTime();setInterval(updateTime,60000);renderProjects();
if('IntersectionObserver' in window){
  const links=[...document.querySelectorAll('.nav-links a')];
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}}},{rootMargin:'-15% 0px -60% 0px',threshold:0});
  ['home','projects','about','contact'].forEach(id=>observer.observe(document.getElementById(id)));
}
