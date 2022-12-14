import './App.css';
import AccountPage from './pages/AccountPage/AccountPage';
import HomePage from './pages/HomePage/HomePage';
import TracksPage from './pages/TracksPage/TracksPage';
import { Routes, Route } from "react-router-dom"
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Save your breath
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="tracks" element={<TracksPage />} />
        <Route path="account" element={<AccountPage />} />
      </Routes>
      < Navbar/>
    </div>
  );
}

export default App;
