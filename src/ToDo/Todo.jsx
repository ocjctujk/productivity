import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://localhost:3000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        text: newTodo.trim(),
        completed: false,
      };
      axios.post('http://localhost:3000/todos', todo)
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch(error => {
          console.error('Error adding todo:', error);
        });
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const toggleComplete = (todo) => {
    axios.patch(`http://localhost:3000/todos/${todo.id}`, {
      completed: !todo.completed
    })
      .then(response => {
        setTodos(todos.map(t => t.id === todo.id ? response.data : t));
      })
      .catch(error => {
        console.error('Error toggling todo:', error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">✅ Todo List</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a task..."
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.length === 0 && (
          <li className="text-gray-500 text-center">No tasks yet!</li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span
                className={`text-gray-800 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
