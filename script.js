
document.addEventListener('DOMContentLoaded', () => {
  const getPageName = (path) => {
    const name = path.split('/').pop();
    return name === '' ? 'index.html' : name;
  };

  function updateActiveLink() {
    const pageName = getPageName(window.location.pathname);
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === pageName) {
        link.classList.add('active');
      }
    });
  }

  updateActiveLink();

  const triggers = document.querySelectorAll('.collapsible-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});
