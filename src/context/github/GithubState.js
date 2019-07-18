import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USERS, GET_REPOS, GET_USER } from '../types';

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//Search User

	const searchUsers = async text => {
		setLoading();

		if (!text) {
			const res = await axios.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secre=${
					process.env.REACT_APP_GITHUB_CLIENT_SECRET
				}`
			);

			dispatch({
				type: SEARCH_USERS,
				payload: res.data
			});
		} else {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${text}&client_id=${
					process.env.REACT_APP_GITHUB_CLIENT_ID
				}&client_secre=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			dispatch({
				type: SEARCH_USERS,
				payload: res.data.items
			});
		}
	};

	//Get User

	const getUser = async username => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secre=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setLoading(false);

		dispatch({
			type: GET_USER,
			payload: res.data
		});
	};

	//Get Repos

	//Clear Users

	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	//Set Loading

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
