import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null
	};

	async componentDidMount() {
		this.setState({
			loading: true
		});

		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secre=${
				process.env.REACT_APP_GITHUB_CLIENT_SECRET
			}`
		);

		this.setState({
			users: res.data,
			loading: false
		});
	}

	searchUsers = async text => {
		this.setState({
			loading: true
		});

		if (!text) {
			const res = await axios.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secre=${
					process.env.REACT_APP_GITHUB_CLIENT_SECRET
				}`
			);

			this.setState({
				users: res.data,
				loading: false
			});
		} else {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${text}&client_id=${
					process.env.REACT_APP_GITHUB_CLIENT_ID
				}&client_secre=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			this.setState({
				users: res.data.items,
				loading: false
			});
		}
	};

	// Set alert
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	clearUsers = () => this.setState({ users: [], loading: false });

	render() {
		return (
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={this.state.users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
