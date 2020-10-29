import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		fetch("auth/user", {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((user) => setUser(user))
			.catch((err) => console.log(err));
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
