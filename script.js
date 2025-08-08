barba.init({
  sync: true,
  transitions: [{
    name: 'slide',
    async leave(data) {
      await gsap.to(data.current.container, {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        x: '100%',
        opacity: 0,
        duration: 1.2,      // slower fade-in + slide-in
        ease: 'power2.inOut'
      });
    },
    beforeEnter() {
      window.scrollTo(0, 0);
    }
  }]
});
