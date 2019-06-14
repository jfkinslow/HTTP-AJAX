import React from 'react';
import Friend from './Friend';
import { Link } from 'react-router-dom';

import './FriendsList.css';

export default class FriendsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
		};
	}

	componentDidMount() {
		this.setState({ friends: this.props.friends });
		console.log('List: ', this.state);
	}

	componentDidUpdate() {
		console.log('List: ', this.state);
	}

	render() {
		return (
			<div id="FriendsList">
				<h1>Friends</h1>
				<Link className="btn-primary btn-addNew" to="/add">
					Add New
				</Link>
				{this.state.friends.map(friend => (
					<Friend
						key={`Friend-${friend.id}`}
						friend={friend}
						parent={this}
						onDeleteHandler={this.props.onDeleteHandler}
					/>
				))}
			</div>
		);
	}
}
