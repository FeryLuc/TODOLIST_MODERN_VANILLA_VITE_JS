import './style.css';
export default function getTemplate(todo) {
  return `<li><span class="todoId">${todo.id}</span>: <span class="todoContent">${todo.content}</span> --- <span class="todoCompleted">${todo.completed}</span></li>`;
}
