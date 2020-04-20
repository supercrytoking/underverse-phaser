import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import './RegisterForm.css'

class RegisterForm extends React.Component {
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

        // Front-end form authentication here.

        var errors = []

        if (!this.state.email || !this.state.username || !this.state.password) {
            errors.push('You cannot leave any fields empty.')
        } else {
            if (!this.state.email.includes('@') || !this.state.email.includes('.')) errors.push('You must enter a valid email.')
            if (this.state.password.length < 6) errors.push('Your password must be atleast 6 characters long.')
            if (this.state.password !== this.state.confirmPassword) errors.push('Your password does not match.')
        }

        if (errors.length) {
            this.props.setMessage(errors.join('\r\n'))
            return
        }
        
        Axios.post('https://underverse-authentication.herokuapp.com/register', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then((reply) => {
            this.props.setMessage(reply.data.message)
            if (reply.data.error) return
            setTimeout(() => {
                this.props.setForm('login')
            }, 2000)
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit} method="POST" className="register-form">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="truegamer777@you.com" onChange={this.onChange} />
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="truegamer777" onChange={this.onChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="*****" autoComplete="" onChange={this.onChange} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="*****" autoComplete="" onChange={this.onChange} />
                    <input type="submit" name="submit" value="Register"/>
                </form>
                <div className="buttons">
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/login/forgot'}>Forgot Password?</Link>
                </div>
            </>
        )
    }
}

export default RegisterForm