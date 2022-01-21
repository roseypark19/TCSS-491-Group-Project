// function genProp(game, x, y, centered, spritePath, spriteX, spriteY, width, height, collideable, propID, scale = PARAMS.SCALE) {
//     return new PropTile(game,
//                         x - (centered ? (props[propID].width + props[propID].shadowDiffX) * scale / 2 : 0),
//                         y - (centered ? (props[propID].height + props[propID].shadowDiffY) * scale / 2 : 0),
//                         spritePath,
//                         spriteX,
//                         spriteY,
//                         spriteX - props[propID].topX,
//                         spriteY - props[propID].topY,
//                         width,
//                         height,
//                         collideable,
//                         scale);
// };
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
        topX: 9,
        topY: 140,
        width: 22,
        height: 8,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 9, 140, 22, 4, false, 1, PARAMS.OVERWORLD_SCALE),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 9, 144, 22, 4, false, 1, PARAMS.OVERWORLD_SCALE)
    },

    2: {
        topX: 69,
        topY: 140,
        width: 22,
        height: 8,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 69, 140, 22, 4, false, 2, PARAMS.OVERWORLD_SCALE),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 69, 144, 22, 4, false, 2, PARAMS.OVERWORLD_SCALE)
    },

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

    12 : { // town bulletin board
        topX: 106,
        topY: 90,
        width: 19,
        height: 13,
        shadowDiffX: 0, 
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 106, 95, 19, 8, true, 12),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 106, 90, 19, 8, false, 12)    
    },

    13 : { // town well
        topX: 12,
        topY: 49,
        width: 17,
        height: 30,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 12, 64, 17, 15, true, 13),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 12, 49, 17, 15, false, 13)    
    },

    14 : { // town mailbox (no valid topper)
        topX: 50,
        topY: 70,
        width: 5,
        height: 9,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 50, 70, 5, 9, true, 14),
    },

    15 : { // small flower (no valid topper)
        topX: 56,
        topY: 54,
        width: 7,
        height: 9,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 56, 54, 7, 9, true, 15),
    },

    16 : { // medium flower 
        topX: 48,
        topY: 52,
        width: 8,
        height: 11,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 48, 57, 8, 6, true, 16),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 48, 52, 8, 6, false, 16)    
    },

    17 : { // large flower 
        topX: 36,
        topY: 51,
        width: 9,
        height: 12,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 36, 58, 9, 6, true, 17),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 36, 51, 9, 9, false, 17)    
    },

    18 : { // chicken coop (no valid topper)
        topX: 33,
        topY: 64,
        width: 15,
        height: 16,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 33, 64, 15, 16, true, 18),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 0, 0, 0, 0, false, 18)    
    },

    19 : { // weapons billboard
        topX: 56,
        topY: 86,
        width: 24,
        height: 17,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 56, 96, 24, 7, true, 19),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 56, 86, 24, 12, false, 19)    
    },

    20 : { // stats billboard
        topX: 9,
        topY: 86,
        width: 23,
        height: 17,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 9, 96, 23, 7, true, 20),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 9, 86, 23, 12, false, 20)    
    },

    21 : { // log (no valid topper)
        topX: 68,
        topY: 66,
        width: 10,
        height: 13,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 68, 66, 10, 13, true, 21),
    },

    22 : { // anvil horizontal (no valid topper)
        topX: 162,
        topY: 133,
        width: 12,
        height: 10,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 162, 133, 12, 10, true, 22)   
    },

    23 : { // water horizontal (no valid topper)
        topX: 146,
        topY: 136,
        width: 12,
        height: 11,
        shadowDiffX: 0,
        shadowDiffY: 0,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 146, 136, 12, 11, true, 23)
    },
};