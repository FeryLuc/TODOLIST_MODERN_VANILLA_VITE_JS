export default class DB {
  static setAPIUrl(data) {
    self.apiUrl = data;
  }
  static async findAll() {
    const response = await fetch(self.apiUrl + 'todos');
    return response.json();
  }
}
