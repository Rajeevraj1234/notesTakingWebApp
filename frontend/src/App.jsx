import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./assets/landing"
import Edit from "./assets/edit"

function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/edit/:id" element={<Edit />} />
  </Routes>
}

export default App;
