import React, { useState } from 'react';

const Search = ({ searchUsers }) => {
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
		</div>
	);
};

export default Search;
