import React, {Component} from 'react';

class DeviceMotion extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<header className="level1">
					<h1>Device Motion</h1>
				</header>
				<div className="content">
					<article>
						<header className="level2">
							<h2>Angle</h2>
						</header>
						<div>
							<div>{this.props.absolute}</div>
							<div>{this.props.alpha}</div>
							<div>{this.props.beta}</div>
							<div>{this.props.gamma}</div>
						</div>
					</article>
				</div>
			</div>);
	};
}

export default DeviceMotion;
