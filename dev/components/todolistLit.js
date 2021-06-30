/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class ToDoListLit extends LitElement {
  static get styles() {
    return css`
      .container {
        border-radius: 3px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
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

      .btn-success {
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
      }
      .btn-success:focus,
      .btn-success.focus {
        color: #fff;
        background-color: #449d44;
        border-color: #255625;
      }
      .btn-success:hover {
        color: #fff;
        background-color: #449d44;
        border-color: #398439;
      }
      .btn-success:active,
      .btn-success.active,
      .open > .dropdown-toggle.btn-success {
        color: #fff;
        background-color: #449d44;
        background-image: none;
        border-color: #398439;
      }
      .btn-success:active:hover,
      .btn-success.active:hover,
      .open > .dropdown-toggle.btn-success:hover,
      .btn-success:active:focus,
      .btn-success.active:focus,
      .open > .dropdown-toggle.btn-success:focus,
      .btn-success:active.focus,
      .btn-success.active.focus,
      .open > .dropdown-toggle.btn-success.focus {
        color: #fff;
        background-color: #398439;
        border-color: #255625;
      }
      .item .item-label {
        flex: 5;
        font-size: 18px;
        padding-left: 10px;
      }
      .item .item-button {
        flex: 1;
        font-size: 18px;
      }
    `;
  }

  constructor() {
    super();
    this.tasks = [
      {text: 'Tarea 1', checked: false},
      {text: 'Tarea 2', checked: true},
    ];

    this.onSubmit = this.onSubmit.bind(this);
  }

  addItem(text) {
    this.tasks.push({text, checked: false});
    this.requestUpdate('tasks');
  }

  removeItem(id) {
    this.tasks.splice(id, 1);
    this.requestUpdate('tasks');
  }

  toggleItem(id) {
    this.tasks[id].checked = !this.tasks[id].checked;
    this.requestUpdate('tasks');
  }

  onSubmit(e) {
    e.preventDefault();
    const input = this.shadowRoot.querySelector('#new-todo');
    if (!input.value) return;
    this.addItem(input.value);
    input.value = '';
    this.requestUpdate('tasks');
  }

  render() {
    return html`
      <section class="container" @submit="${this.onSubmit}">
        <form id="new-task">
          <input
            id="new-todo"
            class="form-control"
            type="text"
            placeholder="Ingresa una tarea"
          />
        </form>
        ${this.tasks.map(
          (item, index) => html`<li class="item" id="item-${index}">
          <button class="item-button btn ${item.checked ? 'btn-success' : ''}" id="delete-item-${index}" @click="${(
            e
          ) => {
            e.preventDefault();
            this.toggleItem(index);
          }}">${item.checked ? 'Listo' : 'Pendiente'}</button>
            <label class="item-label ${item.checked ? 'end-task' : ''}">${
            item.text
          }</label>
            <button class="item-button btn btn-danger" id="delete-item-${index}" @click="${(
            e
          ) => {
            e.preventDefault();
            this.removeItem(index);
          }}">Eliminar</button>
        </li>`
        )}
        <ul id="list-container"></ul>
      </section>
    `;
  }

}

window.customElements.define('todo-list-lit', ToDoListLit);
