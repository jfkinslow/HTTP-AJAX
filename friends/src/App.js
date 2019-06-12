import React from 'react';
import './App.css';
import FriendsList from './components/FriendsList';
import AddFriend from './components/AddFriend';
import { Route } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
		};
	}

	componentDidMount() {
		axios
			.get('/friends')
			.then(res => {
				console.log('App: ', res);
				this.setState({ friends: res.data });
				this.forceUpdate();
			})
			.catch(err => console.log('App: ', err));
	}
	componentDidUpdate() {
		console.log('App: ', this.state);
	}
	withProps(Component, props) {
		return function(matchProps) {
			return <Component {...props} {...matchProps} />;
		};
	}

	onDeleteHandler(e, deletedFriend) {
		e.preventDefault();
		axios
			.delete(`/friends/${deletedFriend.id}`)
			.then(res => {
				console.log(res);
				this.setState({ friends: res.data });
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="App">
				<Route
					exact
					path="/"
					component={this.withProps(FriendsList, {
						friends: this.state.friends,
						parent: this,
						onDeleteHandler: this.onDeleteHandler,
					})}
				/>
				<Route path="/update/:id" component={undefined} />
				<Route
					path="/add"
					component={this.withProps(AddFriend, {
						parent: this,
					})}
				/>
			</div>
		);
	}
}

export default App;
