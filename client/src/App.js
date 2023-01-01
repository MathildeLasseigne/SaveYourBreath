import './App.css';
import AccountPage from './pages/AccountPage/AccountPage';
import HomePage from './pages/HomePage/HomePage';
import TracksPage from './pages/TracksPage/TracksPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import {
  Routes,
  Route,
} from "react-router-dom";
import RequireLogin from './components/RequireLogin';
import RoleApplyPage from './pages/RoleApply/RoleApplyPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
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
        <Route path="roleapply" element={
          <RequireLogin>
            <RoleApplyPage />
          </RequireLogin>
        } />
      </Routes>
    </div>
  );
}

export default App;
