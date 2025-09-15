import getTemplate from './template.js';
export default class Todo {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.createdAt = data.created_at;
  }

  render() {
    return getTemplate(this);
  }
}
