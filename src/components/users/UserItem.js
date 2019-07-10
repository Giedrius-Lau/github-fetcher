import React, { Component } from 'react';

export class UserItem extends Component {
	constructor() {
		super();
		this.state = {
			id: 'id',
			login: 'mojombo',
			avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
			html_url: 'https://github.com/mojombo'
		};
	}

	render() {
		return (
			<div>
				<div className="card text-center">
					<img src={this.state.avatar_url} className="round-img" style={{ width: '60px' }} alt="" />
					<h3>{this.state.login}</h3>
					<a
						href={this.state.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-dark btn-sm my-1"
					>
						More
					</a>
				</div>
			</div>
		);
	}
}

export default UserItem;
