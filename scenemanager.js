class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        // let destinations = [new Destination(this.game, 0, 0, {prev: {x: 0, y: 0}, next: {x: 1, y: 0}}, true), 
        //                     new Destination(this.game, 100, 0, {prev: {x: -1, y: 0}, next: {x: 0, y: 1}}, false), 
        //                     new Destination(this.game, 100, 100, {prev: {x: 0, y: -1}, next: {x: -1, y: 0}}, false), 
        //                     new Destination(this.game, 0, 100, {prev: {x: 1, y: 0}, next: {x: 0, y: 1}}, true), 
        //                     new Destination(this.game, 0, 200, {prev: {x: 0, y: -1}, next: {x: 1, y: 0}}, false), 
        //                     new Destination(this.game, 100, 200, {prev: {x: -1, y: 0}, next: {x: 1, y: 0}}, false),
        //                     new Destination(this.game, 200, 200, {prev: {x: -1, y: 0}, next: {x: 0, y: 1}}, false),
        //                     new Destination(this.game, 200, 300, {prev: {x: 0, y: -1}, next: {x: -1, y: 0}}, false),
        //                     new Destination(this.game, 100, 300, {prev: {x: 1, y: 0}, next: {x: 0, y: 1}}, true),
        //                     new Destination(this.game, 100, 400, {prev: {x: 0, y: -1}, next: {x: 1, y: 0}}, false),
        //                     new Destination(this.game, 200, 400, {prev: {x: -1, y: 0}, next: {x: 1, y: 0}}, false),
        //                     new Destination(this.game, 300, 400, {prev: {x: -1, y: 0}, next: {x: 0, y: -1}}, false),
        //                     new Destination(this.game, 300, 300, {prev: {x: 0, y: 1}, next: {x: 0, y: 0}}, true)];

        // let propsList = [props[10]];

        // for (let i = 0; i < destinations.length; i++) {
        //     this.game.addEntity(destinations[i]);
        // }
        // let pos = randomInt(200);
        // for (let i = 0; i < propsList.length; i++) {
        //     let prop = propsList[i];
            
        //     if (prop.shadow) {
        //         this.game.addEntity(prop.shadow(this.game, pos, pos, true));
        //     }
        //     if (prop.base) {
        //         this.game.addEntity(prop.base(this.game, pos, pos, true));
        //     }
        // }
        // this.hero = new TinyHero(this.game, 0, 0, destinations);
        // this.game.addEntity(this.hero);
        // for (let i = 0; i < propsList.length; i++) {
        //     let prop = propsList[i];
        //     if (prop.topper) {
        //         this.game.addEntity(prop.topper(this.game, pos, pos, true));
        //     }
        // }
        this.loadLevel(overworld, true);
    };

    clearEntities() {
        this.game.entities.forEach(entity => entity.removeFromWorld = true);
    };

    loadLevel(level, isOverworld) {
        this.clearEntities();
        for (let i = 0; i < level.layer_names.length; i++) {
            let layer_name = level.layer_names[i];
            if (layer_name === "hero") {
                if (isOverworld) {
                    this.game.addEntity(props[2].base(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].base(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.hero = new TinyHero(this.game, this.createDestinations(level));
                    this.game.addEntity(this.hero);
                    let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };
                    this.y = this.hero.destinations[0].originY - midpoint.y;
                    this.game.addEntity(props[2].topper(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].topper(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
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
        // this.y = this.hero.BB.center.y - midpoint.y;
    };

    updateAudio() {

    };

    draw(ctx) { 

    };
};