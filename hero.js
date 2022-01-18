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

class Hero {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/hero.png");
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.state = 0; // idle, walking, shooting, damaged, dead, 
                        // projectile cast, projectile hold, projectile launch, 
                        // explosion cast, explosion hold, explosion launch, shield casting
                        // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 1000;
        this.maxMp = 1000;
        this.mp = this.maxMp;
        this.hp = this.maxHp;
        this.walkSpeed = 0.1;
        this.damagedTimer = 0;
        this.deadTimer = 0;
        this.shootTimer = 0;
        this.shootFlag = false;

        this.ability1Timer = 0;
        this.ability1Flag = false;
        this.ability1Cooldown = 0;

        this.ability2Timer = 0;
        this.ability2Flag = false;
        this.ability2Cooldown = 0;

        this.ability3Timer = 0;
        this.ability3Flag = false;
        this.ability3Cooldown = 0;

        this.ability1Cost = 0;
        this.ability2Cost = 0;
        this.ability3Cost = 0;

        // this.abilitySpritesheet = ASSET_MANAGER.getAsset("./sprites/barbarian/abilities.png");
        // this.abilityData = [{ x: 32, y: 0, button: "R"}, { x: 64, y: 0, button: "F"}];
        this.spriteCenter = 15.5;

        this.weapon = { type: 5, attack: 0, dexterity: 0 }; 
        // types: 0 = longsword, 1 = war axe, 2 = whip, 3 = flail, 4 = slingshot, 5 = bow

        this.spellType = 1; // 0 = wind, 1 = fire, 2 = ice, 3 = earth

        this.velocityConstant = 4;
        this.velocity = { x : 0, y : 0 };
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {

        this.animations = [];

        this.dexterity = WEAPONS[this.weapon.type].base_dexterity - this.weapon.dexterity * 0.005;

        this.animations.push(new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.2, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 4, this.walkSpeed, false, true));

        let startX = 0;
        let frameCount = 0;
        switch(this.weapon.type) {
            case 0:
                startX = 3456;
                frameCount = 6;
                break;
            case 1:
                startX = 4224;
                frameCount = 6;
                break;
            case 2:
                startX = 4992;
                frameCount = 3;
                break;
            case 3:
                startX = 5376;
                frameCount = 3;
                break;
            case 4:
                startX = 5760;
                frameCount = 8;
                break;
            case 5:
                startX = 6784;
                frameCount = 8;
                break;
        }
        this.shootFrames = frameCount;
        this.animations.push(new AnimationGroup(this.spritesheet, startX, 0, 32, 32, frameCount, this.dexterity, false, true));

        this.animations.push(new AnimationGroup(this.spritesheet, 80 * 32, 0, 32, 32, 4, 0.15, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 96 * 32, 0, 32, 32, 12, 0.1, false, true));

        // add spell animators at a later time
        switch(this.spellType) {
            case 2:
                this.animations.push(new AnimationGroup(this.spritesheet, 13952, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 14464, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 14976, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 15488, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 15616, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 15744, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 15872, 0, 32, 32, 4, 0.1, false, true));   // casting
                break;
            case 0:
                this.animations.push(new AnimationGroup(this.spritesheet, 11904, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 12416, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 12928, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 13440, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 13568, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 13696, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 13824, 0, 32, 32, 4, 0.1, false, true));   // casting
                break;
            case 1:
                this.animations.push(new AnimationGroup(this.spritesheet, 9856, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 10368, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 10880, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 11392, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 11520, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 11648, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 11776, 0, 32, 32, 4, 0.1, false, true));   // casting
                break;
            case 3:
                this.animations.push(new AnimationGroup(this.spritesheet, 7808, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 8320, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 8832, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 9344, 0, 32, 32, 4, 0.1, false, true));   // casting
                this.animations.push(new AnimationGroup(this.spritesheet, 9472, 0, 32, 32, 4, 0.1, false, true));   // holding
                this.animations.push(new AnimationGroup(this.spritesheet, 9600, 0, 32, 32, 4, 0.1, false, true));   // throwing

                this.animations.push(new AnimationGroup(this.spritesheet, 9728, 0, 32, 32, 4, 0.1, false, true));   // casting
                break;
        }
    };
    
    update() {

        let prevState = this.state;

        if (this.state !== 4) {
            this.hp = Math.min(this.maxHp, this.hp + this.game.clockTick / 1 * 15);
            this.mp = Math.min(this.maxMp, this.mp + this.game.clockTick / 1 * 15);
        }

        this.originalCollisionBB = this.collisionBB;

        this.deadTimer = Math.max(0, this.deadTimer - this.game.clockTick);
        this.damagedTimer = Math.max(0, this.damagedTimer - this.game.clockTick);
        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
    
        this.ability1Cooldown = Math.max(0, this.ability1Cooldown - this.game.clockTick);
        this.ability1Timer = Math.max(0, this.ability1Timer - this.game.clockTick);

        this.ability2Cooldown = Math.max(0, this.ability2Cooldown - this.game.clockTick);
        this.ability2Timer = Math.max(0, this.ability2Timer - this.game.clockTick);

        this.ability3Cooldown = Math.max(0, this.ability3Cooldown - this.game.clockTick);
        this.ability3Timer = Math.max(0, this.ability3Timer - this.game.clockTick);

        this.facing[0] = 0;

        let newVelX = 0;
        let newVelY = 0;

        if (this.state !== 4) {
            this.game.projectileEntities.forEach(entity => {
                if (entity.friendlyProjectile === false && this.hitBB.collide(entity.hitBB) && this.state !== 4) {
                    if (this.ability1Timer === 0 && this.ability2Timer === 0 && this.state !== 2) {
                        this.damagedTimer = 0.6 - this.game.clockTick;
                        this.state = 3;
                    }
                    entity.removeFromWorld = true;
                    if (this.ability2Timer === 0 && this.ability1Timer === 0) {
                        this.hp -= entity.damage;
                        // ASSET_MANAGER.playAsset("./audio/hero_hit.mp3");
                    }
                    if (this.deadTimer === 0 && this.hp <= 0) {
                        this.deadTimer = 12 * 0.1 - this.game.clockTick;
                        this.state = 4;
                        this.facing = [0, 0];
                        PARAMS.GAMEOVER = true;
                        // ASSET_MANAGER.pauseBackgroundMusic();
                        // ASSET_MANAGER.playAsset("./audio/hero_death.mp3");
                    }
                }
            });
        }

        if (this.state !== 4 && !this.game.camera.title && !PARAMS.GAMEOVER) {
            if (this.game.right) {
                newVelX += this.velocityConstant;
                this.facing[1] = 0;
            }
            if (this.game.left) {
                newVelX -= this.velocityConstant;
                this.facing[1] = 1;
            }
            if (this.game.up) {
                newVelY -= this.velocityConstant;
                this.facing[0] = 1;
            }
            if (this.game.down) {
                newVelY += this.velocityConstant;
                this.facing[0] = 0;
            }
    
            if (newVelX !== 0 && newVelY !== 0) {
                var diagonalVel = Math.sqrt(Math.pow(this.velocityConstant, 2) / 2);
            }
            if (diagonalVel) {
                newVelX = newVelX > 0 ? diagonalVel : -diagonalVel;
                newVelY = newVelY > 0 ? diagonalVel : -diagonalVel;
            } 
        }

        this.velocity.x = newVelX;
        this.velocity.y = newVelY;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        if (this.state !== 4 && !this.game.camera.title && !PARAMS.GAMEOVER) {

            if (this.game.special1 && this.ability1Cooldown === 0 && this.ability1Timer === 0 && this.ability2Timer === 0 && this.mp >= this.ability1Cost) {
                this.state = 5;
                this.ability1Timer = (4 * 0.09 + 3 * 4 * 0.1 + 4 * 0.1) - this.game.clockTick;
                this.ability1Cooldown = this.ability1Timer;
                this.ability1Flag = true;
                this.mp -= this.ability1Cost;
            }

            if (this.ability1Timer > 0) {
                if (this.state === 5 && this.ability1Timer <= 3 * 4 * 0.1 + 4 * 0.1) {
                    this.state = 6;
                    this.ability1Timer = (3 * 4 * 0.1 + 4 * 0.1) - this.game.clockTick;
                } else if (this.state === 6 && (this.ability1Timer <= 4 * 0.1 || this.game.clicked)) {
                    this.state = 7;
                    this.ability1Timer = (4 * 0.1) - this.game.clockTick;
                    this.ability1Cooldown = this.ability1Timer;
                }
            }

            if (this.ability1Timer <= 0.1 && this.ability1Timer > 0 && this.ability1Flag) {
                this.ability1Flag = false;
                let mousePoint = this.game.mouse ? this.game.mouse : { x: this.BB.center.x - this.game.camera.x + 1, y: this.BB.center.y - this.game.camera.y };
                let vector = { x: mousePoint.x - (this.BB.center.x - this.game.camera.x), y: mousePoint.y - (this.BB.center.y - this.game.camera.y) };
                let theta = Math.atan2(vector.y, vector.x);
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                this.spawnBeam(theta);
            }

            if (this.game.special2 && this.ability2Cooldown === 0 && this.ability2Timer === 0 && this.ability1Timer === 0 && this.mp >= this.ability2Cost) {
                this.state = 8;
                this.ability2Flag = true;
                this.ability2Timer = (4 * 0.09 + 3 * 4 * 0.1 + 4 * 0.1) - this.game.clockTick;
                this.ability2Cooldown = this.ability2Timer;
                this.mp -= this.ability2Cost;
            }

            if (this.ability2Timer > 0) {
                this.facing = [0, 0];
                if (this.state === 8 && this.ability2Timer <= 3 * 4 * 0.1 + 4 * 0.1) {
                    this.state = 9;
                    this.ability2Timer = (3 * 4 * 0.1 + 4 * 0.1) - this.game.clockTick;
                } else if (this.state === 9 && (this.ability2Timer <= 4 * 0.1 || this.game.clicked)) {
                    this.state = 10;
                    this.ability2Timer = (4 * 0.1) - this.game.clockTick;
                    this.ability2Cooldown = this.ability1Timer;
                }
            }

            if (this.ability2Timer <= 0.2 && this.ability2Timer > 0 && this.ability2Flag) {
                this.ability2Flag = false;
                for (let theta = 2 * Math.PI; theta > 0; theta -= Math.PI / 4) {             
                    this.spawnBeam(theta);
                }
            }

            if (this.game.special3 && this.ability3Cooldown === 0 && this.ability3Timer === 0 && this.ability1Timer === 0 && this.ability2Timer === 0 && this.mp >= this.ability3Cost) {
                this.state = 11;
                this.ability3Flag = true;
                this.ability3Timer = 4 * 0.1 - this.game.clockTick;
                this.ability3Cooldown = 10 - this.game.clockTick;
                this.mp -= this.ability3Cost;
            }

            if (this.ability3Timer > 0) {
                this.facing = [0, 0];
            }

            if (this.ability3Timer === 0 && this.ability3Flag) {
                this.ability3Flag = false;
                this.game.addEntity(new ElementCircle(this.game, this.spellType));
            }

            // if (this.ability2Timer <= 0.1 && this.ability2Timer > 0 && this.ability2Flag) {
            //     this.ability2Flag = false;
            //     this.spawnBeams();
            //     // ASSET_MANAGER.playAsset("./audio/lightning.mp3")
            // }

            if (this.ability1Timer === 0 && this.ability2Timer === 0 && this.ability3Timer === 0 && this.damagedTimer === 0) {
                this.state = magnitude(this.velocity) === 0 ? 0 : 1;
            }

            if (this.game.clicked && this.ability1Timer === 0 && this.ability2Timer === 0 && this.ability3Timer === 0) {
                let mousePoint = this.game.mouse ? this.game.mouse : this.game.click;
                let vector = { x: mousePoint.x - (this.BB.center.x - this.game.camera.x), y: mousePoint.y - (this.BB.center.y - this.game.camera.y) };
                let theta = Math.atan2(vector.y, vector.x);
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                if (this.weapon.type === 0 || this.weapon.type === 1) {
                    this.facing[0] = mousePoint.y < this.BB.center.y - this.game.camera.y ? 1 : 0;
                    this.facing[1] = mousePoint.x < this.BB.center.x - this.game.camera.x ? 1 : 0; 
                } else {
                    let degrees = toDegrees(theta);
                    if (degrees <= 45 || degrees >= 315) {
                        this.facing = [0, 0];
                    } else if (degrees > 45 && degrees < 135) {
                        this.facing = [1, 0];
                    } else if (degrees <= 225 && degrees >= 135) {
                        this.facing = [0, 1];
                    } else {
                        this.facing = [1, 1];
                    }
                }
                this.state = 2;
                if (this.shootTimer === 0) {
                    this.shootTimer = this.dexterity * this.shootFrames - this.game.clockTick;
                    let vector = { x : mousePoint.x + this.game.camera.x - this.BB.center.x, 
                                    y : mousePoint.y + this.game.camera.y - this.BB.center.y };
                    let directionUnitVector = unitVector(vector);
                    let range = WEAPONS[this.weapon.type].range;
                    let projectileCenter = { x: this.BB.center.x + range * PARAMS.SCALE * directionUnitVector.x,
                                                y: this.BB.center.y + range * PARAMS.SCALE * directionUnitVector.y };
                    if (this.shootFlag) {
                        // ASSET_MANAGER.playAsset("./audio/sword.mp3");
                        // if (this.weapon.type < 4) {
                        //     this.game.addEntity(new DamageRegion(this.game, 
                        //                         projectileCenter.x - 8 * PARAMS.SCALE,
                        //                         projectileCenter.y - 8 * PARAMS.SCALE,
                        //                         this.BB.width / 2,
                        //                         this.BB.height / 2,
                        //                         true,
                        //                         15,
                        //                         0.1, this.BB.center));
                        // } else {
                            this.game.addEntity(new Projectile(this.game, 
                                                                this.x + PARAMS.SCALE * -8 * Math.cos(theta), 
                                                                this.y + PARAMS.SCALE * -8 * Math.sin(theta), 
                                                                theta, true, WEAPONS[this.weapon.type].projectileType, this.BB.center));
                        // }
                        
                        
                    }
                    
                }
            } else if (this.ability1Timer > 0 && this.game.mouse) {
                let mousePoint = this.game.mouse;
                this.facing[0] = mousePoint.y < this.BB.center.y - this.game.camera.y ? 1 : 0;
                this.facing[1] = mousePoint.x < this.BB.center.x - this.game.camera.x ? 1 : 0; 
            }
        } else if (PARAMS.GAMEOVER) {
            if (this.hp > 0) {
                this.state = 0;
                this.velocity.x = 0;
                this.velocity.y = 0;
            } else if (this.deadTimer === 0) {
                this.removeFromWorld = true;
            }
        }

        this.shootFlag = this.state === 2;

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

    spawnBeam(theta) {
        this.game.addEntity(new ElementBeam(this.game, 
                                            this.BB.center.x - 32 * PARAMS.SCALE / 2 - 12 * Math.cos(theta) * PARAMS.SCALE,
                                            this.BB.center.y - 32 * PARAMS.SCALE / 2 - 12 * Math.sin(theta) * PARAMS.SCALE, 
                                            theta, this.BB.center, this.spellType));
    };

    // spawnBeams() {
    //     let center = this.BB.center;
    //     for (let theta = 2 * Math.PI; theta > 0; theta -= Math.PI / 4) {             
    //         this.game.addEntity(new Beam(this.game, 
    //                                      center.x - 32 * PARAMS.SCALE / 2,
    //                                      center.y - 32 * PARAMS.SCALE / 2, 
    //                                      theta, this.BB.center));
    //     }
    // };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 12 * PARAMS.SCALE, this.y + 12 * PARAMS.SCALE, 8 * PARAMS.SCALE, 8 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 4 * PARAMS.SCALE, 8 * PARAMS.SCALE, 4 * PARAMS.SCALE);
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

    drawMmap(ctx) {
        ctx.fillStyle = "Blue";
        ctx.strokeStyle = "Blue";
        ctx.strokeRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX + 8 * PARAMS.MMAP_SCALE, 
                       this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY + 8 * PARAMS.MMAP_SCALE, 
                       16 * PARAMS.MMAP_SCALE, 16 * PARAMS.MMAP_SCALE);
        ctx.fillRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX + 8 * PARAMS.MMAP_SCALE, 
                     this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY + 8 * PARAMS.MMAP_SCALE, 
                     16 * PARAMS.MMAP_SCALE, 16 * PARAMS.MMAP_SCALE);
    };
};

class ElementBeam {

    static rotationList = [];

    constructor(game, x, y, radians, sourcePoint, type) {
        Object.assign(this, { game, x, y, radians, sourcePoint, type });
        this.roundedDegrees = Math.round(toDegrees(this.radians));
        this.roundedRadians = toRadians(this.roundedDegrees);
        this.loadSpriteSheet();
        this.friendlyProjectile = true;
        this.damage = 25;
        this.id = ++PARAMS.SHOT_ID;
        this.velocityConstant = 10;
        this.velocity = { x: Math.cos(this.roundedRadians) * this.velocityConstant, 
                          y: Math.sin(this.roundedRadians) * this.velocityConstant };
        this.lifetime = 0.5;
        this.explosionTimer = 0;
        this.explosionFlag = false;
        this.state = 0; // 0 = moving, 1 = exploding
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadSpriteSheet() {
        switch(this.type) {
            case 0:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/wind_beam.png");
                break;
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/fire_beam.png");
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/ice_beam.png");
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/earth_beam.png");
                break;
        }
    };

    loadAnimations() {
        if (!(ElementBeam.rotationList[this.roundedDegrees])) {
            let flipCheck = this.roundedDegrees >= 90 && this.roundedDegrees < 270;
            let spritesheet = flipCheck ? flipImage(this.spritesheet, 0, 0, 32, 32, true) : this.spritesheet;
            Projectile.rotationList[this.roundedDegrees] = 
                rotateImage(spritesheet, 0, 0, 32, 32, flipCheck ? -(Math.PI - this.roundedRadians) : this.roundedRadians, PARAMS.SCALE);
        }
        this.animations.push(
            new AnimationGroup(
                Projectile.rotationList[this.roundedDegrees], 0, 0, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE, 1, 1, false, true));
        this.animations.push(new AnimationGroup(this.spritesheet, 32, 0, 32, 32, 4, 0.1, false, true));
    };

    update() {
        this.lifetime = Math.max(0, this.lifetime - this.game.clockTick);
        this.explosionTimer = Math.max(0, this.explosionTimer - this.game.clockTick);
        if (this.lifetime === 0) {
            if (!this.explosionFlag) {
                this.explosionFlag = true;
                this.state = 1;
                this.explosionTimer = 4 * 0.1 - this.game.clockTick;
            }
            if (this.explosionTimer === 0) {
                this.removeFromWorld = true;
            }
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
        let hitCenter = { x: this.BB.center.x + Math.cos(this.roundedRadians) * 12 * PARAMS.SCALE,
                          y: this.BB.center.y + Math.sin(this.roundedRadians) * 12 * PARAMS.SCALE };
        if (this.state === 0) {
            this.hitBB = new BoundingBox(hitCenter.x - 4 * PARAMS.SCALE, hitCenter.y - 4 * PARAMS.SCALE, 8 * PARAMS.SCALE, 8 * PARAMS.SCALE);
        } else {
            this.hitBB = new BoundingBox(hitCenter.x - 8 * PARAMS.SCALE, hitCenter.y - 8 * PARAMS.SCALE, 16 * PARAMS.SCALE, 16 * PARAMS.SCALE);
        }
        
    };

    draw(ctx) {
        this.animations[this.state].
            drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + (this.state === 0 ? 0 : Math.cos(this.roundedRadians) * 12 * PARAMS.SCALE), 
                      this.y - this.game.camera.y + (this.state === 0 ? 0 : Math.sin(this.roundedRadians) * 12 * PARAMS.SCALE), this.state === 0 ? 1 : PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
        }
    };
};

class ElementCircle {
    constructor(game, type) {
        this.game = game;
        this.type = type;
        this.heroFollower = true;
        this.x = this.game.camera.hero.BB.x;
        this.y = this.game.camera.hero.BB.y;
        this.lifetime = 10;
        this.loadSpriteSheet();
        this.animation = new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.1, false, true);
        this.updateBB();
    }

    loadSpriteSheet() {
        switch(this.type) {
            case 0:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/wind_shield.png");
                break;
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/fire_shield.png");
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/ice_shield.png");
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/earth_shield.png");
                break;
        }
    };

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        } else {
            this.x = this.game.camera.hero.BB.x;
            this.y = this.game.camera.hero.BB.y;
            this.updateBB();
        }
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    };
};

