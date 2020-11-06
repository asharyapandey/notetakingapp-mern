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
	return isAuth() ? <ProtectedRoutes /> : <Routes />;
}

const ProtectedRoutes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={MainPage} />
			</Switch>
		</Router>
	);
};

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to={"/login"} />
				</Route>
				<Route path="/login" exact component={PageSkeleton} />
				<Route path="/register" exact component={PageSkeleton} />
			</Switch>
		</Router>
	);
};

export default App;
