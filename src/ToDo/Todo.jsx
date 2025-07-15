import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

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

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            {todos.length > 0 ? `${completedCount} of ${todos.length} completed` : 'Get started by adding a task'}
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 bg-gray-50/80 border-0 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all duration-200"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No tasks yet!</p>
              <p className="text-gray-400 text-sm mt-1">Add your first task above to get started</p>
            </div>
          )}

          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg border border-white/20 p-4 transition-all duration-200 hover:scale-[1.02] ${
                todo.completed ? 'opacity-75' : ''
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.3s ease-out forwards'
              }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleComplete(todo)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    todo.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                      : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                <span
                  className={`flex-1 transition-all duration-200 ${
                    todo.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{Math.round((completedCount / todos.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / todos.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Todo;
