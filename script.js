const tabPanels = document.querySelectorAll('.tab-panel');
const tabLinks = document.querySelectorAll('a[data-tab]');

function activateTab(tabName) {
  let activePanel = null;
  tabPanels.forEach((panel) => {
    const isMatch = panel.dataset.tab === tabName;
    panel.classList.toggle('is-active', isMatch);
    if (isMatch) activePanel = panel;
  });
  document.querySelectorAll('.nav a[data-tab]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.tab === tabName);
  });
  if (activePanel) activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    activateTab(link.dataset.tab);
  });
});

document.querySelectorAll('#services .card').forEach((card) => {
  card.addEventListener('click', () => activateTab('contact'));
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();
  const contact = data.get('contact').trim();
  const message = data.get('message').trim();

  const text = encodeURIComponent(`Заявка с сайта Lotus\nИмя: ${name}\nКонтакт: ${contact}\n\nЗадача:\n${message}`);

  window.open(`https://t.me/Holikebolik?text=${text}`, '_blank');
});
