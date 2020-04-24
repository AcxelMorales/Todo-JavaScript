import "./styles.css";
import TodoList from "./classes/todo-list.class";
import { createTodoHTML } from "./js/components";

export const todoList = new TodoList();

todoList.todos.forEach(createTodoHTML);
