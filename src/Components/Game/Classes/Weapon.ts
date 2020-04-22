import { Physics } from 'phaser'

import GameScene from '../Scenes/GameScene'
import Bullet from './Bullet'

var lastShot = 0
export default class Weapon extends Physics.Arcade.Sprite {
    sprite: Physics.Arcade.Sprite
    bullets: Phaser.GameObjects.Group
    parent: GameScene
    constructor(scene: GameScene, sprite: Physics.Arcade.Sprite, texture: string) {
        super(scene, sprite.x + 100, sprite.y, texture)

        this.parent = scene
        this.sprite = sprite
        this.bullets = scene.add.group()

        // this.setOrigin(0, 1)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this, false)

        // this.setScale(0.3)
    }

    shoot = (x: number, y: number, angle: number) => {
		// var timeNow = new Date().getTime()
		// if (timeNow - lastShot > 300) {
            // lastShot = new Date().getTime()
            this.bullets.add(new Bullet(this.parent, this, x, y, angle, 'TREE_SPRITE'))
            var angle = Phaser.Math.Angle.Between(this.x, this.y, this.parent.input.activePointer.worldX, this.parent.input.activePointer.worldY)
            console.log(angle)
            this.rotation = angle
        // }
    }

    preUpdate() {
        this.setDepth(this.y + this.height)

        this.x = this.sprite.x + 20
        this.y = this.sprite.y

        if (this.parent.input.activePointer.isDown) {
			this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main)
			this.shoot(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY, 0)
        }

        if (this.parent.player.body.velocity.x < 0) {
            this.flipY = true
            this.x = this.parent.player.x - 100 
		}

        if (this.parent.player.body.velocity.x > 0) {
            this.flipY = false
            this.x = this.parent.player.x + 100 
		}

    }
}