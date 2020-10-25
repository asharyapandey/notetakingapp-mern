import React, { useState } from "react";
import "./Input.css";

function Input({ notes, addToNotes }) {
	const [textarea, setTextArea] = useState(false);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		addToNotes({ title, description: desc });
		setTitle("");
		setDesc("");
	};

	return (
		<form onSubmit={handleSubmit} className="Input">
			<div className="text-grid">
				<input
					onFocus={() => setTextArea(true)}
					type="text"
					className="text title"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="Description"
					name="desc"
					id="desc"
					className={textarea ? "text" : "text d-n"}
					cols="30"
					rows="10"
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				></textarea>
			</div>
			<div className="btn-div">
				<button
					onClick={() => setTextArea(false)}
					className={textarea ? "btn" : "btn d-n"}
					type="submit"
				>
					Add
				</button>
				<button
					onClick={() => setTextArea(false)}
					className={textarea ? "btn" : "btn d-n"}
					type="button"
				>
					Close
				</button>
			</div>
		</form>
	);
}

export default Input;
