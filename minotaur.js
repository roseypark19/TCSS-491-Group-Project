class Minotaur {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/minotaur.png");
        this.facing = [0, randomInt(2)]; // down, up, right, left
                                         // 0, 1, 0, 1 
        this.state = 0; // idle, walking, attacking, damaged, dead
                        // 0, 1, 2, 3, 4
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 500;
        this.hp = this.maxHp;
        this.minProximity = 32 * 1.5;
        this.visionDistance = 400;
        this.shotsTaken = [];
        this.shootTimer = 0;
        this.attackTimer = 0;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.chargeTimer = 0;
        this.charging = false;
        this.velocityConstant = 3;
        this.walkSpeed = 0.15 * (4 / this.velocityConstant);
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.3, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 6, this.walkSpeed, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 88 * 32, 0, 32, 32, 8, 0.075, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 120 * 32, 0, 32, 32, 4, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 136 * 32, 0, 32, 32, 15, 0.15, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 11 * PARAMS.SCALE, this.y + 8 * PARAMS.SCALE, 10 * PARAMS.SCALE, 12 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 6 * PARAMS.SCALE, 10 * PARAMS.SCALE, 8 * PARAMS.SCALE);
    };

    update() {

        let prevState = this.state;
        this.originalCollisionBB = this.collisionBB;
        this.facing[0] = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;

        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        this.damagedTimer = Math.max(0, this.damagedTimer - this.game.clockTick);
        this.deadTimer = Math.max(0, this.deadTimer - this.game.clockTick);
        this.chargeTimer = Math.max(0, this.chargeTimer - this.game.clockTick);
        this.attackTimer = Math.max(0, this.attackTimer - this.game.clockTick);

        if (this.state !== 4) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile === true && this.hitBB.collide(entity.hitBB) && !(this.shotsTaken.includes(entity.id)) && this.state !== 4) {
                    this.shotsTaken.push(entity.id);
                    if (this.damagedTimer === 0 && this.deadTimer === 0) {
                        this.damagedTimer = 0.6 - this.game.clockTick;
                        this.state = 3;
                        this.charging = false;
                        this.attackTimer = 0;
                        this.hitUnitVector = prevState === 0 ? { x: 0, y: 0 } : 
                                                               unitVector({ x: this.hitBB.center.x - entity.sourcePoint.x, y: this.hitBB.center.y - entity.sourcePoint.y });
                    }
                    this.hp -= entity.damage;
                    // ASSET_MANAGER.playAsset("./audio/minotaur_ogre_hit.mp3");
                    if (this.deadTimer === 0 && this.hp <= 0) {
                        this.deadTimer = 15 * 0.15 - this.game.clockTick;
                        this.state = 4;
                        this.facing = [0, 0];
                        // ASSET_MANAGER.playAsset("./audio/minotaur_ogre_death.mp3");
                    }
                }
            });
        }

        if (this.state !== 4 && this.damagedTimer > 0) {
            this.velocity.x = this.hitUnitVector.x * this.velocityConstant;
            this.velocity.y = this.hitUnitVector.y * this.velocityConstant;
            this.facing[0] = this.hitUnitVector.y > 0 ? 1 : 0;
            this.facing[1] = this.hitUnitVector.x > 0 ? 1 : 0;
            this.movementUnitVector = undefined;
        }

        let heroCenter = null;

        if (this.state !== 4) {
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    heroCenter = entity.BB.center;
                    let dist = distance(this.BB.center, heroCenter);

                    if (dist <= this.visionDistance || this.charging) {
                        if (this.movementUnitVector === undefined || distance(heroCenter, this.destination) > this.minProximity) {
                            let center = this.BB.center;
                            let vector = { x : heroCenter.x - center.x, y : heroCenter.y - center.y };
                            let angle = Math.atan2(-vector.y, -vector.x);
                            if (angle < 0) {
                                angle += 2 * Math.PI;
                            }
                            let degrees = Math.round(toDegrees(angle));
                            let randomDegree = randomInt(181);
                            degrees = randomDegree >= 90 ? degrees + randomDegree - 90 : degrees - randomDegree;
                            let radians = toRadians(degrees)
                            let posUnitVector = unitVector({ x: Math.cos(radians), y: Math.sin(radians) });
                            let randomDist = randomInt(Math.round(this.minProximity * 0.5)) + Math.round(this.minProximity * 0.25);
                            this.destination = { x: heroCenter.x + randomDist * posUnitVector.x, 
                                                 y: heroCenter.y + randomDist * posUnitVector.y };
                            this.movementUnitVector = unitVector({ x: this.destination.x - center.x, y: this.destination.y - center.y });                    
                        }
                        if (this.damagedTimer === 0) {
                            if (!this.charging) {
                                this.charging = true;
                                this.chargeTimer = 1;
                                this.chargeOrigin = null;
                                this.animations[1].setFrameDuration(this.walkSpeed);
                            }
                            this.state = 1;
                            this.velocity.x = this.movementUnitVector.x * this.velocityConstant;
                            this.velocity.y = this.movementUnitVector.y * this.velocityConstant;
                        }
                    } else if (this.damagedTimer === 0 && this.attackTimer === 0) {
                        this.charging = false;
                        this.state = 0;
                        this.movementUnitVector = undefined;
                    }
                }
            });
        } else {
            if (this.deadTimer === 0) {
                this.removeFromWorld = true;
            }
        }

        if (this.state === 1 || (this.state !== 4 && this.attackTimer > 0)) {
            if ((distance(this.BB.center, heroCenter) <= this.minProximity && !this.chargeOrigin) || 
                (this.chargeOrigin && distance(this.chargeOrigin, this.BB.center) > this.chargeDistance) ||
                this.attackTimer > 0) {

                this.velocity.x = 0;
                this.velocity.y = 0;

                if (!this.attackFlag && prevState !== 3) {
                    this.attackTimer = 3 * 0.075 * 8;
                }
                this.charging = false;
                if (this.damagedTimer === 0 && this.attackTimer > 0) {
                    this.state = 2;
                }
                if (this.shootTimer === 0 && this.state === 2) {
                    this.shootTimer = 0.075 * 8 - this.game.clockTick;
                    let projectileCenter = { x: this.BB.center.x, y: this.BB.center.y };
                    if (this.attackFlag) {
                        // this.game.addEntity(new DamageRegion(this.game, 
                        //                                      projectileCenter.x - 12 * PARAMS.SCALE, 
                        //                                      projectileCenter.y - 12 * PARAMS.SCALE, 
                        //                                      24 * PARAMS.SCALE, 
                        //                                      24 * PARAMS.SCALE, 
                        //                                      false, 100, 0.1));
                    }
                }
            } else if (this.chargeTimer === 0 && this.damagedTimer === 0) {
                if (!this.chargeOrigin) {
                    this.chargeOrigin = this.BB.center;
                    // let randomAngle = toRadians(randomInt(361));
                    // randomAngle = randomAngle < 0 ? randomAngle + 2 * Math.PI : randomAngle;
                    // let unitVect = unitVector({ x: Math.cos(randomAngle), y: Math.sin(randomAngle) });
                    // let randomDist = randomInt(this.minProximity);
                    // let dest = { x: heroCenter.x + unitVect.x * randomDist, y: heroCenter.y + unitVect.y * randomDist };
                    this.chargeDistance = distance(this.destination, this.chargeOrigin);
                    this.chargeUnitVector = unitVector({ x: this.destination.x - this.BB.center.x, y: this.destination.y - this.BB.center.y });
                }
                this.velocity.x += this.chargeUnitVector.x * this.velocityConstant * 4;
                this.velocity.y += this.chargeUnitVector.y * this.velocityConstant * 4;
                this.animations[1].setFrameDuration(this.walkSpeed / 4);
                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
            } else {
                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
            }
        }

        this.attackFlag = this.state === 2;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        // collision detection and resolve
        let collisionList = [];
        this.game.collideableEntities.forEach(entity => {
            if (entity.collideable && this.collisionBB.collide(entity.BB)) { 
                collisionList.push(entity);
            }
        });

        if (collisionList.length > 0) {
            collisionList.sort((boundary1, boundary2) => distance(this.collisionBB.center, boundary1.BB.center) -
                                                         distance(this.collisionBB.center, boundary2.BB.center));
            for (let i = 0; i < collisionList.length; i++) {
                if (this.collisionBB.collide(collisionList[i].BB)) {
                    Collision.resolveCollision(this, collisionList[i]);
                    this.updateBB();
                }
            }
        }

        if (this.state !== prevState) {
            this.animations[prevState].reset();
        }
    };

    drawMmap(ctx) {
        ctx.fillStyle = "Red";
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX + 12 * PARAMS.MMAP_SCALE, 
                       this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY + 12 * PARAMS.MMAP_SCALE, 
                       8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
        ctx.fillRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX + 12 * PARAMS.MMAP_SCALE, 
                     this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY + 12 * PARAMS.MMAP_SCALE, 
                     8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(
            this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE, this.facing[0], this.facing[1]);

        if (this.hp > 0) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "Black";
            let percentage = this.hp / this.maxHp;
            if (percentage * 100 <= 25) {
                ctx.fillStyle = PARAMS.LOW_HP_COLOR;
            } else if (percentage * 100 >= 75) {
                ctx.fillStyle = PARAMS.HIGH_HP_COLOR;
            } else {
                ctx.fillStyle = PARAMS.MED_HP_COLOR;
            }
            ctx.fillRect(this.BB.center.x - 4 * PARAMS.SCALE - this.game.camera.x, 
                            this.hitBB.bottom - this.game.camera.y, 8 * PARAMS.SCALE * percentage, 1 * PARAMS.SCALE);
            ctx.strokeRect(this.BB.center.x - 4 * PARAMS.SCALE - this.game.camera.x, 
                            this.hitBB.bottom - this.game.camera.y, 8 * PARAMS.SCALE, 1 * PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
            ctx.strokeRect(this.collisionBB.x - this.game.camera.x, this.collisionBB.y - this.game.camera.y, this.collisionBB.width, this.collisionBB.height);
        }
    };
};