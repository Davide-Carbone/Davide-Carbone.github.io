barba.init({
  transitions: [{
    name: 'slide',
    leave({current}) {
      return gsap.to(current.container, {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power1.inOut'
      });
    },
    enter({next}) {
      gsap.set(next.container, {x: '100%', opacity: 1});
      return gsap.to(next.container, {
        x: '0%',
        duration: 0.6,
        ease: 'power1.inOut'
      });
    },
    beforeEnter() {
      window.scrollTo(0, 0); // reset scroll to top on new page
    }
  }]
});
