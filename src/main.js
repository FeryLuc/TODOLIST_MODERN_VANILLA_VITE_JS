import './style.css';
import Todolist from './components/todolist/Todolist.js';

new Todolist({
  el: '#app',
  apiUrl: 'https://6895f2ee039a1a2b2890ea68.mockapi.io/',
});
