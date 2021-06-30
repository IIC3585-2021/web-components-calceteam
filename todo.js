import "./form.js";
import "./taskList.js";

const actions = [
  { label: "Done", name: "Listo", classNames: ["button-success"]},
  { label: "Not Done", name: "No listo", classNames: ["button-warning"] },
  { label: "Remove", name: "Eliminar", classNames: ["float-right", "button-danger"] },
];
const tasks = {
  "comp-1": {
    done: true,
    id: "comp-1",
    actions,
    text: "Tarea 7",
    description: ``,
  },
  "comp-2": {
    done: false,
    id: "comp-2",
    actions,
    text: "ToDo App with WebComponents",
    description: `<a href="https://time2hack.com/2018/01/todo-app-with-webcomponents-shadowdom/"
      target="_blank">https://time2hack.com/2018/01/todo-app-with-webcomponents-shadowdom/</a>`,
  },
};

const template = (scope) => `
<style>
  :host {
    display: block;
  }
  todo-form,
  todo-list {
    display: block;
  }
  .card {
    margin-top: 1rem;
  }
  .navbar-brand {
    padding-bottom: 0;
  }
</style>
<main class="container">
  <todo-form></todo-form>
  <todo-list ref="list"></todo-list>
</main>
`;

class Counter extends HTMLElement {
  connectedCallback() {
    this.dom = this.attachShadow({ mode: "open" });
    this.dom.innerHTML = template({ title: "ToDo App" });
    this.refs = {
      form: this.dom.querySelector("todo-form"),
      list: this.dom.querySelector("todo-list"),
    };
    this.refs.form.props = {
      onSubmit: this.addTask.bind(this),
    };
    this.refs.list.props = {
      tasks,
      actions: {
        remove: (id) => {
          delete tasks[id];
        },
        done: (id) => {
          tasks[id].done = !tasks[id].done;
        },
      },
    };
    this.refs.form.render();
    this.refs.list.render();
  }

  addTask(task) {
    console.log(tasks);
    const createdOn = new Date();
    const id = `task-${+createdOn}`;
    tasks[id] = Object.assign({}, task, {
      id,
      createdOn,
      done: false,
      actions,
    });
    this.refs.list.render(tasks);
  }
}

customElements.define("todo-application", Counter);
