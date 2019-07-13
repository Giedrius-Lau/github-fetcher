import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const User = ({
	getUser,
	user: { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gist },
	match
}) => {
	useEffect(() => {
		getUser(match.params.login);
		console.log(name);
	});

	return <div />;
};

User.propTypes = {
	getUser: PropTypes.func.isRequired
};

export default User;
