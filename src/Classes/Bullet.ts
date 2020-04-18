import { Physics } from 'phaser'

export class Bullet extends Physics.Arcade.Sprite {
    goToX: number
    goToY: number
    weapon: Physics.Arcade.Sprite
    constructor(scene: Phaser.Scene, weapon: Physics.Arcade.Sprite, x:number, y:number, texture: string) {
        super(scene, weapon.x, weapon.y, texture) 

        this.goToX = x
        this.goToY = y
        this.weapon = weapon

        this.scene = scene

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);

        this.setScale(0.3)
    }

    preUpdate() {
        this.setDepth(this.y + this.height)

        this.scene.physics.moveTo(this, this.goToX, thnpm install phaser3-weapon-pluginis.goToY, 1000)

        var distance = Phaser.Math.Distance.Between(this.x, this.y, this.weapon.x, this.weapon.y)
        // if (distance > 300) {
        // if (distance > 300 || this.x == this.goToX && this.y == this.goToY) {
        //     this.destroy()
        //     console.log('Killed bullet.')
        // }
    }
}