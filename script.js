const projectDetails = {
  'field-notes': {
    title: 'Field Notes',
    type: 'Educational workbook / primary science',
    goal: 'Make observation feel like a habit, not a homework task.',
    audience: 'Primary learners aged 8–11, teachers and families',
    deliverables: 'Workbook cover direction, page architecture, activity spreads, prompt system and print-ready visual language.',
    approach: 'A calm editorial grid meets playful field-journal cues: generous writing space, clear activity steps and small visual rewards that help a child move through the page.'
  },
  prospectus: {
    title: 'Open to More',
    type: 'Admissions / international school prospectus',
    goal: 'Help prospective families understand the school before they visit.',
    audience: 'International families comparing schools across languages and cultures',
    deliverables: 'Prospectus structure, admissions journey map, programme pages, parent quote system and digital PDF direction.',
    approach: 'A modular publication system makes it easier for an admissions team to update key pages each year without rebuilding the whole document.'
  },
  library: {
    title: 'Find Your Next',
    type: 'University library / reading campaign',
    goal: 'Turn library discovery into a visible, useful invitation.',
    audience: 'University students, researchers, faculty and library visitors',
    deliverables: 'Campaign concept, poster, folded brochure, shelf talkers, social cutdowns and event handout direction.',
    approach: 'A strong typographic hook does the heavy lifting, while a repeatable color-and-bookmark system keeps the campaign recognisable across print and digital.'
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const openProjectButtons = document.querySelectorAll('[data-open-project]');
const closeDialog = () => dialog?.close();

openProjectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectDetails[button.dataset.openProject];
    if (!project || !dialog || !dialogContent) return;
    dialogContent.innerHTML = `
      <div class="dialog-inner">
        <p class="project-type">${project.type}</p>
        <h2>${project.title}</h2>
        <div class="dialog-grid">
          <div><h4>Project goal</h4><p>${project.goal}</p><h4>Audience</h4><p>${project.audience}</p></div>
          <div><h4>Deliverables</h4><p>${project.deliverables}</p><h4>Design approach</h4><p>${project.approach}</p></div>
        </div>
      </div>`;
    dialog.showModal();
  });
});
dialog?.querySelector('.dialog-close')?.addEventListener('click', closeDialog);
dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('span').textContent = isOpen ? '×' : '+';
});
primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  primaryNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.querySelector('span').textContent = '+';
}));

const introText = `Hello, I’m Marvellous Dan, an independent freelance designer/editor specialising in educational publications, school communications, brochures, workbooks, worksheets and short video edits. I noticed your organisation has active learning or admissions materials. I’m not assuming you need outside help — do you ever outsource overflow production support? I’d be happy to propose a small paid pilot.`;
const copyButton = document.querySelector('#copy-intro');
const toast = document.querySelector('.toast');
copyButton?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(introText); } catch { window.prompt('Copy this intro:', introText); }
  toast?.classList.add('show');
  window.setTimeout(() => toast?.classList.remove('show'), 2600);
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
