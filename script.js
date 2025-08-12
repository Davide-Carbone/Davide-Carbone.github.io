
document.addEventListener('DOMContentLoaded', () => {
  const pageOrder = [
    'index.html',
    'research.html',
    'teaching.html',
    'contact.html'
  ];

  const nav = document.querySelector('nav ul');
  const highlight = document.createElement('div');
  highlight.className = 'highlight';
  nav.appendChild(highlight);

  const getPageName = (path) => {
      const name = path.split('/').pop();
      return name === '' ? 'index.html' : name;
  };

  function updateActiveLink(path, container) {
      const pageName = getPageName(path);
      const links = container.querySelectorAll('nav a');
      links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === pageName) {
              link.classList.add('active');
          }
      });
  }

  function moveHighlight(targetLink) {
    if (!targetLink) return;

    gsap.to(highlight, {
      left: targetLink.offsetLeft,
      width: targetLink.offsetWidth,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  }

  function initAccordion() {
    const yearTitles = document.querySelectorAll('.year-title');
    yearTitles.forEach(title => {
      if (title.dataset.accordionInitialized) return;
      title.dataset.accordionInitialized = true;

      title.addEventListener('click', () => {
        title.classList.toggle('open');
        const content = title.nextElementSibling;
        if (content.style.display === 'block') {
          gsap.to(content, {height: 0, opacity: 0, duration: 0.3, onComplete: () => content.style.display = 'none'});
        } else {
          content.style.display = 'block';
          gsap.fromTo(content, {height: 0, opacity: 0}, {height: 'auto', opacity: 1, duration: 0.3});
        }
      });
    });
  }

  barba.init({
    sync: true,
    transitions: [{
      name: 'directional-slide',
      before(data) {
        const to = getPageName(data.next.url.path);
        const targetLink = document.querySelector(`nav a[href='${to}']`);
        updateActiveLink(to, document);
        moveHighlight(targetLink);
      },
      leave(data) {
        const from = getPageName(data.current.url.path);
        const to = getPageName(data.next.url.path);
        const fromIndex = pageOrder.indexOf(from);
        const toIndex = pageOrder.indexOf(to);

        const direction = (toIndex < fromIndex) ? 'backward' : 'forward';
        // If going forward (right), the old page should exit to the right (+100%)
        const xPercent = (direction === 'forward') ? 100 : -100;

        return gsap.to(data.current.container, {
          xPercent: xPercent,
          duration: 0.4,
          ease: 'power2.in'
        });
      },
      enter(data) {
        const from = getPageName(data.current.url.path);
        const to = getPageName(data.next.url.path);
        const fromIndex = pageOrder.indexOf(from);
        const toIndex = pageOrder.indexOf(to);

        const direction = (toIndex < fromIndex) ? 'backward' : 'forward';
        // If going forward (right), the new page should enter from the left (-100%)
        const xPercent = (direction === 'forward') ? -100 : 100;

        gsap.set(data.next.container, { xPercent: xPercent });

        return gsap.to(data.next.container, {
          xPercent: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      },
    }]
  });

  barba.hooks.after(() => {
    initAccordion();
  });

  // Initial state
  const initialPath = getPageName(window.location.pathname);
  const initialActiveLink = document.querySelector(`nav a[href='${initialPath}']`);
  updateActiveLink(initialPath, document);
  // Use a short delay to ensure layout is stable before positioning highlight
  setTimeout(() => moveHighlight(initialActiveLink), 50);
  initAccordion();
});
