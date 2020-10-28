import React from "react";
import PageSkeleton from "./pages/PageSkeleton";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact component={MainPage} />
					<Route path="/login" exact component={PageSkeleton} />
					<Route path="/register" exact component={PageSkeleton} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
