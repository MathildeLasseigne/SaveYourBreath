import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import HomeLogo from '../../assets/home.svg';
import AccountLogo from '../../assets/account.svg';
import TracksLogo from '../../assets/tracks.svg';

const Navbar = () => {
	return (
		<nav className="navbar">
			<NavLink
				to="/"
				className={"navbar-item " + (({ isActive }) => isActive ? "active " : "")}
			>
				<img className="navbar-item--icon" src={HomeLogo} alt="Home" />
				<span className="navbar-item--title">Home</span>
			</NavLink>
			<NavLink
				to="/tracks"
				className={"navbar-item " + (({ isActive }) => isActive ? "active " : "")}
			>
				<img className="navbar-item--icon" src={TracksLogo} alt="Tracks" />
				<span className="navbar-item--title">Tracks</span>
			</NavLink>
			<NavLink
				to="/account"
				className={"navbar-item " + (({ isActive }) => isActive ? "active " : "")}
			>
				<img className="navbar-item--icon" src={AccountLogo} alt="Account" />
				<span className="navbar-item--title">Account</span>
			</NavLink>
		</nav>
	);
}

export default Navbar;