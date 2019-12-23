import routerConfig from "./RouterConfig.js"
// import store from "./store/store.js";

export default class Router {
  constructor(anchor) {
    this.anchor = anchor;

    window.addEventListener('popstate', event => {
      this.changeRoute(event.state.route)
    })
    // store.subscribe('store', this.changeRoute.bind(this));
  }

  changeRoute(route) {
    const conf = routerConfig[route];

    if (!conf) return;
    if (this.component) {
      this.component.onDestroy();
    }

    window.history.pushState(conf.data, '', conf.url);

    this.component = new conf.component(this.anchor, conf.settings);

    this.component.render();
  }
}