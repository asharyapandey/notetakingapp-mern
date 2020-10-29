import React from "react";
import Login from "./Login";
import Notes from "./notes.jpg";
import "./PageSkeleton.css";
import Register from "./Register";

function PageSkeleton({ match, history }) {
	return (
		<div className="skeleton">
			<div className="skeleton__content">
				{match.path === "/login" ? (
					<Login history={history} />
				) : (
					<Register history={history} />
				)}
			</div>
			<div
				className="skeleton__image"
				style={{
					backgroundImage: `url(${Notes})`,
					backgroundSize: "cover",
				}}
			></div>
		</div>
	);
}

export default PageSkeleton;
