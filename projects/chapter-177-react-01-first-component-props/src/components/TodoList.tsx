import React from "react";

import "./TodoList.css";

// 인터페이스는 해당 컴포넌트에서 사용하는 props에 적용
interface TodoListProps {
    items: { id: string; text: string }[];
    onRemoveTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
    return (
        <ul>
            {props.items.map((todo) => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={() => props.onRemoveTodo(todo.id)}>DELETE</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
