import Navbar from "./Navbar"
import List from "./pages/List"
import Home from "./pages/Home"
import ScreenTime from "./pages/ScreenTime"
import Goals from "./pages/Goals"
import { Route, Routes } from "react-router-dom"

const DATA = [
  { id: "todo-0", name: "Eat", completed: false },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List tasks={DATA} />} />
          <Route path="/screentime" element={<ScreenTime />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </div>
    </>
  )
}

export default App
