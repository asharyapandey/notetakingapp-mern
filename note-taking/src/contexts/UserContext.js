import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const token = localStorage.getItem("token");
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	const [userState, setUserState] = useState({
		token,
		userInfo,
	});

	const isAuth = () => {
		console.log(!userState.token);
		return userState.token != null;
	};

	const getToken = () => {
		return userState.token;
	};

	const setUserInfo = (token, userInfo) => {
		localStorage.setItem("token", token);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));

		setUserState({ token, userInfo });
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userInfo");
		setUserState({
			token: null,
			userInfo: {},
		});
	};

	return (
		<UserContext.Provider
			value={{ userState, isAuth, setUserInfo, getToken, logout }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
