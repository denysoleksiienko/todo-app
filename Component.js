import store from "./store/index.js"

export default class Component {
  constructor(store, anchor) {
    this.anchor = anchor;
    this._render_ = this.render.bind(this);
    store.events.subscribe('change', this._render_);
  }

  onDestroy() {
    store.events.unsubscribe('change', this._render_);
    document.getElementById('app').innerHTML = '';
  }
}