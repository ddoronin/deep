import '../styles/main.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DeviceMotion from './components/DeviceMotion';

var app = document.createElement("div");
document.body.appendChild(app);

class DeviceToolkit extends Component {
	constructor() {
		super();

		const deviceMotion = {
			angle: {
				alpha: 0,
				beta: 0,
				gamma: 0
			}
		};

		this.state = deviceMotion;

		//const ws = new WebSocket('ws://localhost:3000/');
		const ws = new WebSocket('ws://the-deep.herokuapp.com/');

		ws.onopen = function () {
			console.log('ws is opened');
			/*let index = 0;
			setInterval(() => {
				index++;
				ws.send('global:' + JSON.stringify({
						angle: {alpha: index, beta: index, gamma: index}
					}));
			}, 1000);
*/
			window.addEventListener('deviceorientation', function handleOrientation(event) {
				//var absolute = event.absolute;
				var alpha = event.alpha;
				var beta = event.beta;
				var gamma = event.gamma;

				ws.send('global:' + JSON.stringify({
					angle: {alpha, beta, gamma}
				}));
			}, true);
		};

		ws.onmessage = message => {
			if(message.data.indexOf('echo') === -1) {
				const angle = JSON.parse(message.data).angle;
				this.setState({angle: angle});
			}
		};
	}

	render() {
		return <DeviceMotion
			alpha={this.state.angle.alpha}
			beta={this.state.angle.beta}
			gamma={this.state.angle.gamma}/>
	}
}

ReactDOM.render((
	<article>
		<DeviceToolkit/>
	</article>
), app);

