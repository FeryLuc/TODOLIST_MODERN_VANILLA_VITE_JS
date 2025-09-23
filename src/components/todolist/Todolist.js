import DB from '../../DB.js';
import Todo from '../todo/Todo.js';
import getTemplate from './template.js';

export default class Todolist {
  constructor(data) {
    this.domEl = document.querySelector(data.el);
    this.newTodo = null;
    DB.setAPIUrl(data.apiUrl);
    this.todos = [];
    this.loadTodos();
  }
  async loadTodos() {
    const todos = await DB.findAll();
    this.todos = todos.map((t) => new Todo(t));
    this.render();
  }
  render() {
    this.domEl.innerHTML = getTemplate(this);
  }
  //Feature item count
  displayItemLeftCount() {
    return this.todos.filter((t) => !t.completed).length;
  }
  renderItemLeftCount() {
    this.domEl.querySelector('[role="todo-count"] span').innerText =
      this.displayItemLeftCount();
  }
  //Feature ADD
  addItemIntodos(todo) {
    this.newTodo = new Todo(todo);
    this.todos.push(this.newTodo);
  }
  addItemInDom() {
    const todolistEl = this.domEl.querySelector('[role="todo-list"]');
    const newLi = document.createElement('div');
    todolistEl.append(newLi);
    newLi.outerHTML = this.newTodo.render();
  }

  async addTodo(input) {
    const dataTodo = await DB.addNewTodo(input.value);
    this.addItemIntodos(dataTodo);
    this.addItemInDom();
    this.renderItemLeftCount();
    input.value = '';
  }
  //Feature DELETE
  deleteTodoInTodos(id) {
    const index = this.todos.findIndex((t) => t.id === id);
    this.todos.splice(index, 1);
  }
  deleteTodoInDOM(id) {
    this.domEl.querySelector("[data-id='" + id + "']").remove();
  }
  async deleteTodo(id) {
    //supression DB
    const resp = await DB.deleteTodo(id);
    console.log(resp);
    if (resp.ok) {
      //supr array
      this.deleteTodoInTodos(id);
      //supr dom
      this.deleteTodoInDOM(id);
      //re render items count
      this.renderItemLeftCount();
    }
  }
  //Feature Toggle Completed
  async toggleCompletedOneById(id) {
    const todo = this.todos.find((t) => t.id == id);
    todo.completed = !todo.completed;
    const resp = await DB.updateOne(todo);
    if (resp.ok) {
      this.domEl
        .querySelector("[data-id='" + id + "']")
        .classList.toggle('completed');
      this.renderItemLeftCount();
    }
  }
  //Feature UPDATE
  async updateOneById(id, value) {
    const todo = this.todos.find((t) => t.id == id);
    todo.content = value;

    const resp = await DB.updateOne(todo);

    if (resp.ok) {
      this.domEl
        .querySelector("[data-id='" + id + "']")
        .classList.remove('editing');

      this.domEl.querySelector("[data-id='" + id + "'] label").innerText =
        todo.content;
    }
  }
}
