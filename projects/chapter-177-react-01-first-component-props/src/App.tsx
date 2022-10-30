import React, { useState } from "react";

import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

interface Todo {
    id: string;
    text: string;
}

// Function Component
const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (text: string) => {
        setTodos((prev) => [...prev, { id: Math.random().toString(), text }]);
    };

    const removeTodoHandler = (id: string) => {
        setTodos((prev) => {
            return prev.filter((todo) => todo.id !== id);
        });
    };

    return (
        <div className="App">
            <NewTodo onAddTodo={addTodoHandler} />
            <TodoList items={todos} onRemoveTodo={removeTodoHandler} />
        </div>
    );
};

export default App;
