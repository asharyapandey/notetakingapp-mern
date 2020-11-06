import React, { useState, useEffect } from "react";
import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import NoteList from "./components/NoteList";
import { UserContext } from "./contexts/UserContext";

function MainPage({ history }) {
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState("");
	const [status, setStatus] = useState("loading");
	const { getToken } = useContext(UserContext);

	const addToNotes = (data) => {
		fetch("/api/notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": getToken(),
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
				"auth-token": localStorage.getItem("token"),
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
				"auth-token": localStorage.getItem("token"),
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

	useEffect(() => {
		(async () => {
			let data = await fetch("/api/notes", {
				headers: {
					"auth-token": localStorage.getItem("token"),
				},
			});
			data = await data.json();
			console.log(data);
			if (data.msg) {
				setError(data.msg);
				setStatus("failed");
			} else {
				setNotes(data);
				setStatus("success");
				setError("");
			}
		})();
	}, []);

	if (status === "loading") {
		return <h1>{status}</h1>;
	}

	if (status === "failed")
		return <h1>The request has failed please reload the page {error}</h1>;

	if (status === "success") {
		return (
			<div className="App">
				<Header history={history} />
				<Input addToNotes={addToNotes} />
				<NoteList
					notes={notes}
					deleteNotes={deleteNotes}
					updateNotes={updateNotes}
				/>
			</div>
		);
	}
}

export default MainPage;
