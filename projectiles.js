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

    constructor(game, x, y, radians, friendly, type, sourcePoint) {
        Object.assign(this, { game, x, y, radians, type, sourcePoint });
        this.roundedDegrees = Math.round(toDegrees(this.radians));
        this.roundedRadians = toRadians(this.roundedDegrees);
        this.spritesheet = ASSET_MANAGER.getAsset(PROJECTILES[this.type].spritesheet);
        this.friendlyProjectile = friendly;
        this.id = ++PARAMS.SHOT_ID;
        this.damage = 25;
        this.velocityConstant = 6;
        this.velocity = { x: Math.cos(this.roundedRadians) * this.velocityConstant, 
                          y: Math.sin(this.roundedRadians) * this.velocityConstant };
        this.lifetime = 1;
        if (!(Projectile.rotationList[this.type])) {
            Projectile.rotationList[this.type] = [];
        }
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        if (!(Projectile.rotationList[this.type][this.roundedDegrees])) {
            Projectile.rotationList[this.type][this.roundedDegrees] = 
                rotateImage(this.spritesheet, 0, 0, 32, 32, this.roundedRadians, PARAMS.SCALE);
        }
        this.animation = 
            new AnimationGroup(
                Projectile.rotationList[this.type][this.roundedDegrees], 0, 0, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE, 1, 1, false, true);
    };

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        } else {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.updateBB();
        }
        this.game.collideableEntities.forEach(entity => {
            if (entity.collideable && this.hitBB.collide(entity.BB)) { 
                this.removeFromWorld = true;
            }
        });
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        let hitCenter = { x: this.BB.center.x + Math.cos(this.roundedRadians) * 14 * PARAMS.SCALE,
                          y: this.BB.center.y + Math.sin(this.roundedRadians) * 14 * PARAMS.SCALE };
        this.hitBB = new BoundingBox(hitCenter.x - 2 * PARAMS.SCALE, hitCenter.y - 2 * PARAMS.SCALE, 4 * PARAMS.SCALE, 4 * PARAMS.SCALE);
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