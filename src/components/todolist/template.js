import './style.css';
export default function getTemplate(todolist) {
  return `<h1>Ma superbe Todolist</h1><ul class="todolist">${todolist.todos
    .map((t) => t.render())
    .join(' ')}</ul>`;
}
