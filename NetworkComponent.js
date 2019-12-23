import link from "./Link.js" 
import store from "./store/index.js";

export default class NetworkRequest {
  constructor(settings) {
    this.settings = settings;
    this.authorized = null;
  }
  
  errorLogin(value) {
    const error = document.querySelector('#error__login');
    return error.innerText = value;
  }

  loginAuth(login, password, settings) {
    fetch('https://todo-app-back.herokuapp.com/login', {
      method: 'POST',
      body:
        JSON.stringify({
          email: login,
          password: password,
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .then(response => response.json())
    .then(obj => {
      console.log( obj.id );
      this.authorized = obj;
      console.log( this.authorized );
      if (!this.authorized.error) {
        store.dispatch('login', this.authorized);

        localStorage.setItem('id', this.authorized.id);
        localStorage.setItem('token', this.authorized.token);

        console.log( localStorage.getItem('token' ) );

        console.log( store );
        link(settings.redirect)
      }
    })
    .catch(error => error.json())
    .then(obj => {
      if (obj.error === 'User does not exist') {
        this.errorLogin('Enter a correct login');
        console.log( 'user is incorrect' );

      } else if (obj.error === 'Wrong password') {
        this.errorLogin('Enter a correct password');
        console.log( 'password is incorecct' );
      }
    });
  }

  checkAuth(settings) {
    if (localStorage.getItem('token')) {
      fetch('https://todo-app-back.herokuapp.com/me', {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(obj => {
        this.authorized = obj;
        console.log( this.authorized );
        if (!this.authorized.error) {
          store.dispatch('login', this.authorized);

          localStorage.setItem('id', this.authorized.id);
          localStorage.setItem('token', this.authorized.token);

          console.log( localStorage.getItem('token'));
          console.log( localStorage.getItem('id'));

          console.log( store );
          link(settings.redirect)
        }
      })
      .catch(error => console.log(error));
    }
  }

  createTodo(value, date, completed) {
    fetch('https://todo-app-back.herokuapp.com/todos', {
      method: 'POST',
      body:
        JSON.stringify({
          "text": `${value}`,
          "createDate": `${date}`,
          "completed": `${completed}`,
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    }).then(resolved => {console.log( 'createItem' )})
      .catch(err => console.log( err ))
  }

  deleteTodo(id) {
    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    })
    .then(resolved => {console.log( 'deleteItem' )})
    .catch(err => console.log( err ))
  }
}