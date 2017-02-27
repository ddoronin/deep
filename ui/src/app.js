import '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

var app = document.createElement("div");
document.body.appendChild(app);
ReactDOM.render((
	<article>
		<header className="level1">
			<h1>Hello World!</h1>
		</header>
		<div className="content">
			Content!
		</div>
	</article>
), app);
