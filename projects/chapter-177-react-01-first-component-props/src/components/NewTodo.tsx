import React, { FormEvent, useRef } from "react";

import "./NewTodo.css";

interface NewTodProps {
    onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        const enteredText = inputRef.current?.value;
        if (enteredText) {
            props.onAddTodo(enteredText);
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <form onSubmit={todoSubmitHandler}>
            <div className="form-control">
                <label htmlFor="todo-text">Todo Text</label>
                <input id="todo-text" type="text" ref={inputRef} />
            </div>
            <button type="submit">ADD TODO</button>
        </form>
    );
};

export default NewTodo;
