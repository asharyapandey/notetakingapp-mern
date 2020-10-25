import React from "react";

const usePost = () => {
	const [notes, setNotes] = React.useState([]);
	React.useEffect(() => {
		fetch("/api/notes")
			.then((res) => res.json())
			.then((d) => setNotes(d))
			.catch((err) => console.log(err));
	}, []);

	return notes;
};
export default usePost;
