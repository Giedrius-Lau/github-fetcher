import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import GithubState from './context/github/GithubState';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

const App = () => {
	const [users, setUsers] = useState([]);
	const [repos, setRepos] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		getUsersList();
	}, []);

	const getUsersList = async () => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secre=${
				process.env.REACT_APP_GITHUB_CLIENT_SECRET
			}`
		);
		setLoading(false);
		setUsers(res.data);
	};

	const getUser = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secre=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUser(res.data);
		setLoading(false);
	};

	const getUserRepos = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secre=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setRepos(res.data);
		setLoading(false);
	};

	const searchUsers = async text => {
		setLoading(true);

		if (!text) {
			const res = await axios.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secre=${
					process.env.REACT_APP_GITHUB_CLIENT_SECRET
				}`
			);

			setUsers(res.data);
			setLoading(false);
		} else {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${text}&client_id=${
					process.env.REACT_APP_GITHUB_CLIENT_ID
				}&client_secre=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setUsers(res.data.items);
			setLoading(false);
		}
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(() => setAlert(null), 5000);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	return (
		<GithubState>
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={() => (
									<Fragment>
										<Search
											searchUsers={searchUsers}
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={props => (
									<User
										{...props}
										getUser={getUser}
										getUserRepos={getUserRepos}
										user={user}
										loading={loading}
										repos={repos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
