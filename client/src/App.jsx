import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Clients from './components/Clients';
import Projects from './components/Projects';
import EditProject from './components/EditProject';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects/:id" element={<EditProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 