import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from "./ToDo/Todo";
import Home from "./Home/Home";
import Layout from "./Layout/Layout";
import Pomodoro from "./Pomodoro/Pomodoro";
import WaterReminder from "./Water/WaterReminder";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
           <Route path="/water" element={<WaterReminder />} />
        </Route>
    </Routes>
   </Router>
  );
}

export default App;
