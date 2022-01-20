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
                    // bases
                    town.props.forEach(prop => this.game.addEntity(props[prop.index].base(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered)));
                    this.hero = new Hero(this.game, 1250, 1100);
                    this.game.addEntity(this.hero);
                    // toppers
                    town.props.forEach(prop => {
                        if (props[prop.index].topper) {
                            this.game.addEntity(props[prop.index].topper(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                        }
                    });
  
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

        // this code restricts x, y camera based on the town
        // if (this.hero.BB.center.x >= midpoint.x && this.hero.BB.center.x <= PARAMS.BLOCKWIDTH * PARAMS.SCALE * town.width - midpoint.x) {
        //     this.x = this.hero.BB.center.x - midpoint.x;
        // }
        // if (this.hero.BB.center.y >= midpoint.y && this.hero.BB.center.y <= PARAMS.BLOCKWIDTH * PARAMS.SCALE * town.height - midpoint.y) {
        //     this.y = this.hero.BB.center.y - midpoint.y;
        // }
    };

    updateAudio() {

    };

    draw(ctx) { 

    };
};