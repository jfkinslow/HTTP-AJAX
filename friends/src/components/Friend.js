import React from 'react';
import { Link } from 'react-router-dom';

import './Friend.css';

export default class Friend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friend: {},
			parent: {},
		};
	}

	componentDidMount() {
		this.setState({ friend: this.props.friend, parent: this.props.parent });
	}

	render() {
		return (
			<div className="friend">
				<h3>{this.state.friend.name}</h3>-<h4>{this.state.friend.age}</h4>
				<h5>{this.state.friend.email}</h5>
				<button
					className="btn-primary btn-delete"
					onClick={event => {
						this.props.onDeleteHandler(event, this.state.friend);
					}}
				>
					Delete
				</button>
				<Link className="btn-primary btn-update" to={`/update/${this.state.friend.id}`}>
					Update
				</Link>
			</div>
		);
	}
}
