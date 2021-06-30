import './task.js';

const template = (scope) => `
<style>
	.btn-not-done {
	  display: none;
	}
	.done .btn-done {
	  display: none;
	}
	.done .btn-not-done {
	  display: inline-block;
	}
</style>
<h2>Tareas:</h2>
<ul ref="todos" class="list-group"></ul>`;

class List extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template();
    this.list = this.querySelector('[ref="todos"]');
    this.list.addEventListener('click', (e) => {
      if(e.target.matches('.btn-done')) {
        this.props.actions.done(e.target.dataset.id)
        this.querySelector(`[ref="${e.target.dataset.id}"]`).markDone();
      }
      if(e.target.matches('.btn-not-done')) {
        this.props.actions.done(e.target.dataset.id)
        this.querySelector(`[ref="${e.target.dataset.id}"]`).markNotDone();
      }
      if(e.target.matches('.btn-remove')) {
        this.props.actions.remove(e.target.dataset.id)
        this.querySelector(`[ref="${e.target.dataset.id}"]`).remove();
      }
    })
  }

  createAndAppend(task) {
    if (this.querySelector(`[ref=${task.id}]`)) {
      return;
    }

    const taskEl = document.createElement('todo-task');
    taskEl.setAttribute('ref', task.id);
    taskEl.setAttribute('id', task.id);
    this.list.appendChild(taskEl);
    taskEl.render(task);
  }
  render(tasks = this.props.tasks || {}) {
    Object.keys(tasks).forEach(key => {
      const task = tasks[key]
      this.createAndAppend(task);
    });
  }
}

customElements.define('todo-list', List);