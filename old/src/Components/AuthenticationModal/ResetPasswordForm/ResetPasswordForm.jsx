import React from 'react'
import Axios from 'axios'

import './ResetPasswordForm.css'

class ResetPasswordForm extends React.Component {
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
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit} method="POST" className="register-form">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="truegamer777@you.com" onChange={this.onChange} />
                    <input type="submit" name="submit" value="Register" style={{
                        pointerEvents: 'none',
                        opacity: 0.1
                    }}/>
                </form>
                <div className="buttons">
                    <a href="# " className="" onClick={(e) => {e.preventDefault(); this.props.setForm('login')}}>Login</a>
                    <a href="# " className="" onClick={(e) => {e.preventDefault(); this.props.setForm('register')}}>Register</a>
                </div>
            </>
        )
    }
}

export default ResetPasswordForm