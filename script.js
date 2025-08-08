barba.init({
  transitions: [{
    name: 'slide',
    leave(data) {
      return gsap.to(data.current.container, {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut"
      });
    },
    enter(data) {
      gsap.set(data.next.container, {
        x: '100%',
        opacity: 1
      });
      return gsap.to(data.next.container, {
        x: '0%',
        duration: 0.6,
        ease: "power1.inOut"
      });
    },
    beforeEnter() {
      window.scrollTo(0, 0);  // reset scroll to top on new page
    }
  }]
});
