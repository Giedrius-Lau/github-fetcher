import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, clearUsers, showClear }) => {
	const [formData, setFormData] = useState({ text: '' });

	const { text } = formData;

	const onChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = async e => {
		e.preventDefault();
		searchUsers(text);
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
	seachUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired
};

export default Search;
