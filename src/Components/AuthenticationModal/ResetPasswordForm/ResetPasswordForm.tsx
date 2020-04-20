import React from 'react'
import { Link } from 'react-router-dom'

import './ResetPasswordForm.css'

class ResetPasswordForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {}

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e: any) => {
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
                    <Link to={'/register'}>Register</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            </>
        )
    }
}

export default ResetPasswordForm