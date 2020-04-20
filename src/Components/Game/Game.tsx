import React from 'react'
import Phaser from 'phaser'

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

type GameProps = {}
type GameState = {}
class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props)

        this.state = {}
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