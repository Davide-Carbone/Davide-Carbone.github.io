barba.init({
  transitions: [{
    name: 'slide',
    leave({current}) {
      return gsap.to(current.container, {
        x: '-100%',
        opacity: 0,
        duration: 0.3, // faster fade
        ease: 'power1.inOut'
      });
    },
    enter({next}) {
      gsap.set(next.container, {x: '100%', opacity: 1});
      return gsap.to(next.container, {
        x: '0%',
        duration: 0.3, // faster slide
        ease: 'power1.inOut'
      });
    },
    beforeEnter() {
      window.scrollTo(0, 0);
    }
  }]
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const currentPath = window.location.pathname.split('/').pop();
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      e.preventDefault();
    }
  });
});
