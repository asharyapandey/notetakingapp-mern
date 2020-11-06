import React, { useState, useContext } from "react";
import "./Login.css";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setUserInfo } = useContext(UserContext);
	const history = useHistory();

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
				history.replace("/");
				setUserInfo(data.token, data.user);
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
				<p>
					Click{" "}
					<span onClick={() => history.push("/register")}>Here</span>{" "}
					to register.
				</p>
			</form>
		</div>
	);
}

export default Login;
