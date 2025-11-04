"use client";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteTodo as deleteTodoAction,
  setTodo as setTodoAction,
} from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button
        onClick={() => dispatch(deleteTodoAction(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
      <Button
        onClick={() => dispatch(setTodoAction(todo))}
        id="wd-set-todo-click"
        className="ms-2"
      >
        Edit
      </Button>
      <span className="ms-2">{todo.title}</span>
    </ListGroupItem>
  );
}
