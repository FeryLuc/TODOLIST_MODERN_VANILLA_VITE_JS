export default class DB {
  static setAPIUrl(data) {
    this.apiUrl = data;
  }
  static async findAll() {
    const response = await fetch(this.apiUrl + 'todos');
    return response.json();
  }
  static async addNewTodo(content) {
    const response = await fetch(this.apiUrl + 'todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content, completed: false }),
    });
    return response.json();
  }
  static async deleteTodo(id) {
    const response = await fetch(this.apiUrl + 'todos/' + id, {
      method: 'DELETE',
    });
    return response;
  }
  static async updateOne(todo) {
    const response = await fetch(this.apiUrl + 'todos/' + todo.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: todo.content,
        completed: todo.completed,
      }),
    });
    return response;
  }
}
