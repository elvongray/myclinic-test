import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import ListCreatePage from './components/ListCreatePage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tickets/:username" element={<ListCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
