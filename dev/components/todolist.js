const templateTodo = document.createElement("template");
templateTodo.innerHTML = `
    <style>
        .container {
            border-radius: 3px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
            padding: 12px 16px;
            position: relative;
        }

        .end-task {
          text-decoration: line-through;
        }
        #new-todo-form {
          position: relative;
          font-size: 24px;
          border-bottom: 1px solid #ededed;
        }

        #new-todo {
            padding: 16px 16px 16px 60px;
            border: none;
            background: rgba(0, 0, 0, 0.003);
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 18px;
            font-family: inherit;
            font-weight: inherit;
            line-height: 1.4em;
            border: 0;
            outline: none;
            color: inherit;
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
            box-sizing: border-box;
        }
        ul {
            list-style-type: none;
            padding: 0px;
        }
        .item {
          display: flex;
          flex-direction: row;
          justify-content: 'space-between';
          margin-top: 2vh;
        }
        
        .btn {
          display: inline-block;
          margin-bottom: 0;
          font-weight: normal;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          background-image: none;
          border: 1px solid transparent;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          border-radius: 4px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .btn:focus,
        .btn:active:focus,
        .btn.active:focus,
        .btn.focus,
        .btn:active.focus,
        .btn.active.focus {
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
        }
        .btn:hover,
        .btn:focus,
        .btn.focus {
          color: #333;
          text-decoration: none;
        }
        .btn:active,
        .btn.active {
          background-image: none;
          outline: 0;
          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        }
        .btn-danger {
          color: #fff;
          background-color: #d9534f;
          border-color: #d43f3a;
        }
        .btn-danger:focus,
        .btn-danger.focus {
          color: #fff;
          background-color: #c9302c;
          border-color: #761c19;
        }
        .btn-danger:hover {
          color: #fff;
          background-color: #c9302c;
          border-color: #ac2925;
        }
        .btn-danger:active,
        .btn-danger.active,
        .open > .dropdown-toggle.btn-danger {
          color: #fff;
          background-color: #c9302c;
          background-image: none;
          border-color: #ac2925;
        }
        .btn-danger:active:hover,
        .btn-danger.active:hover,
        .open > .dropdown-toggle.btn-danger:hover,
        .btn-danger:active:focus,
        .btn-danger.active:focus,
        .open > .dropdown-toggle.btn-danger:focus,
        .btn-danger:active.focus,
        .btn-danger.active.focus,
        .open > .dropdown-toggle.btn-danger.focus {
          color: #fff;
          background-color: #ac2925;
          border-color: #761c19;
        }
        .item .item-checkbox {
          flex: 1;
          font-size: 18px;
        }
        .item .item-label{
          flex: 5;
          font-size: 18px;
        }
        .item .item-button{
          flex: 1;
          font-size: 18px;
        }
    </style>
    <section class="container">
        <form id="new-task">
            <input id="new-todo" class="form-control" type="text" placeholder="Ingresa una tarea">
        </form>
        <ul id="list-container"></ul>
    </section>
`;

class ToDoList extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this.tasks = [
      { text: "Tarea 1", checked: false },
      { text: "Tarea 2", checked: true },
    ];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodo.content.cloneNode(true));
    this.listContainer = this.shadowRoot.querySelector("#list-container");
    this.form = this.shadowRoot.querySelector("#new-task");
    this.input = this.shadowRoot.querySelector("input");
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.input.value) return;
      this.addItem(this.input.value);
      this.input.value = "";
    });

    this._render();
  }

  addItem(text) {
    this.tasks.push({ text, checked: false });
    this._render();
  }

  removeItem(id) {
    this.tasks.splice(id, 1);
    this._render();
  }

  toggleItem(id) {
    this.tasks[id].checked = !this.tasks[id].checked;
    this._render();
  }

  disconnectedCallback() {}

  _render() {
    if (!this.listContainer) return;

    this.listContainer.innerHTML = "";
    this.tasks.forEach((item, index) => {
      const newItemElement = document.createElement("li");
      newItemElement.innerHTML = `
      <li class="item" id="item-${index}">
          <input class="item-checkbox" id="mark-item-${index}" ${
        item.checked ? "checked" : ""
      } type="checkbox">
          <label class="item-label ${item.checked ? 'end-task' : ''}">${item.text}</label>
          <button class="item-button btn btn-danger" id="delete-item-${index}">Eliminar</button>
      </li>`;

      this.listContainer.appendChild(newItemElement);

      const newItemRemoveButton = this.shadowRoot.querySelector(
        `#delete-item-${index}`
      );
      const newItemMark = this.shadowRoot.querySelector(`#mark-item-${index}`);

      newItemRemoveButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.removeItem(index);
      });
      newItemMark.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleItem(index);
      });
    });
  }
}

window.customElements.define("todo-list", ToDoList);
