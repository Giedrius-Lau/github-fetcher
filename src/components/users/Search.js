import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import Users from './Users';

const Search = ({ setAlert }) => {
	const githubContext = useContext(GithubContext);
	const [text, setText] = useState('');

	const onChange = e => {
		setText(e.target.value);
	};

	const onSubmit = async e => {
		e.preventDefault();
		if (text === '') {
			return setAlert(' Please enter something', 'light');
		}
		githubContext.searchUsers(text);
		setText('');
	};

	return (
		<div>
			<form action="" className="form" onSubmit={e => onSubmit(e)}>
				<input type="text" name="text" placeholder="Searc users..." value={text} onChange={e => onChange(e)} />
				<input type="submit" value="submit" className="btn btn-dark btn-block" />
			</form>
			{githubContext.users.length > 0 && (
				<button onClick={githubContext.clearUsers} value="submit" className="btn btn-light btn-block">
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	setAlert: PropTypes.func.isRequired
};

export default Search;
