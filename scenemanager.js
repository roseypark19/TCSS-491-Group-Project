class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.currentLevel = snow1;
        this.travelTo(snow1);
    };

    clearEntities() {
        this.game.heroIndex = undefined;
        this.game.entities.forEach(entity => entity.removeFromWorld = true);
    };

    loadLevel(level) {
        let isOverworld = level == overworld;
        let isTown = level == town;
        this.overworld = isOverworld;
        this.clearEntities();
        for (let i = 0; i < level.layer_names.length; i++) {
            let layer_name = level.layer_names[i];
            if (layer_name === "hero") {
                if (isOverworld) {
                    this.game.addEntity(props[2].base(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].base(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.hero = new TinyHero(this.game, this.createDestinations(level));
                    // this.hero = new Hero(this.game, 0, 0);
                    this.game.addEntity(this.hero);
                    let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };
                    this.y = this.hero.destinations[0].originY - midpoint.y;
                    this.game.addEntity(props[2].topper(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].topper(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));

                } else if (isTown) {
                    town.props.forEach(prop => this.game.addEntity(props[prop.index].base(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered)));
                    this.game.addEntity(new Portal(this.game, "Enter Overworld", overworld, 0, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 30 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));

                    this.game.addEntity(new Cyclops(this.game, 400, 350));
                    this.game.addEntity(new Cyclops(this.game, 200, 350));
                    this.game.addEntity(new Cyclops(this.game, 300, 350));
                    this.game.addEntity(new Cyclops(this.game, 500, 350));

                    // this.game.addEntity(new Ogre(this.game, 400, -350));
                    // this.game.addEntity(new Ogre(this.game, 200, -350));
                    // this.game.addEntity(new Ogre(this.game, 300, -350));
                    // this.game.addEntity(new Ogre(this.game, 500, -350));

                    // this.game.addEntity(new Druid(this.game, 900, 500, 6000, 0));
                    // this.game.addEntity(new DruidHound(this.game, 300, 200, 4000, 2000))
                    // this.game.addEntity(new DruidBeast(this.game, 400, 200, 2000, 0))
                    // // this.game.addEntity(new Minotaur(this.game, 400, 350, true));
                    // this.game.addEntity(new MotherSlime(this.game, 200, 350, true));
                    // this.game.addEntity(new MotherSlime(this.agame, 300, 350, true));
                    // this.game.addEntity(new MotherSlime(this.game, 400, 350, true));
                    // this.game.addEntity(new MotherSlime(this.game, 400, -450));
                    // this.game.addEntity(new MotherSlime(this.game, 200, -450));
                    // this.game.addEntity(new MotherSlime(this.game, 300, -450));
                    // this.game.addEntity(new MotherSlime(this.game, 500, -450));

                    // this.game.addEntity(new SwordedMinion(this.game, 400, 750));
                    // this.game.addEntity(new SwordedMinion(this.game, 450, 750));
                    // this.game.addEntity(new SwordedMinion(this.game, 500, 750));
                    // this.game.addEntity(new SwordedMinion(this.game, 550, 750));

                    // this.game.addEntity(new RangedMinion(this.game, 400, 550));
                    // this.game.addEntity(new RangedMinion(this.game, 450, 550));
                    // this.game.addEntity(new RangedMinion(this.game, 500, 550));
                    // this.game.addEntity(new RangedMinion(this.game, 550, 550));

                    this.hero = new Hero(this.game, 36 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero);
                    // toppers
                    town.props.forEach(prop => {
                        if (props[prop.index].topper) {
                            this.game.addEntity(props[prop.index].topper(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                        }
                    });

                } else if (this.currentLevel == snow1) {
                    // paint bottom of trees that aren't collidable
                    this.currentLevel.props.forEach(prop => {
                        if (props[prop.index].bottomNotCollidable) {
                            this.game.addEntity(props[prop.index].bottomNotCollidable(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                        }
                    });
                    // coward portal
                    this.game.addEntity(new Portal(this.game, "Leave Snow 1", overworld, 5, 16.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 63.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 11.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 67 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 440));
                    // leaving portal
                    this.game.addEntity(new Portal(this.game, "Complete Snow 1", overworld, 2, 96 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 65 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 89 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 71 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 545));

                    this.addPropBases();
                    
                    this.hero = new Hero(this.game, 15.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                                         60 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero); 

                    this.addPropToppers();
                    this.addPropShadows();

                } else {
                    // add a regular hero -- to come later!
                }
            } else {
                this.loadLayer(level[layer_name], level, isOverworld);
            }
        }

        // loads the shops for the town at the end
        if (isTown) {
            this.game.addEntity(new Hen(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Hen(this.game, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 16 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new Chick(this.game, 34 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Chick(this.game, 36 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new WeaponsShop(this.game));
            this.game.addEntity(new StatsShop(this.game));
            this.game.addEntity(new Dialogue(this.game, "Visit the shops to upgrade stats!", true, 34.5, 22, 33, 26, 3, 0.5)); // left bulletin board
            this.game.addEntity(new Dialogue(this.game, "Aim and attack with the mouse!", true, 41.5, 22, 40 , 26, 3, 0.5));   // right bulletin board
            
        } else if (isOverworld) {
            // add the portals for level nodes
            overworld.destinations.forEach(destination => {
                if (destination.stoppable) {
                    let pX = destination.origin.x;
                    let pY = destination.origin.y;
                    this.game.addEntity(new Portal(this.game, "Enter " + destination.levelName, destination.level, -1, 
                                                   pX * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   pY * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   (pX - ((10 + destination.levelName.length) / 2)) * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   (pY + 3) * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   destination.buttonWidth));
                }
            });
            
        } else if (this.currentLevel == snow1) {
            this.game.addEntity(new Dialogue(this.game, "It's a hole!", true, 4, 15.5, 1, 17, 1, 1, true)); // upper left sign
            this.game.addEntity(new Dialogue(this.game, "Welcome to snow 1!", true, 19.5, 56.5, 21, 58, 2, 1, true)); // upper left sign
            this.game.addEntity(new Penguin(this.game, 52 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 50 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 41.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 50 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 48 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new Penguin(this.game, 36 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 45 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 50 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 55 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 57 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 45 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new Penguin(this.game, 1.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            this.currentLevel.topper_props.forEach(prop => {
                if (props[prop.index].base) {
                    this.game.addEntity(props[prop.index].base(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                }
            });
            this.currentLevel.topper_props.forEach(prop => {
                if (props[prop.index].shadow) {
                    this.game.addEntity(props[prop.index].shadow(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                }
            });
        }
    };

    addPropBases() {
        this.currentLevel.props.forEach(prop => {
            if (props[prop.index].base) {
                this.game.addEntity(props[prop.index].base(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
            }
        });
    }
    addPropToppers() {
        this.currentLevel.props.forEach(prop => {
            if (props[prop.index].topper) {
                this.game.addEntity(props[prop.index].topper(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
            }
        });
    }
    addPropShadows() {
        this.currentLevel.props.forEach(prop => {
            if (props[prop.index].shadow) {
                this.game.addEntity(props[prop.index].shadow(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
            }
        });
    }

    createDestinations(level) {
        let destinations = [];
        for (let i = 0; i < level.destinations.length; i++) {
            let dest = level.destinations[i];
            destinations.push({originX: dest.origin.x * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 
                               originY: dest.origin.y * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 
                               neighbors: dest.neighbors, stoppable: dest.stoppable});
        }
        return destinations;
    };

    loadLayer(property, level, isOverworld) {
        for (let i = 0; i < level.height; i++) {
            for  (let j = 0; j < level.width; j++) {
                let cell = level.width * i + j;
                let spriteCode = property.data[cell];
                let blockwidth = isOverworld ? PARAMS.BLOCKWIDTH / 2 : PARAMS.BLOCKWIDTH;
                let scale = isOverworld ? PARAMS.OVERWORLD_SCALE : PARAMS.SCALE
                if (spriteCode !== -1) {
                    let tile = new MapTile(this.game, 
                                           j * blockwidth * scale,
                                           i * blockwidth * scale,
                                           property.spritesheet,
                                           blockwidth * (spriteCode % property.imageWidth),
                                           blockwidth * (Math.floor(spriteCode / property.imageWidth)),
                                           blockwidth,
                                           scale,
                                           property.collideable);
                    if (property.hasOwnProperty("custom_animations") && 
                            property.custom_animations.hasOwnProperty(spriteCode)) {
                        let animData = property.custom_animations[spriteCode];
                        tile.alterTileAnimation(animData.frameCount, animData.frameDuration, animData.framePadding);
                    }
                    this.game.addEntity(tile);
                }
            }
        }
    };


    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };

        if (this.currentLevel != overworld) {
            // this code restricts x, y camera based on the town
            if (this.hero.BB.center.x >= midpoint.x && this.hero.BB.center.x <= PARAMS.BLOCKWIDTH * PARAMS.SCALE * this.currentLevel.width - midpoint.x) {
                this.x = this.hero.BB.center.x - midpoint.x;
            }
            if (this.hero.BB.center.y >= midpoint.y && this.hero.BB.center.y <= PARAMS.BLOCKWIDTH * PARAMS.SCALE * this.currentLevel.height - midpoint.y) {
                this.y = this.hero.BB.center.y - midpoint.y;
            }
        } else {
            this.x = this.hero.BB.center.x - midpoint.x;
            if (!this.overworld) {
                this.y = this.hero.BB.center.y - midpoint.y;
            }
        }
     
        
    };

    travelTo(level) {
        this.currentLevel = level;
        this.loadLevel(level, level == overworld, level == town);
    };

    updateAudio() {

    };

    draw(ctx) { 

    };
};