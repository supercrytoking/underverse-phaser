import { Physics } from 'phaser'

export class Mob extends Physics.Arcade.Sprite {
    damage: number
    health: number
    speed: number
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, health: number, speed: number) {
        super(scene, x, y, texture);

        this.damage = damage
        this.health = health
        this.speed = speed

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setDepth(this.y + this.height / 2)
        this.setScale(2)
    }

}