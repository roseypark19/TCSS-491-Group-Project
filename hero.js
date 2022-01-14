class TinyHero {
    constructor(game, destinations) {
        Object.assign(this, { game, destinations });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/tiny_hero.png");
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.state = 0; // idle, walking, shooting, charged, dead
                        // 0, 1, 2, 3, 4
        this.velocityConstant = 8;
        this.velocity = { x : 0, y : 0 };
        this.animations = [];
        this.scale = PARAMS.SCALE / 1;
        this.targetIndex = 0;
        this.prevTargetIndex = 0;
        this.x = this.destinations[this.targetIndex].originX - 16 * this.scale;
        this.y = this.destinations[this.targetIndex].originY - 16 * this.scale;
        this.target = this.destinations[this.targetIndex];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations[0] = new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.25, false, true);
        this.animations[1] = new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 4, 0.1 / (this.velocityConstant / 4), false, true);
    };
    
    update() {
        let newVelX = 0;
        let newVelY = 0;
        let prevState = this.state;
        this.facing[0] = 0;
        
        if (this.game.right) {
            newVelX += this.velocityConstant;
        }
        if (this.game.left) {
            newVelX -= this.velocityConstant;
        }
        if (this.game.up) {
            newVelY -= this.velocityConstant;
        }
        if (this.game.down) {
            newVelY += this.velocityConstant;
        }

        let targetReached = distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0;

        if (newVelX !== 0 && (!targetReached || (targetReached && this.target.stoppable))) {
            if (this.prevTargetIndex === this.targetIndex) {
                if (Math.sign(newVelX) === Math.sign(this.target.neighbors.prev.x) && this.targetIndex > 0) {
                    this.prevTargetIndex = this.targetIndex;
                    this.targetIndex--;
                } else if (Math.sign(newVelX) === Math.sign(this.target.neighbors.next.x) && this.targetIndex < this.destinations.length - 1) {
                    this.prevTargetIndex = this.targetIndex;
                    this.targetIndex++;
                }
            } else {
                let sign = this.prevTargetIndex < this.targetIndex ? Math.sign(this.target.neighbors.prev.x) : Math.sign(this.target.neighbors.next.x);
                if (sign === Math.sign(newVelX)) {
                    this.prevTargetIndex = this.targetIndex;
                    this.targetIndex = sign === Math.sign(this.target.neighbors.prev.x) ? this.targetIndex - 1 : this.targetIndex + 1;
                }
            }
            this.target = this.destinations[this.targetIndex]; 
        }

        targetReached = distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0;

        if (newVelY !== 0 && (!targetReached || (targetReached && this.target.stoppable))) {
            if (this.prevTargetIndex === this.targetIndex) {
                if (Math.sign(newVelY) === Math.sign(this.target.neighbors.prev.y) && this.targetIndex > 0) {
                    this.prevTargetIndex = this.targetIndex;
                    this.targetIndex--;
                } else if (Math.sign(newVelY) === Math.sign(this.target.neighbors.next.y) && this.targetIndex < this.destinations.length - 1) {
                    this.prevTargetIndex = this.targetIndex;
                    this.targetIndex++;
                }
            } else {
                let sign = this.prevTargetIndex < this.targetIndex ? Math.sign(this.target.neighbors.prev.y) : Math.sign(this.target.neighbors.next.y);
                if (sign === Math.sign(newVelY)) {
                    this.prevTargetIndex = this.targetIndex;
                    this.targetIndex = sign === Math.sign(this.target.neighbors.prev.y) ? this.targetIndex - 1 : this.targetIndex + 1;
                }
            }

            this.target = this.destinations[this.targetIndex];
        }

        let unitVect = { x: 0, y: 0 }; 

        if (distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) !== 0) {
            unitVect = unitVector({ x: this.target.originX - this.BB.center.x, y: this.target.originY - this.BB.center.y });
        }

        this.velocity.x = unitVect.x * Math.min(this.velocityConstant, Math.abs(this.BB.center.x - this.target.originX));
        this.velocity.y = unitVect.y * Math.min(this.velocityConstant, Math.abs(this.BB.center.y - this.target.originY));
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        targetReached = distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0;

        if (!this.target.stoppable && targetReached && this.targetIndex > 0 && this.targetIndex < this.destinations.length - 1) {
            let temp = this.prevTargetIndex;
            this.prevTargetIndex = this.targetIndex;
            this.targetIndex = temp < this.targetIndex ? this.targetIndex + 1 : this.targetIndex - 1;
            this.target = this.destinations[this.targetIndex];
        } else if (this.target.stoppable && targetReached) {
            this.prevTargetIndex = this.targetIndex;
        }

        this.state = magnitude(this.velocity) > 0 ? 1 : 0;
        this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
        if (this.state === 1 && this.velocity.x !== 0) {
            this.facing[1] = this.velocity.x < 0 ? 1 : 0;
        } else if (this.state === 0) {
            this.facing[1] = 0;
        }

        if (this.state !== prevState) {
            this.animations[prevState].reset();
        }
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * this.scale, 32 * this.scale);
    };
    
    draw(ctx) {
        this.animations[this.state]
            .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, this.facing[0], this.facing[1]);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

