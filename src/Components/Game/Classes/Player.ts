import { Physics} from 'phaser';

import GameScene from '../Scenes/GameScene';
import Weapon from './Weapon';

type Config = {
	x: number,
	y: number
}

export class Player extends Physics.Arcade.Sprite {
	keys: any;
	speed: number;
	player!: Physics.Arcade.Sprite;
	weapon!: Weapon;
	parent: GameScene;
	health: number;
    velocity: any;
	constructor(scene: GameScene, config: Config) {
		super(scene, config.x, config.y, 'PLAYER_SPRITE', 'player-20.png');

		this.parent = scene

		this.health = 100

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this, false);

		this.body.setSize(this.width, this.height / 4);
		this.setOffset(0, this.height - (this.height / 4));
		this.setScale(2);

		// this fixes type issues where some stuff thinks we
		// have a static body.
		this.body = this.body as Physics.Arcade.Body;

		// Lock the camera and set the bounds.
		this.body.setCollideWorldBounds();
		this.scene.cameras.main.startFollow(this, true, 0.05, 0.05);

		this.keys = this.scene.input.keyboard.addKeys('W,A,S,D,SHIFT,TAB');
		this.speed = 120;
	}

    reduceHealth = (amount: number) => {
        this.health -= amount
    }

    increaseHealth = (amount: number) => {
        this.health += amount
    }

	addWeapon = () => {
		this.weapon = new Weapon(this.parent, this, 'GUN')
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);
		this.setDepth(this.y + this.height);

		// if (this.health <= 0) console.log('HIT')
		
		// reset our speed incase they let up
		this.speed = 120;

		if (this.keys.SHIFT.isDown) {
			this.speed = 240;
		}
		if (this.keys.TAB.isDown) {
			this.speed = 540;
		}

		// WSAD movement.
		if (this.keys.W.isDown) {
			this.body.velocity.y = -Math.abs(this.speed);
		}
		if (this.keys.S.isDown) {
			this.body.velocity.y = this.speed;
		}
		if (this.keys.A.isDown) {
			this.body.velocity.x = -Math.abs(this.speed);
		}
		if (this.keys.D.isDown) {
			this.body.velocity.x = this.speed;
		}

		const scene = this.scene as GameScene;
		if (scene.inSpeech) {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}

		if (this.body.velocity.x > 0) {
			this.anims.play('PLAYER_ANIMATION_EAST', true);
		}

		if (this.body.velocity.x < 0) {
			this.anims.play('PLAYER_ANIMATION_WEST', true);
		}

		if (this.body.velocity.y > 0 && this.body.velocity.x === 0) {
			this.anims.play('PLAYER_ANIMATION_SOUTH', true);
		}

		if (this.body.velocity.y < 0 && this.body.velocity.x === 0) {
			this.anims.play('PLAYER_ANIMATION_NORTH', true);
		}

		if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
			this.anims.stop();
		}

		if (this.keys.W.isUp && this.keys.S.isUp) {
			this.body.velocity.y = 0;
		}

		if (this.keys.A.isUp && this.keys.D.isUp) {
			this.body.velocity.x = 0;
		}

		this.body.velocity.normalize().scale(this.speed);
	}
}