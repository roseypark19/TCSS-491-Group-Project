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
                    this.game.addEntity(props[12].base(this.game, 138 * PARAMS.BLOCKWIDTH, 102 * PARAMS.BLOCKWIDTH, true)); 
                    this.game.addEntity(props[12].base(this.game, 166 * PARAMS.BLOCKWIDTH, 102 * PARAMS.BLOCKWIDTH, true)); 
                    // well
                    this.game.addEntity(props[13].base(this.game, 199.5 * PARAMS.BLOCKWIDTH, 140 * PARAMS.BLOCKWIDTH, true)); 
                    // mailboxes
                    this.game.addEntity(props[14].base(this.game, 190 * PARAMS.BLOCKWIDTH, 114 * PARAMS.BLOCKWIDTH, true)); // townhall
                    this.game.addEntity(props[14].base(this.game, 257 * PARAMS.BLOCKWIDTH, 122 * PARAMS.BLOCKWIDTH, true)); // right shop
                    this.game.addEntity(props[14].base(this.game, 238 * PARAMS.BLOCKWIDTH, 78 * PARAMS.BLOCKWIDTH, true)); // top right (4)
                    this.game.addEntity(props[14].base(this.game, 233 * PARAMS.BLOCKWIDTH, 78 * PARAMS.BLOCKWIDTH, true)); // top right (3)
                    this.game.addEntity(props[14].base(this.game, 214 * PARAMS.BLOCKWIDTH, 78 * PARAMS.BLOCKWIDTH, true)); // top right (2)
                    this.game.addEntity(props[14].base(this.game, 209 * PARAMS.BLOCKWIDTH, 78 * PARAMS.BLOCKWIDTH, true)); // top right (1)
                    this.game.addEntity(props[14].base(this.game, 238 * PARAMS.BLOCKWIDTH, 198 * PARAMS.BLOCKWIDTH, true)); // bottom right
                    this.game.addEntity(props[14].base(this.game, 113 * PARAMS.BLOCKWIDTH, 162 * PARAMS.BLOCKWIDTH, true)); // bottom left shop
                    this.game.addEntity(props[14].base(this.game, 81.5 * PARAMS.BLOCKWIDTH, 106 * PARAMS.BLOCKWIDTH, true)); // left (1)
                    this.game.addEntity(props[14].base(this.game, 109.5 * PARAMS.BLOCKWIDTH, 106 * PARAMS.BLOCKWIDTH, true)); // left (2)
                    this.game.addEntity(props[14].base(this.game, 118 * PARAMS.BLOCKWIDTH, 66 * PARAMS.BLOCKWIDTH, true)); // upper left (1)
                    this.game.addEntity(props[14].base(this.game, 133 * PARAMS.BLOCKWIDTH, 66 * PARAMS.BLOCKWIDTH, true)); // upper left (2)

                    // flowers
                    this.game.addEntity(props[15].base(this.game, 117 * PARAMS.BLOCKWIDTH, 170 * PARAMS.BLOCKWIDTH, true)); 
                    this.game.addEntity(props[16].base(this.game, 256 * PARAMS.BLOCKWIDTH, 207 * PARAMS.BLOCKWIDTH, true)); // bottom right (1)
                    this.game.addEntity(props[17].base(this.game, 266 * PARAMS.BLOCKWIDTH, 207 * PARAMS.BLOCKWIDTH, true)); // bottom right (2)  
                    this.game.addEntity(props[16].base(this.game, 264 * PARAMS.BLOCKWIDTH, 207 * PARAMS.BLOCKWIDTH, true)); // bottom right (3)
                    this.game.addEntity(props[17].base(this.game, 94 * PARAMS.BLOCKWIDTH, 114 * PARAMS.BLOCKWIDTH, true)); // left (1)
                    this.game.addEntity(props[16].base(this.game, 120 * PARAMS.BLOCKWIDTH, 115 * PARAMS.BLOCKWIDTH, true)); // left (2)
                    this.game.addEntity(props[15].base(this.game, 121.5 * PARAMS.BLOCKWIDTH, 75 * PARAMS.BLOCKWIDTH, true)); // top left behind
                    this.game.addEntity(props[16].base(this.game, 200 * PARAMS.BLOCKWIDTH, 93 * PARAMS.BLOCKWIDTH, true)); // top right (1)
                    this.game.addEntity(props[17].base(this.game, 211 * PARAMS.BLOCKWIDTH, 93 * PARAMS.BLOCKWIDTH, true)); // top right (2)
                    this.game.addEntity(props[16].base(this.game, 160 * PARAMS.BLOCKWIDTH, 136 * PARAMS.BLOCKWIDTH, true)); // middle left (1)
                    this.game.addEntity(props[17].base(this.game, 166 * PARAMS.BLOCKWIDTH, 143 * PARAMS.BLOCKWIDTH, true)); // middle left (2)
                    this.game.addEntity(props[16].base(this.game, 160 * PARAMS.BLOCKWIDTH, 150 * PARAMS.BLOCKWIDTH, true)); // middle left (3)
                    this.game.addEntity(props[16].base(this.game, 206 * PARAMS.BLOCKWIDTH, 136 * PARAMS.BLOCKWIDTH, true)); // middle right (1)
                    this.game.addEntity(props[17].base(this.game, 212 * PARAMS.BLOCKWIDTH, 143 * PARAMS.BLOCKWIDTH, true)); // middle right (2)
                    this.game.addEntity(props[16].base(this.game, 206 * PARAMS.BLOCKWIDTH, 150 * PARAMS.BLOCKWIDTH, true)); // middle right (3)
                    
                    // chicken coop
                    this.game.addEntity(props[18].base(this.game, 181 * PARAMS.BLOCKWIDTH, 60.5 * PARAMS.BLOCKWIDTH, true)); // middle right (3)

                    // shops
                    this.game.addEntity(props[19].base(this.game, 237 * PARAMS.BLOCKWIDTH, 110 * PARAMS.BLOCKWIDTH, true)); // weapons shop
                    this.game.addEntity(props[20].base(this.game, 117 * PARAMS.BLOCKWIDTH, 150 * PARAMS.BLOCKWIDTH, true)); // stats shop
                    // logs
                    this.game.addEntity(props[21].base(this.game, 156 * PARAMS.BLOCKWIDTH, 186 * PARAMS.BLOCKWIDTH, true)); // bottom middle
                    this.game.addEntity(props[21].base(this.game, 52 * PARAMS.BLOCKWIDTH, 162 * PARAMS.BLOCKWIDTH, true)); // left
                    this.game.addEntity(props[21].base(this.game, 265 * PARAMS.BLOCKWIDTH, 80 * PARAMS.BLOCKWIDTH, true)); // right
                    this.game.addEntity(props[21].base(this.game, 100 * PARAMS.BLOCKWIDTH, 37 * PARAMS.BLOCKWIDTH, true)); // top left

                    // anvil
                    this.game.addEntity(props[22].base(this.game, 204 * PARAMS.BLOCKWIDTH, 90 * PARAMS.BLOCKWIDTH, true)); // right shop
                    // water
                    this.game.addEntity(props[23].base(this.game, 182 * PARAMS.BLOCKWIDTH, 166 * PARAMS.BLOCKWIDTH, true)); // right shop
                    
                    this.hero = new Hero(this.game, 1250, 1100);
                    this.game.addEntity(this.hero);

                    // bulletin boards
                    this.game.addEntity(props[12].topper(this.game, 138 * PARAMS.BLOCKWIDTH, 102 * PARAMS.BLOCKWIDTH, true)); 
                    this.game.addEntity(props[12].topper(this.game, 166 * PARAMS.BLOCKWIDTH, 102 * PARAMS.BLOCKWIDTH, true)); 
                    // well
                    this.game.addEntity(props[13].topper(this.game, 199.5 * PARAMS.BLOCKWIDTH, 140 * PARAMS.BLOCKWIDTH, true));
                    // flowers
                    this.game.addEntity(props[16].topper(this.game, 256 * PARAMS.BLOCKWIDTH, 207 * PARAMS.BLOCKWIDTH, true)); // bottom right (1) 
                    this.game.addEntity(props[17].topper(this.game, 266 * PARAMS.BLOCKWIDTH, 207 * PARAMS.BLOCKWIDTH, true)); // bottom right (2) 
                    this.game.addEntity(props[16].topper(this.game, 264 * PARAMS.BLOCKWIDTH, 207 * PARAMS.BLOCKWIDTH, true)); // bottom right (3) 
                    this.game.addEntity(props[17].topper(this.game, 94 * PARAMS.BLOCKWIDTH, 114 * PARAMS.BLOCKWIDTH, true)); // left (1)
                    this.game.addEntity(props[16].topper(this.game, 120 * PARAMS.BLOCKWIDTH, 115 * PARAMS.BLOCKWIDTH, true)); // left (2
                    this.game.addEntity(props[16].topper(this.game, 200 * PARAMS.BLOCKWIDTH, 93 * PARAMS.BLOCKWIDTH, true)); // top right (1)
                    this.game.addEntity(props[17].topper(this.game, 211 * PARAMS.BLOCKWIDTH, 93 * PARAMS.BLOCKWIDTH, true)); // top right (2)
                    this.game.addEntity(props[16].topper(this.game, 160 * PARAMS.BLOCKWIDTH, 136 * PARAMS.BLOCKWIDTH, true)); // middle left (1)
                    this.game.addEntity(props[17].topper(this.game, 166 * PARAMS.BLOCKWIDTH, 143 * PARAMS.BLOCKWIDTH, true)); // middle left (2)
                    this.game.addEntity(props[16].topper(this.game, 160 * PARAMS.BLOCKWIDTH, 150 * PARAMS.BLOCKWIDTH, true)); // middle left (3)
                    this.game.addEntity(props[16].topper(this.game, 206 * PARAMS.BLOCKWIDTH, 136 * PARAMS.BLOCKWIDTH, true)); // middle right (1)
                    this.game.addEntity(props[17].topper(this.game, 212 * PARAMS.BLOCKWIDTH, 143 * PARAMS.BLOCKWIDTH, true)); // middle right (2)
                    this.game.addEntity(props[16].topper(this.game, 206 * PARAMS.BLOCKWIDTH, 150 * PARAMS.BLOCKWIDTH, true)); // middle right (3)
                    
                    // weapons shop
                    this.game.addEntity(props[19].topper(this.game, 237 * PARAMS.BLOCKWIDTH, 110 * PARAMS.BLOCKWIDTH, true)); 
                    // stats shop
                    this.game.addEntity(props[20].topper(this.game, 117 * PARAMS.BLOCKWIDTH, 150 * PARAMS.BLOCKWIDTH, true)); 

                    

                } else {
                    // add a regular hero -- to come later!
                }
            } else {
                this.loadLayer(level[layer_name], level, isOverworld);
            }
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