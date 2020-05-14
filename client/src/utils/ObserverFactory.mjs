export default class ObserverFactory {
  io = null;

  constructor() {}

  setObserver(callback, options) {
    this.io = new IntersectionObserver(callback, options);
  }

  startObserve(targets) {
    targets.forEach((el) => {
      this.io.observe(el);
    });
  }
}
