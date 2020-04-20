import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

type HomeProps = {}
type HomeState = {}
export default class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)

        this.state = {}
    }

    handleClick = () => {
        // @ts-ignore
        this.props.history.push("/about")
    }

    render() {
        return(
            <div className="home">
                <Link to={'/game'}>Game</Link><br/>
                <Link to={'/login'}>Login</Link><br/>
                <Link to={'/register'}>Register</Link><br/>
                <Link to={'/login/forgot'}>Forgot Password?</Link><br/>
                <Link to={'/logout'}>Logout</Link>
            </div>
        )
    }
}