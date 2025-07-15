// Layout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  const title = "Productivity 101 with Maharshi Gohel";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
               <li>
                <Link to="/Todo" className="hover:underline">To Do</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
