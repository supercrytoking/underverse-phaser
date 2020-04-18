import React from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'

import RegisterForm from './RegisterForm/RegisterForm'
import LoginForm from './LoginForm/LoginForm'

import './AuthenticationModal.css'

class AuthenticationModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: 'register',
            hide: false
        }

        this.onChange = this.onChange.bind(this)
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closeModal = () => {
        this.setState({hide: true})
        this.props.game.input.enabled = true
        // this.props.scene.start('MENU_SCENE')
    }

    componentDidMount = () => {
        this.props.game.input.enabled = false
        if (Cookies.get('sessionID')) {
            Axios.get(`https://underverse-authentication.herokuapp.com/session/${Cookies.get('sessionID')}`)
            .then((reply) => {
                if (reply.data.uid) {
                    this.closeModal()
                }
            })
        }
    }

    renderForm = () => {
        if (this.state.form == 'login') {
            return(
                <LoginForm setForm={this.setForm} closeModal={this.closeModal} />
            )
        } else if (this.state.form == 'register') {
            return(
                <RegisterForm setForm={this.setForm} closeModal={this.closeModal} />
            )
        }
    }

    setForm = (form) => {
        this.setState({form: form})
    }
    
    render() {
        return (
            <div className={this.state.hide ? 'authentication-modal hide' : 'authentication-modal'}>
                <div className="box">
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}

export default AuthenticationModal