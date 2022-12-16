import './App.css';
import AccountPage from './pages/AccountPage/AccountPage';
import HomePage from './pages/HomePage/HomePage';
import TracksPage from './pages/TracksPage/TracksPage';
import LoginPage from './pages/Login/LoginPage';
import {
  Routes,
  Route,
} from "react-router-dom";
import RequireLogin from './components/RequireLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Save your breath
      </header>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={
          <RequireLogin>
            <HomePage />
          </RequireLogin>
        } />
        <Route path="tracks" element={
          <RequireLogin>
            <TracksPage />
          </RequireLogin>
        } />
        <Route path="account" element={
          <RequireLogin>
            <AccountPage />
          </RequireLogin>
        } />
      </Routes>
    </div>
  );
}

export default App;
