import './styles.css'

import { Todo, TodoList } from './classes'
import { crearTodoHtmL } from './js/componentes';
// import { Todo } from './classes/todo.class'
// import { TodoList } from './classes/todo-list.class';


export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHtmL( todo ));
todoList.todos.forEach(  crearTodoHtmL );
