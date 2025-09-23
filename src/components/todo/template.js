import './style.css';
export default function getTemplate(todo) {
  return `<li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.completed ? 'checked' : ''
              } 
              onchange="window.todolist.toggleCompletedOneById(${
                todo.id
              }, this.checked)"/>
              <label>${todo.content}</label>
              <button class="destroy" onclick="window.todolist.deleteTodo(${
                todo.id
              })"></button>
            </div>
            <input class="edit" value="${todo.content}"/>
          </li>`;
}
