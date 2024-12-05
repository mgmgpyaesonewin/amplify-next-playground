'use client';

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

export default function List() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    function listTodos() {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        client.models.Todo.create({
            content: window.prompt("Todo content"),
        });
    }
      
    const { signOut } = useAuthenticator();

    return (
        <>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => deleteTodo(todo.id)}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <div className="my-4">
                🥳 App successfully loaded. Click on the list to remove item.
            </div>
            <button onClick={signOut}>Sign out</button>
        </>
    );
}