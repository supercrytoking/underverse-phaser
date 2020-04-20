import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'reset-css'
import './index.css'

import Game from './Components/Game/Game'

ReactDOM.render(
	<React.StrictMode>
		<Router>
            <Route exact path="/game" component={Game} />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
