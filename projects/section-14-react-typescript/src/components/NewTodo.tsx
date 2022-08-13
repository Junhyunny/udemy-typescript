import React, { useRef } from "react";

import "./NewTodo.css";

interface NewTodoProps {
    addHandler: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
    // hook 을 사용할 때 속성을 함께 전달한다.
    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef?.current?.value;
        if (enteredText) {
            props.addHandler(enteredText);
        }
    };

    return (
        <form onSubmit={todoSubmitHandler}>
            <div className="form-control">
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textInputRef} />
            </div>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default NewTodo;
