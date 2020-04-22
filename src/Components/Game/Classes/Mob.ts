import { Physics } from 'phaser'
import GameScene from '../Scenes/GameScene'
import { Player } from './Player'

var R = require('random')

export default class Mob extends Physics.Arcade.Sprite {
    damage: number
    health: number
    speed: number
    range: number
    parent: GameScene
    constructor(scene: GameScene, x: number, y: number, texture: string, damage: number, health: number, speed: number, range: number) {
        super(scene, x, y, texture)

        this.parent = scene
        this.damage = damage
        this.health = health
        this.speed = speed
        this.range = range

        this.parent.add.existing(this)
        this.parent.physics.add.existing(this)

        this.setScale(2)

        this.parent.physics.add.collider(this, this.parent.player, (mob: Mob, player: Player) => {
            player.reduceHealth(10)
        })
    }

    preUpdate(time: number, delta: number) {
        this.setDepth(this.y + this.height / 2)
        this.setVelocity(0)

        var distance = Phaser.Math.Distance.Between(this.x, this.y, this.parent.player.x, this.parent.player.y)
        if (distance > this.range) {
            this.parent.physics.moveToObject(this, this.parent.player)
        }

        if (this.health <= 0) {
            this.destroy()
        }
    }

    reduceHealth = (amount: number) => {
        this.health -= amount
    }

    increaseHealth = (amount: number) => {
        this.health += amount
    }

}