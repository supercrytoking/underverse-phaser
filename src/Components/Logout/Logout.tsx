import React from 'react'
import Cookies from 'js-cookie'

import './Logout.css'

type LogoutProps = {}
type LogoutState = {}
export default class Logout extends React.Component<LogoutProps, LogoutState> {
    constructor(props: LogoutState) {
        super(props)

        this.state = {}

        Cookies.remove('sessionID')
    }

    render() {
        return (
            <div className="logout">
                Cookie cleared!
            </div>
        )
    }
}