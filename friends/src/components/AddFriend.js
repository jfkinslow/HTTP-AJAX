import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class AddFriend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parent: {},
			toHome: false,
			name: '',
			age: '',
			email: '',
		};
	}
	componentDidMount() {
		this.setState({ parent: this.props.parent });
	}

	onChangeHandler(event) {
		event.preventDefault();
		this.setState({ [event.target.name]: event.target.value });
	}

	addFriendHandler(event, form) {
		event.preventDefault();
		axios
			.post('/friends', form)
			.then(res => {
				console.log('AddFriend: ', res);
				this.setState({ toHome: true });
				this.state.parent.setState({ friends: res.data });
			})
			.catch(err => console.log('AddFriend: ', err));
	}
	render() {
		if (this.state.toHome === true) {
			return <Redirect to="/" />;
		}
		return (
			<div id="AddFriend">
				<h1>Add New Friend</h1>
				<form>
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={event => this.onChangeHandler(event)}
						placeholder="Name"
						ref="nameItem"
						required
					/>
					<br />
					<input
						type="number"
						name="age"
						value={this.state.age}
						onChange={event => this.onChangeHandler(event)}
						placeholder="Age"
						ref="ageItem"
						required
					/>
					<br />
					<input
						type="email"
						name="email"
						value={this.state.email}
						onChange={event => this.onChangeHandler(event)}
						placeholder="Email Address"
						ref="emailItem"
						required
					/>
					<br />
					<button
						type="submit"
						className="btn-primary btn-submit"
						onClick={event => {
							this.addFriendHandler(event, {
								name: this.state.name,
								age: parseInt(this.state.age, 10),
								email: this.state.email,
							});
						}}
					>
						Add New Friend
					</button>
				</form>
			</div>
		);
	}
}
