import { RequestHandler } from "express";
import { Todo } from "../models/todos";

const TODOS: Todo[] = [new Todo(Math.random().toString(), "Hello World")];

export const createTodo: RequestHandler = (request, response, next) => {
    const text = (request.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    response.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (request, response, next) => {
    response.status(200).json({ message: "Get all todos.", todos: TODOS });
};

// generic type을 이용한 파라미터 지정
export const updateTodo: RequestHandler<{ id: string }> = (request, response, next) => {
    const id: string = request.params.id;
    const updateText = (request.body as { text: string }).text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === id);
    if (todoIndex < 0) {
        throw new Error("Could not find todo.");
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText);
    response.json({ message: "Updated", updatedTodos: TODOS });
};

export const deleteTodo: RequestHandler<{ id: string }> = (request, response, next) => {
    const id: string = request.params.id;

    const todoIndex = TODOS.findIndex((todo) => todo.id === id);
    if (todoIndex < 0) {
        throw new Error("Could not find todo.");
    }

    TODOS.splice(todoIndex, 1);
    response.json({ message: "Deleted", deletedTodos: TODOS });
};
