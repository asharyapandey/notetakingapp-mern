import React, { useContext } from "react";
import PageSkeleton from "./pages/PageSkeleton";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import MainPage from "./MainPage";
import { UserContext } from "./contexts/UserContext";
//import { PrivateRoute } from "./pages/PrivateRoute";

function App() {
	const { isAuth } = useContext(UserContext);
	console.log(isAuth());

	// useEffect(() => {
	// 	(() => {
	// 		const token = localStorage.getItem("token");
	// 		if (token !== null) {
	// 			fetch("auth/user", {
	// 				headers: {
	// 					"auth-token": token,
	// 				},
	// 			})
	// 				.then((res) => res.json())
	// 				.then((user) => setUser(user))
	// 				.catch((err) => console.log(err));
	// 		}
	// 	})();
	// }, [setUser]);
	return (
		<div>
			<Router>
				<Switch>
					<Route
						path="/"
						exact
						render={() =>
							isAuth() ? <MainPage /> : <Redirect to="/login" />
						}
					/>
					<Route path="/login" exact component={PageSkeleton} />
					<Route path="/register" exact component={PageSkeleton} />
					{/* <PrivateRoute exact path="/" component={MainPage} /> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
