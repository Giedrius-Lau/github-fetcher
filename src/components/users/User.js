import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const User = ({
	getUser,
	user: {
		name,
		avatar_url,
		hireable,
		location,
		bio,
		blog,
		login,
		html_url,
		company,
		followers,
		following,
		public_repos,
		public_gist
	},
	match,
	loading
}) => {
	useEffect(() => {
		getUser(match.params.login);
	}, [getUser, match.params.login]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/" className="btn btn-light">
						Back to list
					</Link>
					<img alt="" src={avatar_url} />
					Hireble:{' '}
					{hireable ? (
						<i className="fas fas-check text-success" />
					) : (
						<i className="fas fas-times-circle text-danger" />
					)}
					<div className="card grid-2">
						<div className="all-center">
							<img src={avatar_url} alt="" className="round-img" style={{ width: '150px' }} />
							<h1>{name}</h1>
							<p>Location: {location}</p>
						</div>
						<div>
							{bio && (
								<Fragment>
									<h3>Bio</h3>
									<p>{bio}</p>
								</Fragment>
							)}
							<a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark my-1">
								Visit Gihub profile
							</a>
							<ul>
								<li>
									{login && (
										<Fragment>
											<strong>Username: </strong> {login}
										</Fragment>
									)}
								</li>
								<li>
									{company && (
										<Fragment>
											<strong>Company: </strong> {company}
										</Fragment>
									)}
								</li>
								<li>
									{blog && (
										<Fragment>
											<strong>Website: </strong> {blog}
										</Fragment>
									)}
								</li>
							</ul>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

User.propTypes = {
	getUser: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired
};

export default User;
