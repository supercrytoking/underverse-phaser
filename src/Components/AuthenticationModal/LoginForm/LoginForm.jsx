import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'js-cookie'

import './LoginForm.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        var errors = []

        if (!this.state.username || !this.state.password) errors.push('You cannot leave any fields empty.')

        if (errors.length) {
            this.props.setMessage(errors.join('\r\n'))
            return
        }

        Axios.post('https://underverse-authentication.herokuapp.com/login', {
            username: this.state.username,
            password: this.state.password
        }).then((reply) => {
            console.log(reply)
            if (reply.data.error) {
                this.props.setMessage('Failed to login: Did you enter the correct username and password?')
                return
            }

            Cookies.set('sessionID', reply.data.sessionID)
            console.log(reply.data.sessionID)
            this.props.closeModal()
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit} method="POST" className="login-form">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="truegamer777" onChange={this.onChange} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="*****" autoComplete="current-password" onChange={this.onChange} />
                        <input type="submit" name="submit" value="Login"/>
                    </form>
                    <div className="buttons">
                        <Link to={'/register'}>Register</Link>
                        <Link to={'/login/forgot'}>Forgot Password?</Link>
                    </div>
            </>
        )
    }
}

export default LoginForm