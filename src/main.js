import './style.css';
import Todolist from './components/todolist/Todolist.js';

window.todolist = new Todolist({
  el: '#app',
  apiUrl: 'https://691b0e532d8d7855757146d3.mockapi.io/',
});
