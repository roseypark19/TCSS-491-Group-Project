class Tentacle {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/tentacle.png");
        this.visionDistance = 350;
        this.npc = true;
        this.id = ++PARAMS.NPC_ID;
        this.state = 0; // idle, attacking
        this.shootTimer = 0;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 4, 0.2, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 4 * 32, 0, 32, 32, 8, 0.12, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
    };

    update() {
        let prevState = this.state;

        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);

        this.game.livingEntities.forEach(entity => {
            if (entity instanceof Hero) {
                let heroDist = distance(this.BB.center, entity.BB.center);
                if (heroDist <= this.visionDistance) {
                        this.state = 1;
                        let heroCenter = entity.BB.center;
                        let vector = { x: heroCenter.x - this.BB.center.x, y: heroCenter.y - this.BB.center.y };
                        let theta = Math.atan2(vector.y, vector.x);
                        if (theta < 0) {
                            theta += 2 * Math.PI;
                        }
                        if (this.shootTimer === 0) {
                            this.shootTimer = 0.12 * 8 - this.game.clockTick;
                            if (this.shootFlag) {
                                this.game.addEntity(new Projectile(this.game, 
                                    this.BB.center.x - 16 * PARAMS.PROJECTILE_SCALE + 4 * Math.cos(theta) * PARAMS.SCALE, 
                                    this.BB.center.y - 16 * PARAMS.PROJECTILE_SCALE + 4 * Math.sin(theta) * PARAMS.SCALE, theta, false, 18, this.BB.center, 50));
                            }
                        }
                } else {
                    this.state = 0;
                    this.shootTimer = 0;
                }
            }
        });

        if (PARAMS.GAMEOVER) {
            this.state = 0;
            this.shootTimer = 0;
        }

        this.shootFlag = this.state === 1;

        if (this.state !== prevState) {
            this.animations[prevState].reset();
        }
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};