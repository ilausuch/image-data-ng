import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Sizes from './pages/Sizes/Sizes'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sizes />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
