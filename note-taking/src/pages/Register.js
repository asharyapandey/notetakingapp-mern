import React, { useState } from "react";
import "./Login.css";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	return (
		<div className="Login">
			<h1>Register</h1>
			<p>Login to start using our service.</p>
			<form>
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
					<label htmlFor="email">Username:</label>
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
