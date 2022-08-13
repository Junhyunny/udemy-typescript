import "./TodoList.css";

interface TodoListProps {
    items: { id: string; text: string }[];
    deleteHandler: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
    return (
        <ul>
            {props.items.map((todo) => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={() => props.deleteHandler(todo.id)}>DELETE</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
