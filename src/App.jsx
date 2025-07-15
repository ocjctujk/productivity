import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from "./ToDo/Todo";
import Home from "./Home/Home";
import Layout from "./Layout/Layout";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
    </Routes>
   </Router>
  );
}

export default App;
