import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import NoteList from "./components/NoteList";

function MainPage() {
	const [notes, setNotes] = useState([]);

	const addToNotes = (data) => {
		fetch("/api/notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((d) => setNotes([...notes, data]))
			.catch((err) => console.log(err));
	};

	const updateNotes = (data) => {
		fetch("/api/notes", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((updatedNote) => {
				let newNotes = notes;
				newNotes = newNotes.map((note) => {
					if (note._id === updatedNote._id) {
						note.title = updatedNote.title;
						note.description = updatedNote.description;
						return note;
					} else return note;
				});
				setNotes(newNotes);
			})
			.catch((err) => console.log(err));
	};

	const deleteNotes = (id) => {
		fetch("/api/notes", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: id }),
		})
			.then((res) => res.json())
			.then((id) => {
				let newNotes = notes;
				newNotes = newNotes.filter((note) => note._id !== id);
				setNotes(newNotes);
			})
			.catch((err) => console.log(err));
	};

	// useEffect(() => {
	// 	(async () => {
	// 		let data = await fetch("/api/notes");
	// 		data = await data.json();
	// 		setNotes(data);
	// 	})();
	// }, []);

	return (
		<div className="App">
			<Input addToNotes={addToNotes} />
			<NoteList
				notes={notes}
				deleteNotes={deleteNotes}
				updateNotes={updateNotes}
			/>
		</div>
	);
}

export default MainPage;
