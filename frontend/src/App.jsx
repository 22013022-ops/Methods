import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sandbox from './pages/Sandbox'; // 🛠️ Import Sandbox

// ... keep Home exactly as it is

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sandbox" element={<Sandbox />} /> {/* 🛠️ Mount Sandbox route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}