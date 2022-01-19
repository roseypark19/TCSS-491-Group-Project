class BabySlime {

    constructor(game, x, y, green) {
        Object.assign(this, { game, x, y, green });
        this.spritesheet = ASSET_MANAGER.getAsset(green ? "./sprites/enemies/slime_green.png" : "./sprites/enemies/slime_blue.png");
        this.facing = [0, randomInt(2)]; // down, up, right, left
                                         // 0, 1, 0, 1 
        this.state = 0; // idle, attacking, damaged, dead
                        // 0, 1, 2, 3
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 150;
        this.hp = this.maxHp;
        this.minProximity = 2;
        this.visionDistance = 450;
        this.attackDistance = 300;
        this.shotsTaken = [];
        this.shootTimer = 0;
        this.shootFlag = false;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.velocityConstant = 3;
        this.walkSpeed = 0.15 * (4 / this.velocityConstant);
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 8, 0.4, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 32 * 32, 0, 32, 32, 4, this.walkSpeed, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 48 * 32, 0, 32, 32, 4, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 9, 0.15, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 12 * PARAMS.SCALE, this.y + 12 * PARAMS.SCALE, 8 * PARAMS.SCALE, 8 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 4 * PARAMS.SCALE, 8 * PARAMS.SCALE, 6 * PARAMS.SCALE);
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

        if (this.state !== 3) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile && this.hitBB.collide(entity.hitBB) && 
                    (!(entity.passable || entity.removeFromWorld) || (entity.passable && !(this.shotsTaken.includes(entity.id)))) && this.state !== 4) {
                    if (entity.passable) {
                        this.shotsTaken.push(entity.id);
                    } else {
                        entity.removeFromWorld = true;
                    }  
                    if (this.damagedTimer === 0 && this.deadTimer === 0) {
                        this.damagedTimer = 0.6 - this.game.clockTick;
                        this.state = 2;
                        this.hitUnitVector = prevState === 0 ? { x: 0, y: 0 } : 
                                                               unitVector({ x: this.hitBB.center.x - entity.sourcePoint.x, y: this.hitBB.center.y - entity.sourcePoint.y });
                    }
                    this.hp -= entity.damage;
                    // ASSET_MANAGER.playAsset("./audio/slime_hit.mp3");
                    if (this.deadTimer === 0 && this.hp <= 0) {
                        this.deadTimer = 9 * 0.15 - this.game.clockTick;
                        this.state = 3;
                        this.facing = [0, 0];
                        // ASSET_MANAGER.playAsset("./audio/slime_death.mp3");
                    }
                }
            });
        }

        if (this.state !== 3 && this.damagedTimer > 0) {
            this.velocity.x = this.hitUnitVector.x * this.velocityConstant / 2;
            this.velocity.y = this.hitUnitVector.y * this.velocityConstant / 2;
            this.facing[0] = this.hitUnitVector.y > 0 ? 1 : 0;
            this.facing[1] = this.hitUnitVector.x > 0 ? 1 : 0;
            this.randomPos = undefined;
        }

        if (this.state !== 3) {
            let center = this.BB.center;
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    let heroCenter = entity.BB.center;
                    let dist = distance(center, heroCenter);
                    if (dist <= this.visionDistance) {
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
                        if (dist <= this.attackDistance) {
                            if (this.shootTimer === 0 && this.state === 1) {
                                this.shootTimer = 4 * 0.15 - this.game.clockTick;
                                let projectileCenter = { x: this.BB.center.x + 6 * PARAMS.SCALE * heroDirectionUnitVector.x,
                                                         y: this.BB.center.y + 6 * PARAMS.SCALE * heroDirectionUnitVector.y };
                                if (this.shootFlag) {
                                    // this.game.addEntity(new DamageRegion(this.game, 
                                    //                                      projectileCenter.x - 6 * PARAMS.SCALE, 
                                    //                                      projectileCenter.y - 6 * PARAMS.SCALE, 
                                    //                                      12 * PARAMS.SCALE, 
                                    //                                      12 * PARAMS.SCALE, 
                                    //                                      false, 100, 0.1));
                                }  
                            }
                        }
                        if (this.damagedTimer === 0) {
                            this.state = 1;
                        }
                        if (this.randomPos !== undefined) {
                            movementDirectionUnitVector = this.randomPosUnitVector;
                            dist = distance(center, this.randomPos);
                        }
                        if (dist > this.minProximity && this.damagedTimer === 0) {
                            this.velocity.x = movementDirectionUnitVector.x * this.velocityConstant;
                            this.velocity.y = movementDirectionUnitVector.y * this.velocityConstant;
                        }
                        if (this.damagedTimer === 0) {
                            if (this.randomPos !== undefined) {
                                this.facing[0] = heroDirectionUnitVector.y >= 0 ? 0 : 1;
                                this.facing[1] = heroDirectionUnitVector.x >= 0 ? 0 : 1;
                            } else {
                                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
                            }  
                        }      
                    }  else if (this.damagedTimer === 0) {
                        this.state = 0;
                        this.randomPos = undefined;
                    } 
                }
            });
        } else {
            if (this.deadTimer === 0) {
                this.removeFromWorld = true;
            }
        }

        this.shootFlag = this.state === 1;

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

class MotherSlime {
    constructor(game, x, y, green) {
        Object.assign(this, { game, x, y, green });
        this.spritesheet = ASSET_MANAGER.getAsset(green ? "./sprites/enemies/slime_mother_green.png" : "./sprites/enemies/slime_mother_blue.png");
        this.facing = [0, randomInt(2)]; // down, up, right, left
                                         // 0, 1, 0, 1 
        this.state = 0; // idle, attacking, damaged, dead
                        // 0, 1, 2, 3
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 300;
        this.hp = this.maxHp;
        this.minProximity = 2;
        this.visionDistance = 450;
        this.attackDistance = 100;
        this.shotsTaken = [];
        this.shootTimer = 0;
        this.shootFlag = false;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.velocityConstant = 2;
        this.walkSpeed = 0.15 * (4 / this.velocityConstant);
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 8, 0.4, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 32 * 32, 0, 32, 32, 4, this.walkSpeed, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 48 * 32, 0, 32, 32, 4, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 11, 0.15, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 8 * PARAMS.SCALE, this.y + 12 * PARAMS.SCALE, 16 * PARAMS.SCALE, 8 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 4 * PARAMS.SCALE, 16 * PARAMS.SCALE, 6 * PARAMS.SCALE);
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

        if (this.state !== 3) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile && this.hitBB.collide(entity.hitBB) && 
                    (!(entity.passable || entity.removeFromWorld) || (entity.passable && !(this.shotsTaken.includes(entity.id)))) && this.state !== 4) {
                    if (entity.passable) {
                        this.shotsTaken.push(entity.id);
                    } else {
                        entity.removeFromWorld = true;
                    }  
                    if (this.damagedTimer === 0 && this.deadTimer === 0) {
                        this.damagedTimer = 0.6 - this.game.clockTick;
                        this.state = 2;
                        this.hitUnitVector = prevState === 0 ? { x: 0, y: 0 } : 
                                                               unitVector({ x: this.hitBB.center.x - entity.sourcePoint.x, y: this.hitBB.center.y - entity.sourcePoint.y });
                    }
                    this.hp -= entity.damage;
                    // ASSET_MANAGER.playAsset("./audio/slime_hit.mp3");
                    if (this.deadTimer === 0 && this.hp <= 0) {
                        this.deadTimer = 11 * 0.15 - this.game.clockTick;
                        this.state = 3;
                        this.facing = [0, 0];
                        // ASSET_MANAGER.playAsset("./audio/slime_death.mp3");
                    }
                }
            });
        }

        if (this.state !== 3 && this.damagedTimer > 0) {
            this.velocity.x = this.hitUnitVector.x * this.velocityConstant / 2;
            this.velocity.y = this.hitUnitVector.y * this.velocityConstant / 2;
            this.facing[0] = this.hitUnitVector.y > 0 ? 1 : 0;
            this.facing[1] = this.hitUnitVector.x > 0 ? 1 : 0;
            this.randomPos = undefined;
        }

        if (this.state !== 3) {
            let center = this.BB.center;
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    let heroCenter = entity.BB.center;
                    let dist = distance(center, heroCenter);
                    if (dist <= this.visionDistance) {
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
                        if (dist <= this.attackDistance) {
                            if (this.shootTimer === 0 && this.state === 1) {
                                this.shootTimer = 4 * 0.15 - this.game.clockTick;
                                let projectileCenter = { x: this.BB.center.x + 6 * PARAMS.SCALE * heroDirectionUnitVector.x,
                                                         y: this.BB.center.y + 6 * PARAMS.SCALE * heroDirectionUnitVector.y };
                                if (this.shootFlag) {
                                    // this.game.addEntity(new DamageRegion(this.game, 
                                    //                                      projectileCenter.x - 6 * PARAMS.SCALE, 
                                    //                                      projectileCenter.y - 6 * PARAMS.SCALE, 
                                    //                                      12 * PARAMS.SCALE, 
                                    //                                      12 * PARAMS.SCALE, 
                                    //                                      false, 100, 0.1));
                                }  
                            }
                        }
                        if (this.damagedTimer === 0) {
                            this.state = 1;
                        }
                        if (this.randomPos !== undefined) {
                            movementDirectionUnitVector = this.randomPosUnitVector;
                            dist = distance(center, this.randomPos);
                        }
                        if (dist > this.minProximity && this.damagedTimer === 0) {
                            this.velocity.x = movementDirectionUnitVector.x * this.velocityConstant;
                            this.velocity.y = movementDirectionUnitVector.y * this.velocityConstant;
                        }
                        if (this.damagedTimer === 0) {
                            if (this.randomPos !== undefined) {
                                this.facing[0] = heroDirectionUnitVector.y >= 0 ? 0 : 1;
                                this.facing[1] = heroDirectionUnitVector.x >= 0 ? 0 : 1;
                            } else {
                                this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
                                this.facing[1] = this.velocity.x >= 0 ? 0 : 1;
                            }  
                        }      
                    }  else if (this.damagedTimer === 0) {
                        this.state = 0;
                        this.randomPos = undefined;
                    } 
                }
            });
        } else {
            if (this.deadTimer === 0) {
                this.removeFromWorld = true;
                let x = this.BB.x- 11 * PARAMS.SCALE;
                for (let i = 0; i < 3; i++) {
                    this.game.addEntity(new BabySlime(this.game, x, this.BB.y, this.green));
                    x += 11 * PARAMS.SCALE;
                }
            }
        }

        this.shootFlag = this.state === 1;

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