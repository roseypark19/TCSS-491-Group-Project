class DamageRegion {

    constructor(game, x, y, width, height, friendly, damage, lifetime, sourcePoint) {
        Object.assign(this, { game, x, y, width, height, damage, lifetime, sourcePoint });
        this.friendlyProjectile = friendly;
        this.id = ++PARAMS.SHOT_ID;
        this.updateBB();
    };

    updateBB() {
        this.hitBB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.BB = this.hitBB;
    };

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
        }
    };
};


class Projectile {

    static rotationList = [];

    constructor(game, x, y, radians, friendly, type, sourcePoint, damage, scale = PARAMS.PROJECTILE_SCALE, shotPattern = 0) {
        Object.assign(this, { game, x, y, radians, type, sourcePoint, damage, shotPattern, scale });
        this.roundedDegrees = Math.round(toDegrees(this.radians));
        this.roundedRadians = toRadians(this.roundedDegrees);
        this.spritesheet = ASSET_MANAGER.getAsset(PROJECTILES[this.type].spritesheet);
        this.friendlyProjectile = friendly;
        this.id = ++PARAMS.SHOT_ID;
        this.passable = false;
        this.velocityConstant = PROJECTILES[this.type].velocity;
        this.velocity = { x: Math.cos(this.roundedRadians) * this.velocityConstant, 
                          y: Math.sin(this.roundedRadians) * this.velocityConstant };
        this.lifetime = PROJECTILES[this.type].lifetime;
        this.maxLifetime = this.lifetime;
        if (!(Projectile.rotationList[this.type])) {
            Projectile.rotationList[this.type] = [];
        }
        this.originPoint = {x: this.x, y: this.y};
        this.vectorPoint = {x: this.x, y: this.y};
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        if (!(Projectile.rotationList[this.type][this.roundedDegrees])) {
            let flipCheck = this.roundedDegrees >= 90 && this.roundedDegrees < 270;
            let spritesheet = flipCheck ? flipImage(this.spritesheet, 0, 0, 32, 32, true) : this.spritesheet;
            Projectile.rotationList[this.type][this.roundedDegrees] = 
                rotateImage(spritesheet, 0, 0, 32, 32, flipCheck ? -(Math.PI - this.roundedRadians) : this.roundedRadians, this.scale);
        }
        this.animation = 
            new AnimationGroup(
                Projectile.rotationList[this.type][this.roundedDegrees], 0, 0, 32 * this.scale, 32 * this.scale, 1, 1, false, true);
    };

    turnAround() {
        this.radians += Math.PI;
        this.roundedDegrees = Math.round(toDegrees(this.radians));
        this.roundedRadians = toRadians(this.roundedDegrees);
        this.loadAnimations();
    };

    update() {
        this.lifetime -= this.game.clockTick;
        // if (this.lifetime <= 0) {
        //     this.removeFromWorld = true;
        // } else {
        //     this.x += this.velocity.x;
        //     this.y += this.velocity.y;
        //     this.updateBB();
        // }
        SHOT_PATTERNS[this.shotPattern](this);
        if (!this.removeFromWorld) {
            this.updateBB();
            this.game.collideableEntities.forEach(entity => {
                if (entity.projectile_collideable && this.hitBB.collide(entity.BB)) { 
                    this.removeFromWorld = true;
                }
            });
        }
        // this.game.collideableEntities.forEach(entity => {
        //     if (entity.projectile_collideable && this.hitBB.collide(entity.BB)) { 
        //         this.removeFromWorld = true;
        //     }
        // });
    };

    getLinearDestination() {
        let unitVel = unitVector(this.velocity);
        if (this.reverse) {
            unitVel.x *= -1;
            unitVel.y *= -1;
        }
        return {x: this.originPoint.x + unitVel.x * this.range, y: this.originPoint.y + unitVel.y * this.range};
    };

    updateVectorPoint() {
        this.vectorPoint.x += this.velocity.x;
        this.vectorPoint.y += this.velocity.y;
        return this.lifetime > 0;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * this.scale, 32 * this.scale);
        this.hitBB = new BoundingBox(this.BB.center.x + Math.cos(this.radians) * 10 * PARAMS.PROJECTILE_SCALE - 4 * this.scale, this.BB.center.y + Math.sin(this.radians) * 10 * PARAMS.PROJECTILE_SCALE - 4 * this.scale, 8 * this.scale, 8 * this.scale);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
        }
    };

};
