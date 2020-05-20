import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddTodo from './containers/AddTodo';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/add-task" component={AddTodo} />
					<Route path="/" component={AddTodo} />
				</Switch>
			</BrowserRouter>

		)
	}
}

export default App;
