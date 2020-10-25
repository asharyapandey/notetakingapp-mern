import React from "react";
import "./Note.css";
import Delete from "./delete.png";

const Note = ({ id, note, desc, deleteNotes, updateNotes }) => {
	const [title, setTitle] = React.useState(note);
	const [description, setDescription] = React.useState(desc);
	return (
		<div
			onBlur={() => updateNotes({ _id: id, title, description })}
			className="Note"
		>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				name="desc"
				id="desc"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				cols="30"
				rows="10"
			></textarea>
			<button className="delete-btn" onClick={() => deleteNotes(id)}>
				<img src={Delete} alt="Delete Icont" />
			</button>
		</div>
	);
};

export default Note;
