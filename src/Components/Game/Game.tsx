import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Phaser from 'phaser'
import Cookies from 'js-cookie'
import Axios from 'axios'

import LoadScene from './Scenes/LoadScene'
import MenuScene from './Scenes/MenuScene'
import GameScene from './Scenes/GameScene'
import VirtualGamepadScene from './Scenes/VirtualGamepadScene'

import './Game.css'

var config = {
    type: Phaser.CANVAS,
    parent: 'game',
    touch: 'true',
    scale: {
        // mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    pixelArt: true,
    scene: [LoadScene, MenuScene, GameScene, VirtualGamepadScene]
}

interface GameProps extends RouteComponentProps<any> {}
type GameState = {}
class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props)

        this.state = {}

        if (Cookies.get('sessionID')) {
            Axios.get(`https://underverse-authentication.herokuapp.com/session/${Cookies.get('sessionID')}`)
            .then((reply) => {
                console.log(reply.data)
                if (reply.data.uid) {
                    return
                }

                console.log('Not logged in.')
                this.props.history.push('/login')
            })
        } else {
            console.log('Not logged in.')
            this.props.history.push('/login')
        }
    }

    componentDidMount() {
        new Phaser.Game(config)
    }

    render() {
        return (
            <div className="game" id="game"></div>
        )
    }
}

export default Game