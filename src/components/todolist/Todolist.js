import DB from '../../DB.js';
import Todo from '../todo/Todo.js';
import getTemplate from './template.js';

export default class Todolist {
  constructor(data) {
    this.domEl = document.querySelector(data.el);
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
  displayItemLeftCount() {
    return this.todos.filter((t) => !t.completed).length;
  }
}
