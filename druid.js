class DruidBeam {

    static rotationList = [];
    static elapsedTime = 0;

    constructor(game, x, y, radians, velocity, lifetime = PROJECTILE_LIFETIMES.long) {
        Object.assign(this, { game, x, y, radians, lifetime });
        this.roundedDegrees = Math.round(toDegrees(this.radians));
        this.roundedRadians = toRadians(this.roundedDegrees);
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/druid_beam.png");
        this.friendlyProjectile = false;
        this.damage = 75;
        this.id = ++PARAMS.SHOT_ID;
        this.velocityConstant = velocity;
        this.velocity = { x: Math.cos(this.roundedRadians) * this.velocityConstant, 
                          y: Math.sin(this.roundedRadians) * this.velocityConstant };
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        if (!(ElementBeam.rotationList[this.roundedDegrees])) {
            Projectile.rotationList[this.roundedDegrees] = 
                createSpritesheet(this.getRotatedFrames(), 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        }
        this.animations.push(
            new AnimationGroup(
                Projectile.rotationList[this.roundedDegrees], 0, 0, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE, 4, 0.1, false, true));
    };

    getRotatedFrames() {
        let frames = [];
        let flipCheck = this.roundedDegrees >= 90 && this.roundedDegrees < 270;
        let spritesheet = flipCheck ? flipImage(this.spritesheet, 0, 0, 32 * 4, 32, true) : this.spritesheet;
        if (flipCheck) {
            for (let i = 3; i >= 0; i--) {
                frames[3 - i] = rotateImage(spritesheet, 32 * i, 0, 32, 32, -(Math.PI - this.roundedRadians), PARAMS.SCALE);
            }
        } else {
            for (let i = 0; i <= 3; i++) {
                frames[i] = rotateImage(spritesheet, 32 * i, 0, 32, 32, this.roundedRadians, PARAMS.SCALE);
            }
        }
        return frames;
    };

    update() {
        this.lifetime = Math.max(0, this.lifetime - this.game.clockTick);

        if (this.lifetime === 0) {
            this.removeFromWorld = true;
        } else {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        this.updateBB();

        this.game.collideableEntities.forEach(entity => {
            if (entity.collideable && this.hitBB.collide(entity.BB)) { 
                this.removeFromWorld = true;
            }
        });
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 14 * PARAMS.SCALE, this.y + 14 * PARAMS.SCALE, 6 * PARAMS.SCALE, 6 * PARAMS.SCALE);
    };

    draw(ctx) {
        this.animations[0].elapsedTime = DruidBeam.elapsedTime;
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
        }
    };
};

class DruidBird {
    constructor(game, x, y, hp, threshold) {
        Object.assign(this, { game, x, y, hp, threshold });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/druid_bird.png");
        this.origin = { x: this.x, y: this.y };
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.state = 0; // idle, attacking, damaged, dead
                        // 0, 1, 2, 3
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 6000;
        this.minProximity = 5;
        this.visionDistance = 450;
        this.attackDistance = 350;
        this.shotsTaken = [];
        this.shootTimer = 0;
        this.shootFlag = false;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.frozenTimer = 0;
        this.slowedTimer = 0;
        this.burningTimer = 0;
        this.burnDamageTimer = 0;
        this.confusedTimer = 0;
        this.velocityConstant = 3;
        this.walkSpeed = 0.1 * (4 / this.velocityConstant);
        this.velocity = { x: 0, y: 0 };
        this.fireTheta = 0;
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 2, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 8 * 32, 0, 32, 32, 4, this.walkSpeed, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 24 * 32, 0, 32, 32, 4, 0.15, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 12 * PARAMS.SCALE, this.y + 12 * PARAMS.SCALE, 8 * PARAMS.SCALE, 8 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 4 * PARAMS.SCALE, 8 * PARAMS.SCALE, 6 * PARAMS.SCALE);
    };

    update() {

        let prevState = this.state;
        this.originalCollisionBB = this.collisionBB;
        if (this.burningTimer === 0 && this.burnDamageTimer === 0) {
            this.facing[0] = 0;
        } 
        this.velocity.x = 0;
        this.velocity.y = 0;

        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        this.damagedTimer = Math.max(0, this.damagedTimer - this.game.clockTick);
        this.deadTimer = Math.max(0, this.deadTimer - this.game.clockTick);

        this.frozenTimer = Math.max(0, this.frozenTimer - this.game.clockTick);
        this.slowedTimer = Math.max(0, this.slowedTimer - this.game.clockTick);
        this.burningTimer = Math.max(0, this.burningTimer - this.game.clockTick);
        this.burnDamageTimer = Math.max(0, this.burnDamageTimer - this.game.clockTick);
        this.confusedTimer = Math.max(0, this.confusedTimer - this.game.clockTick);

        let rootChance = randomInt(2000) === 0;
        if (rootChance) {
            this.state = 3;
        }

        if (this.state !== 3 && !this.originReached) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile && this.hitBB.collide(entity.hitBB) && 
                    (!(entity.passable || entity.removeFromWorld) || (entity.passable && !(this.shotsTaken.includes(entity.id)))) && this.state !== 3) {
                    if (entity.passable) {
                        this.shotsTaken.push(entity.id);
                    } else {
                        entity.removeFromWorld = true;
                    }  
                    this.frozenTimer = 0; 
                    this.hp = Math.max(this.threshold, this.hp - entity.damage);
                    // ASSET_MANAGER.playAsset("./audio/slime_hit.mp3");
                    if (entity.elemental) {
                        switch(entity.type) {
                            case 0: // wind
                                this.confusedTimer = 5 - this.game.clockTick;
                                let randomTheta = toRadians(randomInt(361));
                                this.confusionUnitVector = unitVector({ x: Math.cos(randomTheta), y: Math.sin(randomTheta) });
                                break;
                            case 1: // fire
                                this.burningTimer = 5 - this.game.clockTick;
                                this.burnDamageTimer = 1 - this.game.clockTick;
                                break;
                            case 2: // ice
                                this.frozenTimer = 5 - this.game.clockTick;
                                break;
                            case 3: // earth
                                this.slowedTimer = 5 - this.game.clockTick;
                                break;
                        }   
                    }
                    if (this.hp <= this.threshold) {
                        this.state = 3;
                    }
                }
            });
        }

        if (this.state !== 3 && !this.originReached && this.burningTimer > 0 && this.burnDamageTimer === 0 && !PARAMS.GAMEOVER) {
            this.burnDamageTimer = 1 - this.game.clockTick;
            this.hp = Math.max(this.threshold, this.hp - 25);
            // play damaged sound
            if (this.damagedTimer === 0) {
                this.damagedTimer = 0.6 - this.game.clockTick;
                this.state = 2;
            }
            if (this.hp <= this.threshold) {
                this.state = 3;
            }
        }

        this.animations[1].setFrameDuration(this.slowedTimer > 0 && this.state !== 3 ? this.walkSpeed * 3 : this.walkSpeed);

        let heroCenter;
        if (this.state !== 3 && !this.originReached) {
            let center = this.BB.center;
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    heroCenter = entity.BB.center;
                    let dist = distance(center, heroCenter);
                    if (dist <= this.visionDistance && !PARAMS.GAMEOVER) {
                        let vector = { x : heroCenter.x - center.x, y : heroCenter.y - center.y };
                        let heroDirectionUnitVector = unitVector(vector);
                        let movementDirectionUnitVector = heroDirectionUnitVector;
                        if ((this.randomPos === undefined || distance(this.randomPos, heroCenter) > 0.75 * this.attackDistance) && this.damagedTimer === 0) {
                            let angle = Math.atan2(-vector.y, -vector.x);
                            if (angle < 0) {
                                angle += 2 * Math.PI;
                            }
                            let degrees = Math.round(toDegrees(angle));
                            let randomDegree = randomInt(181);
                            degrees = randomDegree >= 90 ? degrees + randomDegree - 90 : degrees - randomDegree;
                            let radians = toRadians(degrees)
                            let posUnitVector = unitVector({ x: Math.cos(radians), y: Math.sin(radians) });
                            let randomDist = randomInt(Math.round(this.attackDistance * 0.5)) + Math.round(this.attackDistance * 0.25)
                            this.randomPos = { x: heroCenter.x + randomDist * posUnitVector.x, 
                                               y: heroCenter.y + randomDist * posUnitVector.y };
                            this.randomPosUnitVector = unitVector({ x: this.randomPos.x - center.x, y: this.randomPos.y - center.y });
                        } 
                        if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                            this.state = 1;
                            console.log("setting state to 1")
                        }
                        if (dist <= this.attackDistance) {
                            if (this.shootTimer === 0 && this.state === 1 && this.frozenTimer === 0) {
                                this.shootTimer = 0.95 * this.walkSpeed - this.game.clockTick;
                                let projectileCenter = { x: this.BB.center.x + 6 * PARAMS.SCALE * heroDirectionUnitVector.x,
                                                         y: this.BB.center.y + 6 * PARAMS.SCALE * heroDirectionUnitVector.y };
                                if (this.shootFlag) {
                                    for (let i = this.fireTheta; i < this.fireTheta + 2 * Math.PI; i += Math.PI / 4) {
                                        this.game.addEntity(new DruidBeam(this.game, this.x, this.y, i, 8));
                                    }

                                    this.fireTheta += Math.PI / 180 * 5;
                                }  
                            }
                        }
                        if (this.randomPos !== undefined) {
                            movementDirectionUnitVector = this.randomPosUnitVector;
                            dist = distance(center, this.randomPos);
                        }
                        if (dist > this.minProximity && this.damagedTimer === 0 && this.frozenTimer === 0) {
                            if (this.confusedTimer > 0) {
                                this.velocity.x = this.confusionUnitVector.x * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                                this.velocity.y = this.confusionUnitVector.y * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                            } else {
                                this.velocity.x = movementDirectionUnitVector.x * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                                this.velocity.y = movementDirectionUnitVector.y * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                            } 
                        }
                        if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                            if (this.randomPos !== undefined && this.state === 1) {
                                if (this.confusedTimer > 0) {
                                    this.facing[0] = this.confusionUnitVector.y >= 0 ? 0 : 1;
                                    this.facing[1] = this.confusionUnitVector.x >= 0 ? 0 : 1;
                                } else {
                                    this.facing[0] = heroDirectionUnitVector.y >= 0 ? 0 : 1;
                                    this.facing[1] = heroDirectionUnitVector.x >= 0 ? 0 : 1;
                                }
                            } else {
                                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
                            }  
                        }      
                    }  else if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                        this.state = 0;
                        this.facing[0] = 0;
                        this.randomPos = undefined;
                        this.confusedTimer = 0;
                        this.fireTheta = 0;
                    } 
                }
            });
        } else {
            let distFromOrigin = distance({ x: this.x, y: this.y }, this.origin);
            if (distFromOrigin === 0) {
                this.state = 0;
                this.facing = [0, 0];
                let flag = this.originReached;
                this.originReached = true;
                if (!flag) {
                    this.deadTimer = 2 - this.game.clockTick;
                }
                if (this.deadTimer === 0) {
                    this.removeFromWorld = true;
                    this.game.addEntity(new Druid(this.game, this.x, this.y, this.hp, 1));
                }
            } else {
                let originUnitVect = unitVector({ x: this.origin.x - this.x, y: this.origin.y - this.y });
                let dist = Math.min(distFromOrigin, this.velocityConstant);
                this.velocity.x = originUnitVect.x * dist;
                this.velocity.y = originUnitVect.y * dist;
                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
            }
        }

        this.shootFlag = this.state === 1;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        // collision detection and resolve
        let collisionList = [];
        if (this.state !== 3 && !this.originReached) {
            this.game.collideableEntities.forEach(entity => {
                if (entity.collideable && this.collisionBB.collide(entity.BB)) { 
                    collisionList.push(entity);
                }
            });
        }

        if (collisionList.length > 0) {
            this.collisionFlag = true;
            collisionList.sort((boundary1, boundary2) => distance(this.collisionBB.center, boundary1.BB.center) -
                                                         distance(this.collisionBB.center, boundary2.BB.center));
            let velCopy = { x: this.velocity.x, y: this.velocity.y };
            for (let i = 0; i < collisionList.length; i++) {
                if (this.collisionBB.collide(collisionList[i].BB)) {
                    Collision.resolveCollision(this, collisionList[i]);
                    this.updateBB();
                }
            }
            if (heroCenter && !this.validateRegionalTrajectory(heroCenter, velCopy)) {
                this.randomPos = undefined;
            }  
        } else if (this.collisionFlag) {
            this.collisionFlag = false;
            this.randomPos = undefined;
        }

        if (this.state !== prevState && !this.originReached) {
            this.animations[prevState].reset();
        }
    };

    validateRegionalTrajectory(heroCenter, trajectory) {
        return circleCollide({ x: heroCenter.x, y: heroCenter.y, radius: 0.75 * this.attackDistance }, 
            { pt1: this.BB.center, pt2: { x: this.BB.center.x + trajectory.x, y: this.BB.center.y + trajectory.y }}) !== false;
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
        this.animations[this.state === 3 ? 1 : this.state].drawFrame(
            this.frozenTimer > 0 && this.damagedTimer === 0 && this.state !== 3 ? 0 : this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE, this.facing[0], this.facing[1]);

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

class DruidHound {

    constructor(game, x, y, hp, threshold) {
        Object.assign(this, { game, x, y, hp, threshold });
        this.origin = { x: this.x, y: this.y };
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/druid_hound.png");
        this.facing = [0, randomInt(2)]; // down, up, right, left
                                         // 0, 1, 0, 1 
        this.state = 0; // idle, walking, attacking, damaged, dead
                        // 0, 1, 2, 3, 4
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 6000;
        this.minProximity = 5;
        this.visionDistance = 400;
        this.attackDistance = 250;
        this.shotsTaken = [];
        this.shootTimer = 0;
        this.shootFlag = false;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.frozenTimer = 0;
        this.slowedTimer = 0;
        this.burningTimer = 0;
        this.burnDamageTimer = 0;
        this.confusedTimer = 0;
        this.velocityConstant = 3;
        this.walkSpeed = this.velocityConstant > 4 ? 0.15 * (4 / this.velocityConstant) : 0.15 / (4 / this.velocityConstant);
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 12, 0.2, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 48 * 32, 0, 32, 32, 4, this.walkSpeed, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 4, 0.10, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 80 * 32, 0, 32, 32, 4, 0.15, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 11 * PARAMS.SCALE, this.y + 10 * PARAMS.SCALE, 10 * PARAMS.SCALE, 10 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 5 * PARAMS.SCALE, this.hitBB.width, this.hitBB.height / 2 + 2 * PARAMS.SCALE);
    };

    update() {

        let prevState = this.state;
        this.originalCollisionBB = this.collisionBB;
        if (this.burningTimer === 0 && this.burnDamageTimer === 0) {
            this.facing[0] = 0;
        } 
        this.velocity.x = 0;
        this.velocity.y = 0;

        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        this.damagedTimer = Math.max(0, this.damagedTimer - this.game.clockTick);
        this.deadTimer = Math.max(0, this.deadTimer - this.game.clockTick);

        this.frozenTimer = Math.max(0, this.frozenTimer - this.game.clockTick);
        this.slowedTimer = Math.max(0, this.slowedTimer - this.game.clockTick);
        this.burningTimer = Math.max(0, this.burningTimer - this.game.clockTick);
        this.burnDamageTimer = Math.max(0, this.burnDamageTimer - this.game.clockTick);
        this.confusedTimer = Math.max(0, this.confusedTimer - this.game.clockTick);

        let rootChance = randomInt(1000) === 0;
        if (rootChance) {
            this.state = 4;
        }

        if (this.state !== 4 && !this.originReached) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile && this.hitBB.collide(entity.hitBB) && 
                    (!(entity.passable || entity.removeFromWorld) || (entity.passable && !(this.shotsTaken.includes(entity.id)))) && this.state !== 4) {
                    if (entity.passable) {
                        this.shotsTaken.push(entity.id);
                    } else {
                        entity.removeFromWorld = true;
                    }    
                    this.frozenTimer = 0;
                    this.hp = Math.max(this.threshold, this.hp - entity.damage);
                    // ASSET_MANAGER.playAsset("./audio/minotaur_ogre_hit.mp3");
                    if (entity.elemental) {
                        switch(entity.type) {
                            case 0: // wind
                                this.confusedTimer = 5 - this.game.clockTick;
                                let randomTheta = toRadians(randomInt(361));
                                this.confusionUnitVector = unitVector({ x: Math.cos(randomTheta), y: Math.sin(randomTheta) });
                                break;
                            case 1: // fire
                                this.burningTimer = 5 - this.game.clockTick;
                                this.burnDamageTimer = 1 - this.game.clockTick;
                                break;
                            case 2: // ice
                                this.frozenTimer = 5 - this.game.clockTick;
                                break;
                            case 3: // earth
                                this.slowedTimer = 5 - this.game.clockTick;
                                break;
                        }   
                    }
                    if (this.hp <= this.threshold) {
                        this.state = 4;
                    }
                }
            });
        }

        if (this.state !== 4 && !this.originReached &&  this.burningTimer > 0 && this.burnDamageTimer === 0 && !PARAMS.GAMEOVER) {
            this.burnDamageTimer = 1 - this.game.clockTick;
            this.hp = Math.max(this.threshold, this.hp - 25);
            // play damaged sound
            if (this.damagedTimer === 0) {
                this.damagedTimer = 0.6 - this.game.clockTick;
                this.state = 3;
            }
            if (this.hp <= this.threshold) {
                this.state = 4;
            }
        }

        this.animations[1].setFrameDuration(this.slowedTimer > 0 && this.state !== 4 ? this.walkSpeed * 3 : this.walkSpeed);

        let heroCenter;
        if (this.state !== 4 && !this.originReached) {
            let center = this.BB.center;
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    heroCenter = entity.BB.center;
                    let dist = distance(center, heroCenter);
                    if (dist <= this.visionDistance && !PARAMS.GAMEOVER) {
                        let vector = { x : heroCenter.x - center.x, y : heroCenter.y - center.y };
                        let heroDirectionUnitVector = unitVector(vector);
                        let movementDirectionUnitVector = heroDirectionUnitVector;
                        if ((this.randomPos === undefined || distance(this.randomPos, heroCenter) > 0.75 * this.attackDistance) && this.damagedTimer === 0) {
                            let angle = Math.atan2(-vector.y, -vector.x);
                            if (angle < 0) {
                                angle += 2 * Math.PI;
                            }
                            let degrees = Math.round(toDegrees(angle));
                            let randomDegree = randomInt(181);
                            degrees = randomDegree >= 90 ? degrees + randomDegree - 90 : degrees - randomDegree;
                            let radians = toRadians(degrees);
                            let posUnitVector = unitVector({ x: Math.cos(radians), y: Math.sin(radians) });
                            let randomDist = randomInt(Math.round(this.attackDistance * 0.5)) + Math.round(this.attackDistance * 0.25);
                            this.randomPos = { x: heroCenter.x + randomDist * posUnitVector.x, 
                                               y: heroCenter.y + randomDist * posUnitVector.y };
                            this.randomPosUnitVector = unitVector({ x: this.randomPos.x - center.x, y: this.randomPos.y - center.y });
                        }     
                        if (dist <= this.attackDistance && this.frozenTimer === 0) {       
                            if (this.damagedTimer === 0) {
                                this.state = 2;
                            }
                            if (this.shootTimer === 0 && this.state === 2) {
                                this.shootTimer = 0.10 * 4 - this.game.clockTick;
                                if (this.shootFlag) {
                                    let theta = this.confusedTimer > 0 ? Math.atan2(this.confusionUnitVector.y, this.confusionUnitVector.x) : Math.atan2(heroDirectionUnitVector.y, heroDirectionUnitVector.x);
                                    if (theta < 0) {
                                        theta += 2 * Math.PI;
                                    }
                                    for (let i = theta - Math.PI / 4; i <= theta + Math.PI / 4; i += 18 * Math.PI / 180) {
                                        this.game.addEntity(new DruidBeam(this.game, this.x, this.y, i, 6));
                                    }
                                }
                            }
                        } else if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                            this.state = 1;
                        }
                        if (this.randomPos !== undefined) {
                            movementDirectionUnitVector = this.randomPosUnitVector;
                            dist = distance(center, this.randomPos);
                        }
                        if (dist > this.minProximity && this.damagedTimer === 0 && this.frozenTimer === 0) {
                            if (this.confusedTimer > 0) {
                                this.velocity.x = this.confusionUnitVector.x * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                                this.velocity.y = this.confusionUnitVector.y * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                            } else {
                                this.velocity.x = movementDirectionUnitVector.x * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                                this.velocity.y = movementDirectionUnitVector.y * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                            }  
                        }
                        if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                            if (this.randomPos !== undefined && this.state === 2) {
                                if (this.confusedTimer > 0) {
                                    this.facing[0] = this.confusionUnitVector.y >= 0 ? 0 : 1;
                                    this.facing[1] = this.confusionUnitVector.x >= 0 ? 0 : 1;
                                } else {
                                    this.facing[0] = heroDirectionUnitVector.y >= 0 ? 0 : 1;
                                    this.facing[1] = heroDirectionUnitVector.x >= 0 ? 0 : 1;
                                }
                            } else {
                                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
                            }  
                        }
                    } else if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                        this.state = 0;
                        this.facing[0] = 0;
                        this.randomPos = undefined;
                        this.confusedTimer = 0;
                    }
                }
            });
        } else {
            let distFromOrigin = distance({ x: this.x, y: this.y }, this.origin);
            if (distFromOrigin === 0) {
                this.state = 0;
                this.facing = [0, 0];
                let flag = this.originReached;
                this.originReached = true;
                if (!flag) {
                    this.deadTimer = 2 - this.game.clockTick;
                }
                if (this.deadTimer === 0) {
                    this.removeFromWorld = true;
                    this.game.addEntity(new Druid(this.game, this.x, this.y, this.hp, 2));
                }
            } else {
                let originUnitVect = unitVector({ x: this.origin.x - this.x, y: this.origin.y - this.y });
                let dist = Math.min(distFromOrigin, this.velocityConstant);
                this.velocity.x = originUnitVect.x * dist;
                this.velocity.y = originUnitVect.y * dist;
                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
            }
        }

        this.shootFlag = this.state === 2;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        // collision detection and resolve
        let collisionList = [];
        if (this.state !== 4 && !this.originReached) {
            this.game.collideableEntities.forEach(entity => {
                if (entity.collideable && this.collisionBB.collide(entity.BB)) { 
                    collisionList.push(entity);
                }
            });
        }

        if (collisionList.length > 0) {
            this.collisionFlag = true;
            collisionList.sort((boundary1, boundary2) => distance(this.collisionBB.center, boundary1.BB.center) -
                                                         distance(this.collisionBB.center, boundary2.BB.center));
            let velCopy = { x: this.velocity.x, y: this.velocity.y };
            for (let i = 0; i < collisionList.length; i++) {
                if (this.collisionBB.collide(collisionList[i].BB)) {
                    Collision.resolveCollision(this, collisionList[i]);
                    this.updateBB();
                }
            }
            if (heroCenter && !this.validateRegionalTrajectory(heroCenter, velCopy)) {
                this.randomPos = undefined;
            }  
        } else if (this.collisionFlag) {
            this.collisionFlag = false;
            this.randomPos = undefined;
        }

        if (this.state !== prevState && !this.originReached) {
            this.animations[prevState].reset();
        }
    };

    validateRegionalTrajectory(heroCenter, trajectory) {
        return circleCollide({ x: heroCenter.x, y: heroCenter.y, radius: 0.75 * this.attackDistance }, 
            { pt1: this.BB.center, pt2: { x: this.BB.center.x + trajectory.x, y: this.BB.center.y + trajectory.y }}) !== false;
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
        this.animations[this.state === 4 ? 1 : this.state].drawFrame(
            this.frozenTimer > 0 && this.damagedTimer === 0 && this.state !== 4 ? 0 : this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE, this.facing[0], this.facing[1]);

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

class DruidBeast {

    constructor(game, x, y, hp, threshold) {
        Object.assign(this, { game, x, y, hp, threshold });
        this.origin = { x: this.x, y: this.y };
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/druid_beast.png");
        this.facing = [0, randomInt(2)]; // down, up, right, left
                                         // 0, 1, 0, 1 
        this.state = 0; // idle, walking, attacking, damaged, dead
                        // 0, 1, 2, 3, 4
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 6000;
        this.minProximity = 32 * 1.5;
        this.visionDistance = 400;
        this.shotsTaken = [];
        this.shootTimer = 0;
        this.attackTimer = 0;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.chargeTimer = 0;
        this.charging = false;
        this.frozenTimer = 0;
        this.slowedTimer = 0;
        this.burningTimer = 0;
        this.burnDamageTimer = 0;
        this.confusedTimer = 0;
        this.velocityConstant = 4;
        this.walkSpeed = 0.1 * (4 / this.velocityConstant);
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 11, 0.2, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 44 * 32, 0, 32, 32, 6, this.walkSpeed, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 68 * 32, 0, 32, 32, 5, 0.075, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 88 * 32, 0, 32, 32, 4, 0.15, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 11 * PARAMS.SCALE, this.y + 8 * PARAMS.SCALE, 10 * PARAMS.SCALE, 12 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 6 * PARAMS.SCALE, 10 * PARAMS.SCALE, 8 * PARAMS.SCALE);
    };

    update() {

        let prevState = this.state;
        this.originalCollisionBB = this.collisionBB;
        if (this.burningTimer === 0 && this.burnDamageTimer === 0 && !this.charging) {
            this.facing[0] = 0;
        } 
        this.velocity.x = 0;
        this.velocity.y = 0;

        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        this.damagedTimer = Math.max(0, this.damagedTimer - this.game.clockTick);
        this.deadTimer = Math.max(0, this.deadTimer - this.game.clockTick);
        this.chargeTimer = Math.max(0, this.chargeTimer - this.game.clockTick);
        this.attackTimer = Math.max(0, this.attackTimer - this.game.clockTick);

        this.frozenTimer = Math.max(0, this.frozenTimer - this.game.clockTick);
        this.slowedTimer = Math.max(0, this.slowedTimer - this.game.clockTick);
        this.burningTimer = Math.max(0, this.burningTimer - this.game.clockTick);
        this.burnDamageTimer = Math.max(0, this.burnDamageTimer - this.game.clockTick);
        this.confusedTimer = Math.max(0, this.confusedTimer - this.game.clockTick);

        let rootChance = randomInt(500) === 0;
        if (rootChance) {
            this.state = 4;
        }

        if (this.state !== 4 ) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile && this.hitBB.collide(entity.hitBB) && 
                    (!(entity.passable || entity.removeFromWorld) || (entity.passable && !(this.shotsTaken.includes(entity.id)))) && this.state !== 4) {
                    if (entity.passable) {
                        this.shotsTaken.push(entity.id);
                    } else {
                        entity.removeFromWorld = true;
                    }   
                    this.frozenTimer = 0;
                    this.hp = Math.max(this.threshold, this.hp - entity.damage);
                    // ASSET_MANAGER.playAsset("./audio/minotaur_ogre_hit.mp3");
                    if (entity.elemental) {
                        switch(entity.type) {
                            case 0: // wind
                                this.confusedTimer = 5 - this.game.clockTick;
                                let randomTheta = toRadians(randomInt(361));
                                this.confusionUnitVector = unitVector({ x: Math.cos(randomTheta), y: Math.sin(randomTheta) });
                                break;
                            case 1: // fire
                                this.burningTimer = 5 - this.game.clockTick;
                                this.burnDamageTimer = 1 - this.game.clockTick;
                                break;
                            case 2: // ice
                                this.frozenTimer = 5 - this.game.clockTick;
                                break;
                            case 3: // earth
                                this.slowedTimer = 5 - this.game.clockTick;
                                break;
                        }   
                    }
                    if (this.hp <= this.threshold) {
                        this.state = 4;
                        // ASSET_MANAGER.playAsset("./audio/minotaur_ogre_death.mp3");
                    }
                }
            });
        }

        if (this.state !== 4 && !this.originReached && this.burningTimer > 0 && this.burnDamageTimer === 0 && !PARAMS.GAMEOVER) {
            this.burnDamageTimer = 1 - this.game.clockTick;
            this.hp = Math.max(this.threshold, this.hp - 25);
            // play damaged sound
            if (this.damagedTimer === 0) {
                this.damagedTimer = 0.6 - this.game.clockTick;
                this.state = 3;
                this.charging = false;
            }
            if (this.hp <= 0) {
                this.state = 4;
            }
        }

        let heroCenter = null;

        if (this.state !== 4 && !this.originReached) {
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    heroCenter = entity.BB.center;
                    let dist = distance(this.BB.center, heroCenter);

                    if ((dist <= this.visionDistance || this.charging) && !PARAMS.GAMEOVER) {
                        if ((this.movementUnitVector === undefined || (this.confusedTimer === 0 && distance(heroCenter, this.destination) > this.minProximity)) && this.damagedTimer === 0) {
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
                            if (this.confusedTimer > 0) {
                                randomDist = randomInt(Math.round(this.visionDistance * 0.5)) + Math.round(this.visionDistance * 0.5);
                                this.destination = { x: center.x + randomDist * this.confusionUnitVector.x, 
                                                     y: center.y + randomDist * this.confusionUnitVector.y };
                            } else {
                                this.destination = { x: heroCenter.x + randomDist * posUnitVector.x, 
                                                     y: heroCenter.y + randomDist * posUnitVector.y };
                            }
                            this.movementUnitVector = unitVector({ x: this.destination.x - center.x, y: this.destination.y - center.y });             
                        }
                        if (this.damagedTimer === 0 && this.frozenTimer === 0) {
                            if (!this.charging) {
                                this.charging = true;
                                this.chargeTimer = 1;
                                this.chargeOrigin = null;

                                this.animations[1].setFrameDuration(this.slowedTimer > 0 ? this.walkSpeed * 3 : this.walkSpeed);
                            }
                            this.state = 1;
                            this.velocity.x = this.movementUnitVector.x * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);
                            this.velocity.y = this.movementUnitVector.y * (this.slowedTimer > 0 ? this.velocityConstant / 3 : this.velocityConstant);

                        }
                    } else if (this.damagedTimer === 0 && this.attackTimer === 0 && this.frozenTimer === 0) {
                        this.charging = false;
                        this.state = 0;
                        this.facing[0] = 0;
                        this.movementUnitVector = undefined;
                        this.confusedTimer = 0;
                    }
                }
            });
        } else {
            let distFromOrigin = distance({ x: this.x, y: this.y }, this.origin);
            if (distFromOrigin === 0) {
                this.state = 0;
                this.facing = [0, 0];
                let flag = this.originReached;
                this.originReached = true;
                if (!flag) {
                    this.deadTimer = 2 - this.game.clockTick;
                }
                if (this.deadTimer === 0) {
                    this.removeFromWorld = true;
                    this.game.addEntity(new Druid(this.game, this.x, this.y, this.hp, 3));
                }
            } else {
                let originUnitVect = unitVector({ x: this.origin.x - this.x, y: this.origin.y - this.y });
                let dist = Math.min(distFromOrigin, this.velocityConstant);
                this.velocity.x = originUnitVect.x * dist;
                this.velocity.y = originUnitVect.y * dist;
                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
            }
        }

        if (this.state === 1 || (this.state !== 4 && !this.originReached && this.attackTimer > 0) && this.frozenTimer === 0) {
            let interestPt = this.confusedTimer > 0 && this.state !== 0 ? this.destination : heroCenter;
            if ((distance(this.BB.center, interestPt) <= this.minProximity && !this.chargeOrigin) || 
                (this.chargeOrigin && distance(this.chargeOrigin, this.BB.center) > this.chargeDistance) ||
                this.attackTimer > 0) {

                this.velocity.x = 0;
                this.velocity.y = 0;

                if (!this.attackFlag && prevState !== 3) {
                    this.attackTimer = 5 * 0.075 * 5;
                }
                this.charging = false;
                if (this.damagedTimer === 0 && this.attackTimer > 0) {
                    this.state = 2;
                }
                if (this.shootTimer === 0 && this.state === 2) {
                    this.shootTimer = 0.075 * 5 - this.game.clockTick;
                    let projectileCenter = { x: this.BB.center.x, y: this.BB.center.y };
                    if (this.attackFlag) {
                        for (let i = 0; i < 2 * Math.PI; i += Math.PI / 8) {
                            this.game.addEntity(new DruidBeam(this.game, this.x, this.y, i, 10));
                        }
                    }
                }
            } else if (this.chargeTimer === 0 && this.damagedTimer === 0) {
                if (!this.chargeOrigin) {
                    this.chargeOrigin = this.BB.center;
                    this.chargeDistance = distance(this.destination, this.chargeOrigin);
                    this.chargeUnitVector = unitVector({ x: this.destination.x - this.BB.center.x, y: this.destination.y - this.BB.center.y });
                }

                this.velocity.x = this.chargeUnitVector.x * (this.slowedTimer > 0 ? this.velocityConstant * 3 / 3 : this.velocityConstant * 3);
                this.velocity.y = this.chargeUnitVector.y * (this.slowedTimer > 0 ? this.velocityConstant * 3 / 3 : this.velocityConstant * 3);

                this.animations[1].setFrameDuration(this.slowedTimer > 0 ? this.walkSpeed / (3/3) : this.walkSpeed / 3);
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
        if (this.state !== 4 && !this.originReached) {
            this.game.collideableEntities.forEach(entity => {
                if (entity.collideable && this.collisionBB.collide(entity.BB)) { 
                    collisionList.push(entity);
                }
            });
        }

        if (collisionList.length > 0) {
            this.collisionFlag = true;
            this.charging = false;
            collisionList.sort((boundary1, boundary2) => distance(this.collisionBB.center, boundary1.BB.center) -
                                                         distance(this.collisionBB.center, boundary2.BB.center));
            let velCopy = { x: this.velocity.x, y: this.velocity.y };
            for (let i = 0; i < collisionList.length; i++) {
                if (this.collisionBB.collide(collisionList[i].BB)) {
                    Collision.resolveCollision(this, collisionList[i]);
                    this.updateBB();
                }
            }
            if (heroCenter && !this.validateRegionalTrajectory(heroCenter, velCopy)) {
                this.movementUnitVector = undefined;
            }  
        } else if (this.collisionFlag) {
            this.collisionFlag = false;
            this.movementUnitVector = undefined;
            this.charging = false;
        }

        if (this.state !== prevState && !this.originReached) {
            this.animations[prevState].reset();
        }
    };

    validateRegionalTrajectory(heroCenter, trajectory) {
        return circleCollide({ x: heroCenter.x, y: heroCenter.y, radius: this.minProximity }, 
            { pt1: this.BB.center, pt2: { x: this.BB.center.x + trajectory.x, y: this.BB.center.y + trajectory.y }}) !== false;
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
        this.animations[this.state === 4 ? 1 : this.state].drawFrame(
            this.frozenTimer > 0 && this.damagedTimer === 0 && this.state !== 4 ? 0 : this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE, this.facing[0], this.facing[1]);

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

class Druid {

    constructor(game, x, y, hp, phase) {
        Object.assign(this, { game, x, y, hp, phase });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/druid.png");
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 6000;
        this.visionDistance = 50;
        this.activated = this.phase !== 0;
        this.activationTimer = 0;
        this.rootsTimer = 0;
        this.rootsIntervalTimer = 0;
        this.shootTimer = 0;

        this.transitionTimer = this.phase === 0 ? 0 : 0.15 * 15;

        // idle, toBird, birdTo, toHound, houndTo, toBeast, beastTo, summoning, dead
        // 0, 1, 2, 3, 4, 5, 6, 7, 8
        switch(this.phase) {
            case 0:
                this.state = 0;
                break;
            case 1:
                this.state = 2;
                break;
            case 2:
                this.state = 4;
                break;
            case 3:
                this.state = 6;
                break;
        }
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.2, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 21, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 85 * 32, 0, 32, 32, 15, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 100 * 32, 0, 32, 32, 21, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 121 * 32, 0, 32, 32, 15, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 136 * 32, 0, 32, 32, 21, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 157 * 32, 0, 32, 32, 15, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 173 * 32, 0, 32, 32, 2, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 200 * 32, 0, 32, 32, 31, 0.1, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 11 * PARAMS.SCALE, this.y + 10 * PARAMS.SCALE, 10 * PARAMS.SCALE, 10 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 5 * PARAMS.SCALE, this.hitBB.width, this.hitBB.height / 2 + 2 * PARAMS.SCALE);
    };

    update() {

        let prevState = this.state;

        this.activationTimer = Math.max(0, this.activationTimer - this.game.clockTick);
        this.transitionTimer = Math.max(0, this.transitionTimer - this.game.clockTick);
        this.deadTimer = Math.max(0, this.deadTimer - this.game.clockTick);
        this.rootsTimer = Math.max(0, this.rootsTimer - this.game.clockTick);
        this.rootsIntervalTimer = Math.max(0, this.rootsIntervalTimer - this.game.clockTick);
        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);

        if (!this.activated) {
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero && distance(this.BB.center, entity.BB.center) <= this.visionDistance) {
                    this.activated = true;
                    this.activationTimer = 5 - this.game.clockTick;
                }
            });
        }
    
        if (this.activated && this.activationTimer === 0 && this.transitionTimer === 0) {
            if (this.hp <= 0) {
                if (!this.deadFlag) {
                    this.deadFlag = true;
                    this.deadTimer = 31 * 0.1 - this.game.clockTick;
                }
                this.state = 8;
                if (this.deadTimer === 0) {
                    this.removeFromWorld = true;
                }
            } else {
                // this.rootsCompleted = true;
                if (!this.rootsCompleted) {
                    if (!this.rootsFlag) {
                        this.rootsFlag = true;
                        this.rootsTimer = 21 - this.game.clockTick;
                        this.rootsIntervalTimer = 3 - this.game.clockTick;
                        this.state = 7;
                    }

                    if (this.rootsTimer === 0) {
                        this.rootsCompleted = true;
                    } else {
                        if (this.rootsIntervalTimer === 0) {
                            this.rootsIntervalTimer = 3 - this.game.clockTick;
                            for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 10) {
                                this.game.addEntity(new DruidRoot(this.game, (this.BB.center.x + 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE * Math.cos(theta)) - 16 * PARAMS.SCALE,
                                                                             (this.BB.center.y + 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE * Math.sin(theta)) - 16 * PARAMS.SCALE,
                                                                             2, 10));
                            }
                        }
                        if (this.shootTimer === 0) {
                            this.shootTimer = 0.75 - this.game.clockTick;
                            let randomStartTheta = toRadians(randomInt(361));
                            for (let theta = randomStartTheta; theta < randomStartTheta + 2 * Math.PI; theta += Math.PI / 4) {
                                // this.game.addEntity(new DruidRoot(this.game, (this.BB.center.x + 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE * Math.cos(theta)) - 16 * PARAMS.SCALE,
                                //                                              (this.BB.center.y + 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE * Math.sin(theta)) - 16 * PARAMS.SCALE,
                                //                                              2, 10));
                                this.game.addEntity(new DruidBeam(this.game, this.x, this.y, theta, 1.5, 10));
                            }
                        }
                    }    
                }
                if (this.rootsCompleted) {
                    if (!this.transitionFlag) {
                        this.transitionFlag = true;
                        this.transitionTimer = 0.15 * 21 - this.game.clockTick;
                        if ((this.hp === 2000 && this.phase === 2) || (this.hp === 4000 && this.phase === 1)) {
                            this.phase++;
                        }
                        // console.log(this.phase)
                        switch(this.phase) {
                            case 0:
                            case 1:
                                this.state = 1;
                                break;
                            case 2:
                                this.state = 3;
                                break;
                            case 3:
                                this.state = 5;
                                break;
                        }
                    } else {
                        this.removeFromWorld = true;
                        this.game.projectileEntities.forEach(entity => {
                            if (entity instanceof DruidBeam) {
                                entity.removeFromWorld = true;
                            }
                        });
                        switch(this.phase) {
                            case 0:
                            case 1:
                                this.game.addEntity(new DruidBird(this.game, this.x, this.y, this.hp, 4000));
                                break;
                            case 2:
                                this.game.addEntity(new DruidHound(this.game, this.x, this.y, this.hp, 2000));
                                break;
                            case 3:
                                this.game.addEntity(new DruidBeast(this.game, this.x, this.y, this.hp, 0));
                                break;
                        }
                    }
                }
            }
        }

        this.updateBB();

        if (this.state !== prevState) {
            this.animations[prevState].reset();
        }
    };

    spawnRoot() {
        
        // for (let i = 0; i < 2 * Math.PI; i += 5 * Math.PI / 180) {
        //     let randomTheta = toRadians(randomInt(360));
        //     let placementUnitVector = unitVector({ x: Math.cos(randomTheta + i), y: Math.sin(randomTheta + i) });
        //     let rootsPerTheta = 2;
        //     for (let j = 0; j < rootsPerTheta; j++) {
        //         let randomDistance = randomInt(20 * PARAMS.BLOCKWIDTH * PARAMS.SCALE - 16 * PARAMS.SCALE) + 16 * PARAMS.SCALE;
        //         this.game.addEntity(new DruidRoot(this.game, this.BB.center.x + placementUnitVector.x * randomDistance - 16 * PARAMS.SCALE,
        //                                                      this.BB.center.y + placementUnitVector.y * randomDistance - 16 * PARAMS.SCALE));
        //     }
        // }

        // let randomTheta = toRadians(randomInt(360));
        // let placementUnitVector = unitVector({ x: Math.cos(randomTheta), y: Math.sin(randomTheta) });
        // let randomDistance = randomInt(20 * PARAMS.BLOCKWIDTH * PARAMS.SCALE - 16 * PARAMS.SCALE) + 16 * PARAMS.SCALE;
        this.game.addEntity(new DruidRoot(this.game, this.BB.center.x + placementUnitVector.x * randomDistance - 16 * PARAMS.SCALE,
                                                     this.BB.center.y + placementUnitVector.y * randomDistance - 16 * PARAMS.SCALE));
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
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE, this.facing[0], this.facing[1]);

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

class DruidRoot {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/root.png");
        this.lifetime = 1.5;
        this.origLT = this.lifetime;
        this.npc = true;
        this.id = ++PARAMS.NPC_ID;
        this.animation = new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 15, this.lifetime / 15, false, true);
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        } else if (!this.shotsSpawned && this.lifetime <= this.origLT / 15 * 7) {
            this.shotsSpawned = true;
            for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 2) {
                this.game.addEntity(new DruidBeam(this.game, this.x, this.y, theta, 1, 8));
            }
            // this.game.addEntity(new DamageRegion(this.game, this.x + 12 * PARAMS.SCALE, this.y + 12 * PARAMS.SCALE, 8 * PARAMS.SCALE, 8 * PARAMS.SCALE, false, 100, this.lifetime / 15 * 2, this.BB.center));
        }
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};