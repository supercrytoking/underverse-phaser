import { Physics } from 'phaser'
import GameScene from '../Scenes/GameScene'

export class Mob extends Physics.Arcade.Sprite {
    damage: number
    health: number
    speed: number
    range: number
    parent: any
    constructor(scene: GameScene, x: number, y: number, texture: string, damage: number, health: number, speed: number, range: number) {
        super(scene, x, y, texture);

        this.parent = scene
        this.damage = damage
        this.health = health
        this.speed = speed
        this.range = range

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setScale(2)

        // scene.events.addListener('update', () => {
        //     scene.physics.moveToObject(this, scene.player);
        // })
    }

    preUpdate(time: number, delta: number) {
        this.setDepth(this.y + this.height / 2)

        this.setVelocity(0)

        var distance = Phaser.Math.Distance.Between(this.x, this.y, this.parent.player.x, this.parent.player.y)
        if (distance > this.range) {
            this.scene.physics.moveToObject(this, this.parent.player);
        }

        if (this.health === 0) {
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