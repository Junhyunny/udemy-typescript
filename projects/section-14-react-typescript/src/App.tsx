import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

interface Todo {
    id: string;
    text: string;
}

// FC is FunctionComponent
const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([{ id: "t1", text: "Finish the course" }]);

    const todoAddHandler = (text: string): void => {
        setTodos((prevTodos) => [
            ...prevTodos,
            {
                id: new Date().toISOString(),
                text: text,
            },
        ]);
    };

    const todoDeleteHandler = (id: string): void => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="App">
            <NewTodo addHandler={todoAddHandler} />
            <TodoList items={todos} deleteHandler={todoDeleteHandler} />
        </div>
    );
};

export default App;
