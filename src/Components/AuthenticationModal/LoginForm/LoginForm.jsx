import React from 'react'
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

        // Front-end form authentication here.
        
        Axios.post('https://underverse-authentication.herokuapp.com/login', {
            username: this.state.username,
            password: this.state.password
        }).then((reply) => {
            console.log(reply.data)
            alert(reply.data.message)
            if (reply.data.error) return
            Cookies.set('sessionID', reply.data.sessionID)
            this.props.closeModal()
        })
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit} method="POST">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="truegamer777" onChange={this.onChange} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="*****" onChange={this.onChange} />
                        <input type="submit" name="submit" value="Login"/>
                    </form>
                    <div className="buttons">
                        <a href="# " className="" onClick={(e) => {e.preventDefault(); this.props.setForm('register')}}>Register</a>
                    </div>
            </div>
        )
    }
}

export default LoginForm