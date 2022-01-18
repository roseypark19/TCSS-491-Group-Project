function genProp(game, x, y, centered, spritePath, spriteX, spriteY, width, height, collideable, propID, scale = PARAMS.SCALE) {
    return new PropTile(game,
                        x - (centered ? props[propID].width * scale / 2 : 0),
                        y - (centered ? props[propID].height * scale / 2 : 0),
                        spritePath,
                        spriteX,
                        spriteY,
                        spriteX - props[propID].topX,
                        spriteY - props[propID].topY,
                        width,
                        height,
                        collideable,
                        scale);
};

const props = {
    1: {
        topX: 9,         // the top X coordinate of the ENTIRE prop - shadows EXCLUDED
        topY: 140,       // the top Y coordinate of the ENTIRE prop - shadows EXCLUDED
        width: 22,       // the width of the entire prop - shadows EXCLUDED
        height: 8,       // the height of the entire prop - shadows EXCLUDED
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 9, 140, 22, 4, false, 1, PARAMS.OVERWORLD_SCALE),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 9, 144, 22, 4, false, 1, PARAMS.OVERWORLD_SCALE)
    },

    2: {
        topX: 69,
        topY: 140,
        width: 22,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 69, 140, 22, 4, false, 2, PARAMS.OVERWORLD_SCALE),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 69, 144, 22, 4, false, 2, PARAMS.OVERWORLD_SCALE)
    },

    10 : {
        topX: 155,
        topY: 3,
        width: 21,
        height: 25,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props_shadows.png", 153, 18, 18, 10, false, 10),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 161, 23, 10, 5, true, 10),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 155, 3, 21, 20, false, 10)    
    },

    11 : {
        topX: 2,
        topY: 40,
        width: 51,
        height: 24,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 2, 55, 51, 9, true, 11),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 2, 40, 51, 15, false, 11)    
    },
};