import { Physics } from "phaser";
import { Bullet } from "./Bullet";

export class Weapon extends Physics.Arcade.Sprite {
    sprite: Physics.Arcade.Sprite;
    bullets: Phaser.GameObjects.Group;
    constructor(scene: Phaser.Scene, sprite: Physics.Arcade.Sprite, texture: string) {
        super(scene, sprite.x + 10, sprite.y + 10, texture)

        this.scene = scene
        this.sprite = sprite
        this.bullets = scene.add.group()

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);

        this.setScale(0.3)
    }

    shoot = (x: number, y: number) => {
        this.bullets.add(new Bullet(this.scene, this, x, y, 'TREE_SPRITE'))
    }

    preUpdate() {
        this.setDepth(this.y + this.height)

        this.x = this.sprite.x + 20
        this.y = this.sprite.y
    }
}