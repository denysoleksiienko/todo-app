import link from "./Link.js" 
import store from "./store/index.js";

export default class NetworkRequest {
  constructor(settings) {
    this.settings = settings;
    this.sessionAuth = null;
  }
  
  errorLogin(value) {
    const error = document.querySelector('#error__login');
    return error.innerText = value;
  }

  loginRequest(login, password, settings) {
    fetch('https://todo-app-back.herokuapp.com/login', {
      method: 'POST',
      body:
        JSON.stringify({
          email: login,
          password: password
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .then(response => response.json())
    .then(obj => {
      console.log( obj.id );
      this.sessionAuth = obj;
      console.log( this.sessionAuth );
      if (!this.sessionAuth.error) {
        store.dispatch('login', this.sessionAuth);

        localStorage.setItem('id', this.sessionAuth.id);
        localStorage.setItem('token', this.sessionAuth.token);

        console.log( localStorage.getItem('token' ) );

        console.log( store );
        link(settings.redirect)
      }
    })
    .catch(error => error.json())
    .then(objError => {
      if (objError.error === 'User does not exist') {
        console.log( 'User does not exist!' );

        this.errorLogin('Please, enter a correct login');
        console.log( 'Please, enter a correct login' );

      } else if (objError.error === 'Wrong password') {
        this.errorLogin('Please, enter a correct password');

        console.log( 'Please, enter a correct password' );
      }
    });
  }

  authRequest(settings) {
    if (localStorage.getItem('token' )) {
      fetch('https://todo-app-back.herokuapp.com/me', {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token' )}`
        }
      })
      .then(response => response.json())
      .then(obj => {
        this.sessionAuth = obj;
        console.log( this.sessionAuth );
        if (!this.sessionAuth.error) {
          store.dispatch('login', this.sessionAuth);

          localStorage.setItem('id', this.sessionAuth.id);
          localStorage.setItem('token', this.sessionAuth.token);

          console.log( localStorage.getItem('token' ) );
          console.log( localStorage.getItem('id' ) );

          console.log( store );
          link(settings.redirect)
        }
      }).catch(error => console.log(error));
    }
  }
}