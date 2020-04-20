import { Physics } from 'phaser'
import GameScene from '../Scenes/GameScene'

export class Bullet extends Physics.Arcade.Sprite {
    goToX: number
    goToY: number
    weapon: Physics.Arcade.Sprite
    goAngle: number
    constructor(scene: GameScene, weapon: Physics.Arcade.Sprite, x:number, y:number, angle: number, texture: string) {
        super(scene, weapon.x, weapon.y, texture) 

        this.goToX = x
        this.goToY = y
        this.goAngle = angle
        this.weapon = weapon

        this.scene = scene

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);

        this.setScale(0.1)

        // todo
        if (this.goToX === null && this.goToY === null) {
            var directionVelocity = this.body.world.scene.physics.velocityFromAngle(this.goAngle, 1000)
            this.setVelocityX(directionVelocity.x)
            this.setVelocityY(directionVelocity.y)
        } else {
            this.setDrag(0, 0)
            this.scene.physics.moveTo(this, this.goToX, this.goToY, 1000)
        }
            
        setTimeout(() => {
            this.destroy()
        }, 1500)

        // this.scene.physics.add.collider(this.scene.mobs, this, (object) => {
        //     console.log(object.health)
        //     object.reduceHealth(10)
        //     this.destroy()
        // })
    }

    preUpdate() {
        this.setDepth(this.y + this.height)
    }
}