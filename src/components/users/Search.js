import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ clearUsers, showClear, setAlert }) => {
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
			{showClear && (
				<button onClick={() => clearUsers()} value="submit" className="btn btn-light btn-block">
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired
};

export default Search;
