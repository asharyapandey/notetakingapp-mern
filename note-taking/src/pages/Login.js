import React, { useState, useContext } from "react";
import "./Login.css";
import { UserContext } from "../contexts/UserContext";

function Login({ history }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let data = await fetch("/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});
			data = await data.json();
			if (data.error) {
				console.log("error ayexa", data);
			} else {
				history.push("/");
				setUser(data.user);
				localStorage.setItem("token", data.token);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="Login">
			<h1>Login</h1>
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
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="button">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
