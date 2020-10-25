import React from "react";
import "./NoteList.css";
import Note from "./Note";

function NoteList({ notes, deleteNotes, updateNotes }) {
	return (
		<div className="NoteList">
			{notes.map((note) => (
				<Note
					note={note.title}
					desc={note.description}
					id={note._id}
					key={note._id}
					deleteNotes={deleteNotes}
					updateNotes={updateNotes}
				/>
			))}
		</div>
	);
}

export default NoteList;
