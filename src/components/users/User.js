import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
	const githubContext = useContext(GithubContext);
	const { getUser, loading, user, getUserRepos, repos } = githubContext;
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	const {
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
	} = user;

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/" className="btn btn-light">
						Back to list
					</Link>
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
					<div className="card text-center">
						<div className="badge badge-primary">Follower: {followers}</div>
						<div className="badge badge-success">Following: {following}</div>
						<div className="badge badge-white">Public repos: {public_repos}</div>
						<div className="badge badge-dark">Public gist: {public_gist}</div>
					</div>
					{repos && <Repos repos={repos} />}
				</Fragment>
			)}
		</Fragment>
	);
};

export default User;
