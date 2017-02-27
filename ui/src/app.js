import '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

var app = document.createElement("div");
document.body.appendChild(app);
ReactDOM.render((
	<article>
		<header className="level1">
			<h1>Device Motion</h1>
		</header>
		<div className="content">
			<table>
				<tr>
					<td>Event Supported</td>
					<td id="dmEvent"></td>
				</tr>
				<tr>
					<td>acceleration</td>
					<td id="moAccel"></td>
				</tr>
				<tr>
					<td>accelerationIncludingGravity</td>
					<td id="moAccelGrav"></td>
				</tr>
				<tr>
					<td>rotationRate</td>
					<td id="moRotation"></td>
				</tr>
				<tr>
					<td>interval</td>
					<td id="moInterval"></td>
				</tr>
			</table>
		</div>
	</article>
), app);

if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionHandler, false);
}

function deviceMotionHandler(eventData) {
	var info, xyz = "[X, Y, Z]";

	// Grab the acceleration from the results
	var acceleration = eventData.acceleration;
	info = xyz.replace("X", acceleration.x);
	info = info.replace("Y", acceleration.y);
	info = info.replace("Z", acceleration.z);
	document.getElementById("moAccel").innerHTML = info;

	// Grab the acceleration including gravity from the results
	acceleration = eventData.accelerationIncludingGravity;
	info = xyz.replace("X", acceleration.x);
	info = info.replace("Y", acceleration.y);
	info = info.replace("Z", acceleration.z);
	document.getElementById("moAccelGrav").innerHTML = info;

	// Grab the rotation rate from the results
	var rotation = eventData.rotationRate;
	info = xyz.replace("X", rotation.alpha);
	info = info.replace("Y", rotation.beta);
	info = info.replace("Z", rotation.gamma);
	document.getElementById("moRotation").innerHTML = info;

	// // Grab the refresh interval from the results
	info = eventData.interval;
	document.getElementById("moInterval").innerHTML = info;
}