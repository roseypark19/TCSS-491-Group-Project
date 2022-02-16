class Snowman {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/snowman.png");
        this.npc = true;
        this.visionDistance = 350;
        this.state = 0; // idle, activating, shooting
        this.facing = [0, randomInt(2)];
        this.activationTimer = 0;
        this.shootTimer = 0;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 1, 0.1, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 2 * 32, 0, 32, 32, 5, 0.2, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 7 * 32, 0, 32, 32, 10, 0.08, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
    };

    update() {
        let prevState = this.state;

        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        this.activationTimer = Math.max(0, this.activationTimer - this.game.clockTick);

        this.game.livingEntities.forEach(entity => {
            if (entity instanceof Hero) {
                let heroDist = distance(this.BB.center, entity.BB.center);
                if (heroDist <= this.visionDistance) {
                    if (this.state === 0) {
                        this.state = 1;
                        this.facing = [0, 0];
                        this.activationTimer = 5 * 0.1 - this.game.clockTick;
                    } else if (this.activationTimer === 0) {
                        let heroCenter = entity.BB.center;
                        this.state = 2;
                        let snowballVector = { x: heroCenter.x - this.BB.center.x, y: heroCenter.y - this.BB.center.y };
                        let snowballTheta = Math.atan2(snowballVector.y, snowballVector.x);
                        if (snowballTheta < 0) {
                            snowballTheta += 2 * Math.PI;
                        }
                        let degrees = toDegrees(snowballTheta);
                        if (degrees <= 45 || degrees >= 315) {
                            this.facing = [0, 0];
                        } else if (degrees > 45 && degrees < 135) {
                            this.facing = [1, 0];
                        } else if (degrees <= 225 && degrees >= 135) {
                            this.facing = [0, 1];
                        } else {
                            this.facing = [1, 1];
                        }
                        if (this.shootTimer === 0) {
                            this.shootTimer = 0.08 * 10 - this.game.clockTick;
                            if (this.shootFlag) {
                                this.game.addEntity(new Projectile(this.game, 
                                    this.BB.center.x - 16 * PARAMS.PROJECTILE_SCALE * 1.75 + 4 * Math.cos(snowballTheta) * PARAMS.PROJECTILE_SCALE * 1.75, 
                                    this.BB.center.y - 16 * PARAMS.PROJECTILE_SCALE * 1.75 + 4 * Math.sin(snowballTheta) * PARAMS.PROJECTILE_SCALE * 1.75, snowballTheta, false, 10, this.BB.center, 25, PARAMS.PROJECTILE_SCALE * 1.75));
                            }
                        }
                    }
                } else {
                    this.facing[0] = 0;
                    this.state = 0;
                    this.shootTimer = 0;
                    this.activationTimer = 0;
                }
            }
        });

        if (PARAMS.GAMEOVER) {
            this.facing[0] = 0;
            this.state = 0;
            this.shootTimer = 0;
            this.activationTimer = 0;
        }

        this.shootFlag = this.state === 2;

        if (this.state !== prevState) {
            this.animations[prevState].reset();
        }
    }

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE, this.facing[0], this.facing[1]);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
};