import React from "react";
import "./Header.css";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

function Header() {
	const { userState, logout } = React.useContext(UserContext);
	const history = useHistory();

	const handleClick = () => {
		logout();
		history.push("/login");
	};

	return (
		<div className="header">
			<h4>{userState.userInfo.username}</h4>
			<button onClick={handleClick} className="logout-button">
				Logout
			</button>
		</div>
	);
}

export default Header;
