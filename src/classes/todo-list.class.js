import Todo from "./todo.class";

export default class TodoList {
  constructor() {
    this.getLocalStorage();
  }

  addTodo(task) {
    this.todos.push(task);
    this.setLocalStorage();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.setLocalStorage();
  }

  toggleTodo(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completed = !todo.completed;
        this.setLocalStorage();
        break;
      }
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getLocalStorage() {
    this.todos = localStorage.getItem("todos")
      ? (this.todos = JSON.parse(localStorage.getItem("todos")))
      : (this.todos = []);

    // this.todos = this.todos.map(todo => Todo.fromJSON(todo));
    this.todos = this.todos.map(Todo.fromJSON);
  }
}
