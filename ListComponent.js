import Component from "./Component.js"
import store from "./store/index.js"

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
      let value = this.input.value.trim();
      if (value.length) {
        store.dispatch('addItem', {
          text: value,
        });
        this.input.focus();
        this.input.value = '';

      } else {

        alert('Enter one task');
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
            <input type="checkbox" title="Complete" class="checkbox" ${checked}>
              <span>${todoItem.value}</span>${editButton}<button class="del">Delete</button>
            </li>
          `}
        }).join('')
        }
      </ul>`;
    }
    this.setupListeners();
  }

  setupListeners() {

    this.anchor.querySelectorAll('.del').forEach((button, id) => {
      button.addEventListener('click', () => {
        store.dispatch('removeItem', { id })
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
