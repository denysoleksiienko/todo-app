import Component from "./Component.js"
import store from "./store/index.js"
import request from "./NetworkRequest.js"


export default class ListComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById('list').content.cloneNode(true);
    app.append(template);
    super(
      store,
      document.querySelector('.js-items')
    );

    this.input = document.querySelector('.c-input-field');
    this.submit = document.querySelector('.c-button');

    this.submit.addEventListener('click', this.addItem.bind(this));
    this.input.addEventListener('keydown', this.addItem.bind(this));

    this.count = document.querySelector('.js-count');

    // const handleClick = event => {
    //   event.preventDefault();

    //   let value = input.value.trim();

    //   if (value.length) {
    //     store.dispatch('addItem', value);
    //     input.focus();
    //   }
    // }
    // submit.addEventListener('click', handleClick);
  }

  addItem(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      let newDate = new Date();
      let value = this.input.value.trim();

      // on server "error: "Text should be at least 5 characters""
      if (value.length >= 5) {
        store.dispatch('addItem', {
          "text": value,
          "createDate": newDate,
          "completedAt": null,
          "completed": false,
        });
        this.input.focus();
        this.input.value = '';
        request.createTodo(value, newDate, false);
      } else {
        alert('Please, enter something. Text should be at least 5 characters');
        this.input.focus();
      }
    }
  };

  render(id, value) {
    if (store.state.todo.length == 0) {
      this.anchor.innerHTML = `You have not tasks`
    } else {
      this.anchor.innerHTML = `
        <ul>
          ${
        store.state.todo.map((todoItem, index) => {
          if (id == index) {
            return `
              <li id="item ${index}"><input type="text" value="${value}">
                <button class="save">Edit task</button>
              </li>
            `
          } else {
            let checked = "";
            let editButton = '<button class="edit">Edit</button>';
            if (todoItem.status === "finished") {
              checked = "checked";
              editButton = ""
            }
            return `
              <li id="item ${index}" class="${todoItem.status}">
                <input type="checkbox" id="check" title="Complete" class="checkbox" ${checked}>
                <span>${todoItem.value}</span>${editButton}<button class="del">Delete</button>
              </li>
            `}
        }).join('')
        }
      </ul>`;
    }

    this.setupListeners();

    const suffix = store.state.todo.length !== 1 ? 's' : '';
    this.count.innerHTML = `
      <small>You have</small><span> ${store.state.todo.length} </span><small>task${suffix} today </small>
    `;
  }

  setupListeners() {

    this.anchor.querySelectorAll('.del').forEach((button, id) => {
      button.addEventListener('click', () => {
        store.dispatch('removeItem', { id })
        request.deleteTodo(button.parentElement.parentElement.id);
      })
    })

    this.anchor.querySelectorAll('.save').forEach((button) => {
      button.addEventListener('click', (event) => {
        let newValue = event.target.previousElementSibling.value
        let itemId = parseInt(event.target.parentNode.id.replace(/\D+/g, ""));
        store.dispatch('editItem', {
          value: newValue,
          id: itemId
        })
      })
    })

    this.anchor.querySelectorAll('.edit').forEach((button, id) => {
      button.addEventListener('click', () => {
        this.render(id, button.previousSibling.textContent)

      })
    })

    this.anchor.querySelectorAll('.checkbox').forEach((button, id) => {
      button.addEventListener('click', (event) => {
        let status = (event.target.parentNode.className === "finished") ? "inProgress" : "finished"
        let itemId = parseInt(event.target.parentNode.id.replace(/\D+/g, ""));
        store.dispatch('statusItem', {
          status: status,
          id: itemId
        })
      })
    })
  }
}
