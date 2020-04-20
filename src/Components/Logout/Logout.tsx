import React from 'react'
import Cookies from 'js-cookie'

import './Logout.css'

export default class Logout extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {}

        Cookies.remove('sessionID')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="logout">
                Cookie cleared!
            </div>
        )
    }
}