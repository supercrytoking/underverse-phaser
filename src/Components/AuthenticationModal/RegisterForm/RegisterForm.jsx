import React from 'react'
import Axios from 'axios'

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

        if (!this.state.email) {
            errors.push('You cannot leave the email field blank.')
        } else {
            if (!this.state.email.includes('@') || !this.state.email.includes('.')) errors.push('You must enter a valid email.')
        }
        if (!this.state.username) errors.push('You cannot leave the username field blank.')
        if (!this.state.password) {
            errors.push('You cannot leave the password field blank.')
        } else {
            if (this.state.password.length < 6) errors.push('Your password must be atleast 6 characters long.')
        }

        if (errors) {
            alert(errors.join('\r\n'))
            return
        }
        
        Axios.post('https://underverse-authentication.herokuapp.com/register', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then((reply) => {
            alert(reply.data.message)
            if (reply.data.error) return
            this.props.setForm('login')
        })
    }

    render() {
        return (
            <div className="box register-form">
                <form onSubmit={this.onSubmit} method="POST">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="truegamer777@you.com" onChange={this.onChange} />
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="truegamer777" onChange={this.onChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="*****" autoComplete="" onChange={this.onChange} />
                    <input type="submit" name="submit" value="Register"/>
                </form>
                <div className="buttons">
                    <a href="# " className="" onClick={(e) => {e.preventDefault(); this.props.setForm('login')}}>Login</a>
                </div>
            </div>
        )
    }
}

export default RegisterForm