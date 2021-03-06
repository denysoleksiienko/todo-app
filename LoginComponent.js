import Component from "./Component.js";
import store from "./store/index.js";
import request from "./NetworkRequest.js";

export default class LoginComponent extends Component {
  constructor(anchor, settings) {
    super(store);
    this.settings = settings;
    this.anchor = anchor;
    this.template = document.querySelector('#login__template').content.cloneNode(true);
    this.anchor.appendChild(this.template);
    // store
    console.dir(store);

    this.setupListeners();
    request.checkAuth(this.settings);
  }

  errorLogin(value) {
    const error = document.querySelector('#error__login');
    console.log(error)
    // return
    return error.innerText = value;
  }

  authorization(event) {
    event.preventDefault();

    const login = document.querySelector('#login__input').value.trim();
    const password = document.querySelector('#pass__input').value.trim();

    if (login && password) {
      request.loginAuth(login, password, this.settings);
      // store
      console.dir(store);

    } else if ((!login && password) || (login && !password)) {
      login ? this.errorLogin('Enter your password.') : this.errorLogin('Enter your login.');
  
    } else if (!login && !password) {
      this.errorLogin('Enter your login and password.');
     }
  }

  setupListeners() {
    this.anchor.querySelector('.login__form-submit').addEventListener('click', this.authorization.bind(this));
  }

  render() {
    console.log('Login... ok');
  }
}

