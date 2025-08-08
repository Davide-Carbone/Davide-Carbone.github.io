barba.init({
  transitions: [{
    name: 'slide',
    async leave(data) {
      // Animate current page sliding out to the left
      await gsap.to(data.current.container, {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    },
    enter(data) {
      // Set new page initially off-screen right
      gsap.from(data.next.container, {
        x: '100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    },
    // Optional: beforeEnter to reset scroll
    beforeEnter() {
      window.scrollTo(0, 0);
    }
  }]
});
