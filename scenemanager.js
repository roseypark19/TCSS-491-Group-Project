class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        // this.loadLevel(overworld, true);
        this.loadLevel(town, false, true);
    };

    clearEntities() {
        this.game.entities.forEach(entity => entity.removeFromWorld = true);
    };

    loadLevel(level, isOverworld, isTown) {
        this.overworld = isOverworld;
        this.clearEntities();
        for (let i = 0; i < level.layer_names.length; i++) {
            let layer_name = level.layer_names[i];
            if (layer_name === "hero") {
                if (isOverworld) {
                    this.game.addEntity(props[2].base(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].base(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    // this.hero = new TinyHero(this.game, this.createDestinations(level));
                    this.hero = new Hero(this.game, 0, 0);
                    this.game.addEntity(this.hero);
                    let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };
                    // this.y = this.hero.destinations[0].originY - midpoint.y;
                    this.game.addEntity(props[2].topper(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].topper(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                } else if (isTown) {
                    // bulletin board (left)
                    this.game.addEntity(props[12].base(this.game, 33.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 24.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false)); 
                    this.game.addEntity(props[12].base(this.game, 40.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 24.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false)); 
                    // well
                    this.game.addEntity(props[13].base(this.game, 38 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 30 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); 
                    // mailboxes
                    this.game.addEntity(props[14].base(this.game, 39.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 25.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // townhall
                    this.game.addEntity(props[14].base(this.game, 56.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 27.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // right shop
                    this.game.addEntity(props[14].base(this.game, 51.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 16.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (4)
                    this.game.addEntity(props[14].base(this.game, 50.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 16.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (3)
                    this.game.addEntity(props[14].base(this.game, 44.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 16.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (2)
                    this.game.addEntity(props[14].base(this.game, 45.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 16.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (1)
                    this.game.addEntity(props[14].base(this.game, 51.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom right
                    this.game.addEntity(props[14].base(this.game, 20.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom left shop
                    this.game.addEntity(props[14].base(this.game, 12.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 23.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left (1)
                    this.game.addEntity(props[14].base(this.game, 19.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 23.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left (2)
                    this.game.addEntity(props[14].base(this.game, 21.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 13.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // upper left (1)
                    this.game.addEntity(props[14].base(this.game, 25.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 13.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // upper left (2)

                    // flowers
                    this.game.addEntity(props[15].base(this.game, 22.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); 
                    this.game.addEntity(props[16].base(this.game, 56 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); 
                    this.game.addEntity(props[17].base(this.game, 57 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom right (2)  
                    this.game.addEntity(props[16].base(this.game, 58 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom right (3)
                    this.game.addEntity(props[17].base(this.game, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 23.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left (1)
                    this.game.addEntity(props[16].base(this.game, 22 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 23.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left (2)
                    this.game.addEntity(props[15].base(this.game, 23.35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top left behind
                    this.game.addEntity(props[16].base(this.game, 42 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 18 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (1)
                    this.game.addEntity(props[17].base(this.game, 43.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 18 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (2)
                    this.game.addEntity(props[16].base(this.game, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 29 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle left (1)
                    this.game.addEntity(props[17].base(this.game, 33.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 31 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle left (2)
                    this.game.addEntity(props[16].base(this.game, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle left (3)
                    this.game.addEntity(props[16].base(this.game, 43 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 29 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (1)
                    this.game.addEntity(props[17].base(this.game, 43.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 31 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (2)
                    this.game.addEntity(props[16].base(this.game, 43 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (3)
                    
                    // chicken coop
                    this.game.addEntity(props[18].base(this.game, 35.8 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 12 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (3)

                    // shops
                    this.game.addEntity(props[19].base(this.game, 53.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 27.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // weapons shop
                    this.game.addEntity(props[20].base(this.game, 17.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // stats shop

                    // logs
                    this.game.addEntity(props[21].base(this.game, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 43 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom middle
                    this.game.addEntity(props[21].base(this.game, 7 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left
                    this.game.addEntity(props[21].base(this.game, 67 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 29 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // right
                    this.game.addEntity(props[21].base(this.game, 17 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top left

                    // anvil
                    this.game.addEntity(props[22].base(this.game, 58 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 27.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // right shop
                    // water
                    this.game.addEntity(props[23].base(this.game, 53.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 47.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // right shop
                    
                    this.hero = new Hero(this.game, 1250, 1100);
                    this.game.addEntity(this.hero);

                    // bulletin boards
                    this.game.addEntity(props[12].topper(this.game, 33.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 24.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false)); 
                    this.game.addEntity(props[12].topper(this.game, 40.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 24.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false)); 
                    // well
                    this.game.addEntity(props[13].topper(this.game, 38 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 30 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); 
                    // flowers
                    this.game.addEntity(props[15].topper(this.game, 22.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); 
                    this.game.addEntity(props[16].topper(this.game, 56 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); 
                    this.game.addEntity(props[17].topper(this.game, 57 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom right (2)  
                    this.game.addEntity(props[16].topper(this.game, 58 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // bottom right (3)
                    this.game.addEntity(props[17].topper(this.game, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 23.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left (1)
                    this.game.addEntity(props[16].topper(this.game, 22 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 23.75 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // left (2)
                    this.game.addEntity(props[15].topper(this.game, 23.35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top left behind
                    this.game.addEntity(props[16].topper(this.game, 42 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 18 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (1)
                    this.game.addEntity(props[17].topper(this.game, 43.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 18 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // top right (2)
                    this.game.addEntity(props[16].topper(this.game, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 29 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle left (1)
                    this.game.addEntity(props[17].topper(this.game, 33.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 31 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle left (2)
                    this.game.addEntity(props[16].topper(this.game, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle left (3)
                    this.game.addEntity(props[16].topper(this.game, 43 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 29 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (1)
                    this.game.addEntity(props[17].topper(this.game, 43.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 31 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (2)
                    this.game.addEntity(props[16].topper(this.game, 43 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // middle right (3)
                    
                    this.game.addEntity(props[19].topper(this.game, 53.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 27.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // weapons shop
                    this.game.addEntity(props[20].topper(this.game, 17.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37.25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true)); // stats shop
                    
                } else {
                    // add a regular hero -- to come later!
                }
            } else {
                this.loadLayer(level[layer_name], level, isOverworld);
            }
        }

        // loads the shops for the town at the end
        if (isTown) {
            this.game.addEntity(new WeaponsShop(this.game));
            this.game.addEntity(new StatsShop(this.game));
            // this.game.addEntity(new TownSigns(this.game));
        }

    };

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
        this.x = this.hero.BB.center.x - midpoint.x;
        this.y = this.hero.BB.center.y - midpoint.y;
    };

    updateAudio() {

    };

    draw(ctx) { 

    };
};