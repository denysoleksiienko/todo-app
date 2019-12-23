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
    request.authRequest(this.settings);
  }

  errorLogin(value) {
    const error = document.querySelector('#error__login');
    console.log(error.textContent)
    // return
    return error.innerText = value;
  }

  authorization(event) {
    event.preventDefault();

    const login = document.querySelector('#login__input').value.trim();
    const password = document.querySelector('#pass__input').value.trim();

    if (login && password) {
      request.loginRequest(login, password, this.settings);
      // store
      console.dir(store);

    } else if ((!login && password) || (login && !password)) {
      login ? this.errorLogin('Please, enter your password.') : this.errorLogin('Please, enter your login.');
  
    } else if (!login && !password) {
      this.errorLogin('Please, enter your login and password.');
     }
  }

  setupListeners() {
    this.anchor.querySelector('.login__form-submit').addEventListener('click', this.authorization.bind(this));
  }

  render() {
    console.log('Login... ok');
  }
}

