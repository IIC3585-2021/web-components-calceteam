const template = (scope) => `
<style>
  [ref="text"] {
    border: 1px solid #343a40;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  [ref="btn-submit"] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: #eee;
  }
  todo-form .card {
    border: 0;
  }
  todo-form .card .card-body{
    padding: 0;
  }
  textarea {
    height: 7vh;
    margin: 1vh 0;
    border: 1px solid black;
    padding
  }
</style>
<div class="card todo-form">
  <div class="card-body">
    <form ref="form">
      <label>Nombre de la tarea:</label>
      <input class="form-control form-control-lg" name="task"
        type="text" placeholder="nombre" ref="text" />
        <br>
      <label>Descripción:</label>
      <textarea class="form-control" name="description"
        type="text" placeholder="descripcion" ref="description" ></textarea>
      <button type="submit" class="btn btn-block btn-outline-dark" ref="btn-submit">agregar</button>
    </form>
  </div>
</div>
`;

class Form extends HTMLElement {
  connectedCallback() {

  }
  render() {
    this.innerHTML = template();
    
    this.refs = {
      text: this.querySelector('[ref="text"]'),
      form: this.querySelector('[ref="form"]'),
      description: this.querySelector('[ref="description"]'),
    }
    this.refs.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.props.onSubmit({
        text: this.refs.text.value,
        description: this.refs.description.value
      });
      this.refs.form.reset();
    });
  }
}

customElements.define('todo-form', Form);