import React from 'react';
import { Link } from 'react-router-dom';
// import Navbar.css stylesheet
import './Navbar.css';
import HomeLogo from '../../assets/home.svg';
import AccountLogo from '../../assets/account.svg';
import TracksLogo from '../../assets/tracks.svg';

const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-item">
				<img className="navbar-item--icon" src={HomeLogo} alt="Home" />
				<span className="navbar-item--title">Home</span>
			</Link>
			<Link to="/tracks" href="#" className="navbar-item">
				<img className="navbar-item--icon" src={TracksLogo} alt="Tracks" />
				<span className="navbar-item--title">Tracks</span>
			</Link>
			<Link to="/account" href="#" className="navbar-item">
				<img className="navbar-item--icon" src={AccountLogo} alt="Account" />
				<span className="navbar-item--title">Account</span>
			</Link>
		</nav>
	);
}

export default Navbar;