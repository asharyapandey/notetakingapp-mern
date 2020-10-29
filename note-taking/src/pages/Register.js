import React, { useState } from "react";
import "./Login.css";
//import { UserContext } from "../contexts/UserContext";

function Register({ history }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	//const {user, setUser} = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = await fetch("/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});
		data = await data.json();
		if (data.err) {
			console.log("error ayexa", data);
		} else {
			history.push("/login");
		}
		//setUser(data.user);
		//dispatch({ type: "ADD_TOKEN", token: data.token });
		//const wat = dispatch({ type: "GET_TOKEN" });
		//console.log(wat);
	};
	return (
		<div className="Login">
			<h1>Register</h1>
			<p>Login to start using our service.</p>
			<form onSubmit={handleSubmit}>
				<div className="form-g">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-g">
					<label htmlFor="email">E-Mail:</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-g">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="button">
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
