import { Physics } from 'phaser'
import GameScene from '../Scenes/GameScene'
import Mob from './Mob'

export default class Bullet extends Physics.Arcade.Sprite {
    parent: GameScene
    goToX: number
    goToY: number
    goAngle: number
    constructor(scene: GameScene, weapon: Physics.Arcade.Sprite, x:number, y:number, angle: number, texture: string) {
        super(scene, weapon.x, weapon.y, texture) 

        this.parent = scene

        this.goToX = x
        this.goToY = y
        this.goAngle = angle

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this, false)

        this.setScale(0.1)

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

        this.scene.physics.add.collider(this.parent.mobs, this, (mob: Mob, bullet: Bullet) => {
            mob.reduceHealth(20)
            this.destroy()
        })

        // this.scene.physics.add.collider(this.parent.mobs, this, (mob: Mob, bullet: Bullet) => {
        //     console.log(mob, bullet)
        //     // console.log(object.health)
        //     mob.reduceHealth(50)
        //     this.destroy()
        // }, )
    }

    preUpdate() {
        this.setDepth(this.y + this.height)
    }
}