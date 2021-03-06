class TinyHero {
    constructor(game, destinations) {
        Object.assign(this, { game, destinations });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/tiny_hero.png");
        this.id = ++PARAMS.LIFE_ID;
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.state = 0; // idle, walking, shooting, charged, dead
                        // 0, 1, 2, 3, 4
        this.hp = 0;
        this.velocityConstant = 8;
        this.velocity = { x : 0, y : 0 };
        this.animations = [];
        this.scale = PARAMS.SCALE / 1;
        this.targetIndex = 0;
        this.prevTargetIndex = 0;
        this.hp = 0;
        this.x = this.destinations[this.targetIndex].originX - 16 * this.scale;
        this.y = this.destinations[this.targetIndex].originY - 16 * this.scale;
        this.target = this.destinations[this.targetIndex];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations[0] = new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.25, false, true);
        this.animations[1] = new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 4, 0.1 * (4 / this.velocityConstant), false, true);
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
        this.hitBB = new BoundingBox(this.x + 16 * this.scale, this.y + 16 * this.scale, 4 * this.scale, 4 * this.scale);
    };
    
    draw(ctx) {
        this.animations[this.state]
            .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, this.facing[0], this.facing[1]);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
        }
    };
};

class Hero {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/hero.png");
        this.currencyCount = 0;
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.state = 0; // idle, walking, shooting, damaged, dead, 
                        // projectile cast, projectile hold, projectile launch, 
                        // explosion cast, explosion hold, explosion launch, shield casting
                        // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        this.id = ++PARAMS.LIFE_ID;
        this.maxHp = 500 + saveState.heroStats[1] * 50;
        this.maxMp = 250 + saveState.heroStats[2] * 25;
        this.mp = this.maxMp;
        this.hp = this.maxHp;
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

        this.ability1Cost = 150;
        this.ability2Cost = 200;
        this.ability3Cost = 100;

        this.abilitySpritesheet = ASSET_MANAGER.getAsset("./sprites/hero/spells.png");

        this.abilityData = [{ x: 0, y: 0, button: "Q"}, { x: 32, y: 0, button: "R"}, { x: 64, y: 0, button: "F"}];
        this.spriteCenter = 15.5;
        this.weaponSpritesheet = ASSET_MANAGER.getAsset("./sprites/ui/weapon_icons.png");
        
        this.weaponIndex = 0;
        this.weaponData = [];
        this.weaponPixelData = [{type: 0, x: 24, y: 0}, {type: 1, x: 48, y: 0}, {type: 2, x: 60, y: 0}, {type: 3, x: 36, y: 0}, {type: 4, x: 0, y: 0}, {type: 5, x: 12, y: 0}];
       
        // types: 0 = longsword, 1 = war axe, 2 = whip, 3 = flail, 4 = slingshot, 5 = bow

        this.spellType = 0; // 0 = wind, 1 = fire, 2 = ice, 3 = earth
        
        this.velocity = { x : 0, y : 0 };
        this.updateWeaponList();
        this.updateBB();
        this.loadAnimations();
        
    };

    loadAnimations() {

        this.animations = [];
        this.weapon = this.weaponData[this.weaponIndex];
        this.dexterity = WEAPONS[this.weapon.type].base_dexterity - this.weapon.dexterity * WEAPONS[this.weapon.type].dexInc;
        this.velocityConstant = saveState.heroStats[0] / 2.5 + 3;
        this.walkSpeed = 0.1 * (4 / this.velocityConstant);

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

        const isSpellUnlocked = saveState.numSpellsUnlocked > 0;

        this.maxHp = 500 + saveState.heroStats[1] * 50;
        this.maxMp = 250 + saveState.heroStats[2] * 25;
        
        let prevState = this.state;
        
        if (this.state !== 4) {
            this.hp = Math.min(this.maxHp, this.hp + this.game.clockTick / 1 * (3 * (saveState.heroStats[3] + 1)));
            this.mp = Math.min(this.maxMp, this.mp + this.game.clockTick / 1 * (2 * (saveState.heroStats[4] + 1)));
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
                    // if (this.ability2Timer === 0 && this.ability1Timer === 0) {
                    this.hp -= Math.max(0, entity.damage - 2 * saveState.heroStats[5] * (this.ability3Cooldown > 0 ? 2 : 1));
                    ASSET_MANAGER.playAsset("./audio/hero_hit.mp3");
                    // }
                    if (this.deadTimer === 0 && this.hp <= 0) {
                        this.deadTimer = 12 * 0.1 - this.game.clockTick;
                        this.state = 4;
                        this.facing = [0, 0];
                        PARAMS.GAMEOVER = true;
                        ASSET_MANAGER.pauseBackgroundMusic();
                        ASSET_MANAGER.playAsset("./audio/hero_death.mp3");
                    }
                }
            });
        }

        if (this.state !== 4 && saveState.numSpellsUnlocked > 1) {
            if (this.game.spellChange && !this.spellChangeFlag) {
                this.spellChangeFlag = true;
                this.spellType = (this.spellType + 1) % saveState.numSpellsUnlocked;
                this.ability1Timer = 0;
                this.ability2Timer = 0;
                this.ability3Timer = 0;
                this.loadAnimations();
            } else if (!this.game.spellChange) {
                this.spellChangeFlag = false;
            }
        }

        if (this.state !== 4 && !this.game.camera.title) {
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
                var diagonalVel = Math.round(Math.sqrt(Math.pow(this.velocityConstant, 2) / 2));
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

        if (this.state !== 4 && !this.game.camera.title) {

            if (isSpellUnlocked && this.game.special1 && this.ability1Cooldown === 0 && this.ability1Timer === 0 && this.ability2Timer === 0 && this.mp >= this.ability1Cost) {
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

            if (isSpellUnlocked && this.game.special2 && this.ability2Cooldown === 0 && this.ability2Timer === 0 && this.ability1Timer === 0 && this.mp >= this.ability2Cost) {
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

            if (isSpellUnlocked && this.game.special3 && this.ability3Cooldown === 0 && this.ability3Timer === 0 && this.ability1Timer === 0 && this.ability2Timer === 0 && this.mp >= this.ability3Cost) {
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
                    if (this.shootFlag) {
                        let type = WEAPONS[this.weapon.type].projectileType;
                        let base_vel = PROJECTILES[type].velocity;
                        let true_vel = { x: Math.cos(theta) * base_vel, y: Math.sin(theta) * base_vel };
                        let proj_vel = { x: true_vel.x + (Math.sign(true_vel.x) === Math.sign(this.velocity.x) ? this.velocity.x / 2 : 0),
                                         y: true_vel.y + (Math.sign(true_vel.y) === Math.sign(this.velocity.y) ? this.velocity.y / 2 : 0) };
                        let projectile = new Projectile(this.game, 
                                                        this.BB.center.x - 16 * PARAMS.PROJECTILE_SCALE + 4 * Math.cos(theta) * PARAMS.SCALE, 
                                                        this.BB.center.y - 16 * PARAMS.PROJECTILE_SCALE + 4 * Math.sin(theta) * PARAMS.SCALE, 
                                                        theta, true, type, this.BB.center, 
                                                        WEAPONS[this.weapon.type].base_damage + WEAPONS[this.weapon.type].damageInc * this.weapon.attack);
                        projectile.velocity = proj_vel;
                        this.game.addEntity(projectile);
                        switch(this.weapon.type) {
                            case 0:
                            case 1:
                                ASSET_MANAGER.playAsset("./audio/sword.mp3");
                                break;
                            case 2:
                            case 3:
                                ASSET_MANAGER.playAsset("./audio/whip.mp3");
                                break;
                            case 4:
                            case 5:
                                ASSET_MANAGER.playAsset("./audio/bow.mp3");
                                break;
                        }
                        
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

        if (PARAMS.DEBUG === true && this.game.clicked) {
            let point = {x: this.game.click.x + this.game.camera.x, y: this.game.click.y + this.game.camera.y};
            console.log(`{type: Zombie, x:  ${Math.floor(point.x /32) + 0.5}, y: ${Math.floor(point.y /32) + 0.5}},`);
            // console.log(this.game.camera.x);
            // console.log(this.game.camera.y);
        }
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

        if (this.state !== 4 && this.weaponData.length > 1) {
            if (this.game.weaponChange && !this.weaponChangeFlag) {
                this.weaponChangeFlag = true;
                this.updateWeaponIndex();
                this.weapon = this.weaponData[this.weaponIndex];
                this.ability1Timer = 0;
                this.ability2Timer = 0;
                this.ability3Timer = 0;
                this.loadAnimations();
            } else if (!this.game.weaponChange) {
                this.weaponChangeFlag = false;
            }
        }

        // check for coins
        if (this.state !== 4) {
            this.game.npcEntities.forEach(entity => {
                if (entity instanceof Coin && this.collisionBB.collide(entity.collisionBB)) {
                    this.currencyCount += entity.value;
                    entity.removeFromWorld = true;
                    ASSET_MANAGER.playAsset("./audio/coin.wav");
                }
            });
        }

        // initialize enemy remaining arrow
        if (this.state !== 4 && this.game.livingEntities.length <= 6 && !PARAMS.GAMEOVER) { // create a guide arrow when 5 or less enemies remain
            let enemyLocList = [];
            this.game.livingEntities.forEach(entity => {
                if (!(entity instanceof Hero || entity instanceof Druid || entity instanceof DruidBird || entity instanceof DruidHound || entity instanceof DruidBeast) && entity.hp > 0) { // we have a living enemy
                    enemyLocList.push(entity.BB.center);
                }
            });
            if (enemyLocList.length > 0) { // sort by proximity to hero
                enemyLocList.sort((loc1, loc2) => distance(this.BB.center, loc1) - distance(this.BB.center, loc2));
                if (!this.addFlag) {
                    this.enemyArrow = new GuidingArrow(this.game, enemyLocList[0].x, enemyLocList[0].y, false, false);
                    this.game.addEntity(this.enemyArrow);
                    this.addFlag = true;
                } else {
                    this.enemyArrow.originX = enemyLocList[0].x;
                    this.enemyArrow.originY = enemyLocList[0].y;
                }
            }
        } else if (this.enemyArrow && PARAMS.GAMEOVER) { // remove guiding arrow
            this.enemyArrow.removeFromWorld = true;
            this.addFlag = false;
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

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
        this.hitBB = new BoundingBox(this.x + 12 * PARAMS.SCALE, this.y + 12 * PARAMS.SCALE, 8 * PARAMS.SCALE, 8 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.hitBB.x + 0.25 * PARAMS.SCALE, this.hitBB.y + 4 * PARAMS.SCALE, 7.5 * PARAMS.SCALE, 6 * PARAMS.SCALE);
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

    updateWeaponIndex() {
        let flag = 0;
        while (flag === 0) {
            if (this.weaponIndex >= 5) {
                this.weaponIndex = 0;
                flag = 1;
            } else if (this.weaponData[this.weaponIndex + 1] === undefined) {
                this.weaponIndex++;
            }
            else {
                this.weaponIndex++
                flag = 1;
            }
        }
    }

    updateWeaponList() {
        this.weaponData = [];
        for (let i = 0; i <= 5; i++) {
            if (saveState.weapons[i].bought !== false) {
                this.weaponData.push({type: i, x: this.weaponPixelData[i].x, y: this.weaponPixelData[i].y, attack: saveState.weapons[i].attack, dexterity: saveState.weapons[i].dexterity});
            }
        }
        this.loadAnimations();
    }
};


class ElementBeam {

    static rotationList = [];

    constructor(game, x, y, radians, sourcePoint, type) {
        Object.assign(this, { game, x, y, radians, sourcePoint, type });
        this.roundedDegrees = Math.round(toDegrees(this.radians));
        this.roundedRadians = toRadians(this.roundedDegrees);
        this.loadSpriteSheet();
        this.friendlyProjectile = true;
        this.damage = 30;
        this.id = ++PARAMS.SHOT_ID;
        this.velocityConstant = 10;
        this.velocity = { x: Math.cos(this.roundedRadians) * this.velocityConstant, 
                          y: Math.sin(this.roundedRadians) * this.velocityConstant };
        this.lifetime = 0.5;
        this.explosionTimer = 0;
        this.explosionFlag = false;
        this.state = 0; // 0 = moving, 1 = exploding
        this.elemental = true;
        this.passable = true;
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
            if (entity.projectile_collideable && this.hitBB.collide(entity.BB)) { 
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

