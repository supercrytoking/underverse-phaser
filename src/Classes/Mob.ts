import { Physics } from 'phaser'

export class Mob extends Physics.Arcade.Sprite {
    scene: Phaser.Scene
    damage: number
    health: number
    speed: number
    range: number
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, health: number, speed: number, range: number) {
        super(scene, x, y, texture);

        this.scene = scene
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

        var distance = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y)
        if (distance > this.range) {
            this.scene.physics.moveToObject(this, this.scene.player);
        }
    }

}