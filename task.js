
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
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px;
    height: 14vh;
  }
  .navbar-brand {
    padding-bottom: 0;
  }
  .done .card-title {
    text-decoration: line-through;
    text-decoration-color: green;
  }
  .done .card-text {
    text-decoration: line-through;
    text-decoration-color: green;
  }
  .button-success {
    width: 7vw;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    background-color: #4af05b;
    text-decoration: none !important;
    color: #000;
  }
  .button-danger {
    width: 7vw;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    background-color: #ff4747;
    text-decoration: none !important;
    color: #000;
  }
  .button-warning {
    width: 7vw;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    background-color: #ffbf00;
    text-decoration: none !important;
    color: #000;
  }
</style>
<div class="card ${scope.done ? 'done' : ''}">
  <div class="card-body">
    ${scope.text ? `<h4 class="card-title">${scope.text}</h4>` : ''}
    ${scope.description ? `<p class="card-text">${scope.description}</p>` : ''}
    ${(scope.actions || []).map((act) => {
      const label = act.label || act;
      const classes = (act.classNames || []).concat(`btn-${label.toLowerCase().replace(' ', '-')}`).join(' ');
      return `<a href="#" data-id="${scope.id}" class="btn btn-primary ${classes}">${act.name}</a>`;
    }).join(' ')}
  </div>
</div>`;

class Task extends HTMLElement {
  connectedCallback() {
    this.refs = {};
  }
  render(task) {
    this.task = task;
    this.innerHTML = template(task);
    this.refs.element = this.querySelector('.card');
  }
  markDone() {
    this.refs.element.classList.add('done');
  }
  markNotDone() {
    this.refs.element.classList.remove('done');
  }
}

customElements.define('todo-task', Task);