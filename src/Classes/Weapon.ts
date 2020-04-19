import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { GameScene } from "../Scenes/GameScene";

var lastShot = 0

export class Weapon extends Physics.Arcade.Sprite {
    sprite: Physics.Arcade.Sprite;
    bullets: Phaser.GameObjects.Group;
    actionkey: import("phaser").Input.Keyboard.Key;
    constructor(scene: GameScene, sprite: Physics.Arcade.Sprite, texture: string) {
        super(scene, sprite.x + 10, sprite.y + 10, texture)

        this.scene = scene
        this.sprite = sprite
        this.bullets = scene.add.group()

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);

        this.setScale(0.3)

		this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main)
			this.shoot(pointer.worldX, pointer.worldY, null)
		})

		this.actionkey = this.scene.input.keyboard.addKey('E')
		this.actionkey.on('down', () => {
			this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main)
			this.shoot(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY, null)
        })
    }

    shoot = (x: number, y: number, angle: number) => {
		var timeNow = new Date().getTime()
		if (timeNow - lastShot > 300) {
            lastShot = new Date().getTime()
            this.bullets.add(new Bullet(this.scene, this, x, y, angle, 'TREE_SPRITE'))
        }
    }

    preUpdate() {
        this.setDepth(this.y + this.height)

        this.x = this.sprite.x + 20
        this.y = this.sprite.y
    }
}