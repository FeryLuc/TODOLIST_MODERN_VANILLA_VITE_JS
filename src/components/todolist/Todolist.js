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
  displayItemLeftCount() {
    return this.todos.filter((t) => !t.completed).length;
  }
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
  renderItemLeftCount() {
    this.domEl.querySelector('[role="todo-count"] span').innerText =
      this.displayItemLeftCount();
  }
  async addTodo(input) {
    const dataTodo = await DB.addNewTodo(input.value);
    this.addItemIntodos(dataTodo);
    // this.render(); au lieu de tout reload je vais cibler la todolist et lui ajouter le render de la dite todo.
    this.addItemInDom();
    this.renderItemLeftCount();
    input.value = '';
  }
  // async deleteTodo(id) {
  //   const todo = await DB.deleteTodo(id);
  //   const todoIndex = todo.id;
  //   if (todoIndex) {
  //     this.todos.splice(todoIndex, 1);
  //     // this.render();
  //     const liArr = this.domEl.querySelectorAll('li');
  //     console.log(liArr);
  //     const lis = Array.from(liArr);
  //     console.log(lis);

  //     lis.splice(todoIndex, 1);
  //   }
  // }
}
