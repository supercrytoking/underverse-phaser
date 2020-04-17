import { Physics } from 'phaser'

export class Mob extends Physics.Arcade.Sprite {
    scene: Phaser.Scene
    damage: number
    health: number
    speed: number
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, health: number, speed: number) {
        super(scene, x, y, texture);

        this.scene = scene
        this.damage = damage
        this.health = health
        this.speed = speed

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setDepth(this.y + this.height / 2)
        this.setScale(2)

        // scene.events.addListener('update', () => {
        //     scene.physics.moveToObject(this, scene.player);
        // })
    }

    preUpdate(time: number, delta: number) {
        this.scene.physics.moveToObject(this, this.scene.player);
    }

}