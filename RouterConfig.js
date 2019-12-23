import LoginComponent from "./LoginComponent.js";
import ListComponent from "./ListComponent.js";
// import store from "./store/store.js";

export default {
  'login': {
    data: { route: 'login' },
    url: 'login',
    component: LoginComponent,
    settings: {
      // handleLogIn: () => store.dispatch('login')
      redirect: 'list'
    }
  },
  'list': {
    data: { route: 'list' },
    url: 'list',
    component: ListComponent,
    settings: {}
  }
}