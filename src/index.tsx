import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Deploy test.
import 'reset-css'
import './index.css'

import Home from './Components/Home/Home'
import Game from './Components/Game/Game'
import AuthenticationModal from './Components/AuthenticationModal/AuthenticationModal'
import Logout from './Components/Logout/Logout'

ReactDOM.render(
	<React.StrictMode>
		<Router>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/game" component={Game} />
                  <Route exact path="/login" render={() => <AuthenticationModal form="login" />} />
                  <Route exact path="/register" render={() => <AuthenticationModal form="register" />} />
                  <Route exact path="/login/forgot" render={() => <AuthenticationModal form="resetPassword" />} />
                  <Route exact path="/logout" component={Logout} />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
