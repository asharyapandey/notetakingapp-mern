import React from "react";
import "./Header.css";
import { UserContext } from "../contexts/UserContext";

function Header() {
	const { user } = React.useContext(UserContext);

	const handleClick = () => {
		localStorage.removeItem("token");
	};

	return (
		<div className="header">
			<h4>{user.username}</h4>
			<button onClick={handleClick} className="logout-button">
				Logout
			</button>
		</div>
	);
}

export default Header;
