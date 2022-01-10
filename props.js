function genProp(game, x, y, centered, spritePath, spriteX, spriteY, width, height, collideable, propID) {
    return new PropTile(game,
                        x - (centered ? (props[propID].width + props[propID].shadowDiffX) * PARAMS.SCALE / 2 : 0),
                        y - (centered ? (props[propID].height + props[propID].shadowDiffY) * PARAMS.SCALE / 2 : 0),
                        spritePath,
                        spriteX,
                        spriteY,
                        spriteX - props[propID].topX,
                        spriteY - props[propID].topY,
                        width,
                        height,
                        collideable);
};

const props = {
    10 : {
        topX: 153,
        topY: 3,
        width: 23,
        height: 25,
        shadowDiffX: 2,
        shadowDiffY: 0,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props_shadows.png", 153, 18, 18, 10, false, 10),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 161, 23, 10, 5, true, 10),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 155, 3, 21, 20, false, 10)    
    },

    11 : {
        topX: 2,
        topY: 40,
        width: 51,
        height: 24,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 2, 55, 51, 9, true, 11),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 2, 40, 51, 15, false, 11)    
    },
};