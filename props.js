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
    1: { // wooden overworld bridge
        topX: 9,         // the top X coordinate of the ENTIRE prop - shadows EXCLUDED
        topY: 140,       // the top Y coordinate of the ENTIRE prop - shadows EXCLUDED
        width: 22,       // the width of the entire prop - shadows EXCLUDED
        height: 8,       // the height of the entire prop - shadows EXCLUDED
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 9, 140, 22, 4, false, 1, PARAMS.OVERWORLD_SCALE),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 9, 144, 22, 4, false, 1, PARAMS.OVERWORLD_SCALE)
    },

    2: { // steel overworld bridge
        topX: 69,
        topY: 140,
        width: 22,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 69, 140, 22, 4, false, 2, PARAMS.OVERWORLD_SCALE),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/overworld/structures.png", 69, 144, 22, 4, false, 2, PARAMS.OVERWORLD_SCALE)
    },

    10 : { // plains naked tree
        topX: 155,
        topY: 3,
        width: 21,
        height: 25,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props_shadows.png", 153, 18, 18, 10, false, 10),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 161, 23, 10, 5, true, 10),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 155, 3, 21, 20, false, 10)    
    },

    11 : { // plains large hill
        topX: 2,
        topY: 40,
        width: 51,
        height: 24,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 2, 55, 51, 9, true, 11),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/plains/props.png", 2, 40, 51, 15, false, 11)    
    },

    12 : { // town bulletin board
        topX: 106,
        topY: 90,
        width: 19,
        height: 13,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 106, 95, 19, 8, true, 12),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 106, 90, 19, 8, false, 12)    
    },

    13 : { // town well
        topX: 12,
        topY: 49,
        width: 17,
        height: 30,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 12, 64, 17, 15, true, 13),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 12, 49, 17, 15, false, 13)    
    },

    14 : { // town mailbox (no valid topper)
        topX: 50,
        topY: 70,
        width: 5,
        height: 9,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 50, 70, 5, 9, true, 14),
    },

    15 : { // small flower (no valid topper)
        topX: 56,
        topY: 54,
        width: 7,
        height: 9,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 56, 54, 7, 9, true, 15),
    },

    16 : { // medium flower 
        topX: 48,
        topY: 52,
        width: 8,
        height: 11,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 48, 57, 8, 6, true, 16),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 48, 52, 8, 6, false, 16)    
    },

    17 : { // large flower 
        topX: 36,
        topY: 51,
        width: 9,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 36, 58, 9, 6, true, 17),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 36, 51, 9, 9, false, 17)    
    },

    18 : { // chicken coop (no valid topper)
        topX: 33,
        topY: 64,
        width: 15,
        height: 16,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 33, 64, 15, 16, true, 18),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 0, 0, 0, 0, false, 18)    
    },

    19 : { // weapons billboard
        topX: 56,
        topY: 86,
        width: 24,
        height: 17,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 56, 96, 24, 7, true, 19),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 56, 86, 24, 12, false, 19)    
    },

    20 : { // stats billboard
        topX: 9,
        topY: 86,
        width: 23,
        height: 17,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 9, 96, 23, 7, true, 20),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 9, 86, 23, 12, false, 20)    
    },

    21 : { // log (no valid topper)
        topX: 68,
        topY: 66,
        width: 10,
        height: 13,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 68, 66, 10, 13, true, 21),
    },

    22 : { // anvil horizontal (no valid topper)
        topX: 162,
        topY: 133,
        width: 12,
        height: 10,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 162, 133, 12, 10, true, 22)   
    },

    23 : { // water horizontal (no valid topper)
        topX: 146,
        topY: 136,
        width: 12,
        height: 11,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/town/props.png", 146, 136, 12, 11, true, 23)
    },







// snow props
    60: { // snow small flowers
        topX: 9,
        topY: 10,
        width: 5,
        height: 5,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 9, 10, 5, 5, false, 60)
    },

    61: { // snow bush
        topX: 24,
        topY: 17,
        width: 7,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 24, 17, 7, 7, false, 61)
    },

    62: { // snow dead bush
        topX: 24,
        topY: 24,
        width: 8,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 24, 24, 8, 7, false, 62)
    },

    63: { // snow grass
        topX: 25,
        topY: 40,
        width: 6,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 25, 40, 6, 7, false, 63)
    },

    64: { // snow water hole
        topX: 10,
        topY: 42,
        width: 6,
        height: 6,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 10, 42, 6, 6, true, 64)
    },

    65: { // snow small log
        topX: 4,
        topY: 17,
        width: 8,
        height: 5,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 4, 17, 8, 5, false, 65)
    },

    66: { // snow large log
        topX: 2,
        topY: 25,
        width: 13,
        height: 6,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 2, 25, 13, 6, false, 66)
    },

    67: { // snow small rock
        topX: 40,
        topY: 40,
        width: 8,
        height: 9,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 40, 40, 8, 9, false, 67)
    },

    68: { // snow broken ice
        topX: 144,
        topY: 56,
        width: 8,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 144, 56, 8, 7, false, 68)
    },

    69: { // snow small ice
        topX: 144,
        topY: 48,
        width: 8,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 144, 48, 8, 7, false, 69)
    },

    70: { // snow small ice 2
        topX: 145,
        topY: 41,
        width: 7,
        height: 6,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 145, 41, 7, 6, false, 70)
    },

    71: { // snowman 3
        topX: 34,
        topY: 54,
        width: 11,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 34, 58, 11, 4, true, 71),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 34, 54, 11, 4, false, 71)
    },

    72: { // snowman 5
        topX: 66,
        topY: 51,
        width: 10,
        height: 11,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 66, 56, 10, 6, true, 72),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 66, 51, 10, 5, false, 72)
    },

    73: { // snowman 7
        topX: 98,
        topY: 51,
        width: 11,
        height: 11,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 98, 57, 11, 5, true, 73),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 98, 51, 11, 6, false, 73)
    },

    74: { // snow sign
        topX: 2,
        topY: 33,
        width: 10,
        height: 9,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 2, 38, 10, 4, true, 74),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsAndShadows.png", 2, 33, 10, 5, false, 74)
    },


    75: { // tall rock
        topX: 56,
        topY: 32,
        width: 8,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 56, 41, 8, 6, true, 75),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 56, 32, 8, 9, false, 75),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsShadows.png", 54, 41, 8, 15, false, 75)
    },
    
    76: { // medium rock
        topX: 72,
        topY: 35,
        width: 8,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 72, 42, 8, 5, true, 76),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 72, 35, 8, 7, false, 76),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsShadows.png", 70, 35, 8, 12, false, 76)
    },

    77: { // fat rock
        topX: 88,
        topY: 32,
        width: 16,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 88, 40, 16, 8, true, 77),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 88, 32, 16, 8, false, 77),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsShadows.png", 86, 32, 16, 15, false, 77)
    },

    78: { // fat spikey rock
        topX: 112,
        topY: 24,
        width: 16,
        height: 23,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 112, 37, 16, 10, true, 78),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 112, 24, 16, 13, false, 78),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsShadows.png", 110, 24, 16, 23, false, 78)
    },

    79: { // large ice
        topX: 137,
        topY: 8,
        width: 14,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 137, 16, 14, 7, true, 79),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 137, 8, 14, 8, false, 79),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsShadows.png", 135, 8, 14, 15, false, 79)
    },

    80: { // medium ice
        topX: 144,
        topY: 27,
        width: 8,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 144, 33, 8, 6, true, 80),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsNoShadows.png", 144, 27, 8, 7, false, 80),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/propsShadows.png", 142, 27, 8, 12, false, 80)
    },

    81: { // straight tree partial snow
        topX: 41,
        topY: 7,
        width: 23,
        height: 39,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 41, 39, 23, 7, false, 81),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 49, 40, 6, 5, true, 81),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 41, 7, 23, 33, false, 81),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 40, 7, 23, 39, false, 81)
    },

    81.5: { // straight tree partial snow
        topX: 41,
        topY: 7,
        width: 23,
        height: 39,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 41, 7, 23, 39, true, 81.5),
    },

    82: { // straight tree lots of snow
        topX: 73,
        topY: 7,
        width: 23,
        height: 39,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 73, 39, 23, 7, false, 82),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 79, 40, 6, 5, true, 82),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 73, 7, 23, 33, false, 82),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 71, 7, 23, 39, false, 82)
    },

    82.5:{ // straight tree (topper props)
        topX: 73,
        topY: 7,
        width: 23,
        height: 39,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 73, 7, 23, 39, false, 82.5),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 71, 7, 23, 39, false, 82.5)
    },

    83: { // left tree partial snow
        topX: 42,
        topY: 49,
        width: 20,
        height: 39,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 42, 81, 20, 7, false, 83),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 50, 81, 5, 5, true, 83),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 42, 49, 20, 32, false, 83),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 42, 49, 20, 39, false, 83)
    },

    84: { // left tree lots of snow
        topX: 74,
        topY: 49,
        width: 20,
        height: 39,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 74, 81, 20, 7, false, 84),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 82, 81, 5, 5, true, 84),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 74, 49, 20, 32, false, 84),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 74, 49, 20, 39, false, 84)
    },

    85: { // right tree partial snow
        topX: 42,
        topY: 89,
        width: 20,
        height: 39,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 42, 120, 20, 7, false, 85),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 50, 120, 5, 5, true, 85),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 42, 89, 20, 32, false, 85),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 42, 89, 20, 39, false, 85)
    },

    86: { // right tree partial snow
        topX: 74,
        topY: 89,
        width: 20,
        height: 39,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 74, 120, 20, 7, false, 86),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 82, 120, 5, 5, true, 86),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/trees.png", 74, 89, 20, 32, false, 86),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/snow/treesShadows.png", 74, 89, 20, 39, false, 86)
    },

// desert props
    90: { // small rock left point
        topX: 8,
        topY: 9,
        width: 8,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 8, 9, 8, 7, false, 90),
    },

    91: { // small rock right point
        topX: 8,
        topY: 17,
        width: 8,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 8, 17, 8, 7, false, 91),
    },

    92: { // small rock left point
        topX: 9,
        topY: 27,
        width: 7,
        height: 5,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 9, 27, 7, 5, false, 92),
    },

    93: { // animal left
        topX: 24,
        topY: 10,
        width: 16,
        height: 6,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 24, 10, 16, 6, false, 93),
    },

    94: { // animal right
        topX: 24,
        topY: 26,
        width: 16,
        height: 6,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 24, 26, 16, 6, false, 94),
    },

    95: { // bush 1
        topX: 49,
        topY: 11,
        width: 5,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 49, 11, 5, 8, false, 95),
    },
    
    96: { // bush 2
        topX: 50,
        topY: 20,
        width: 6,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 50, 20, 6, 8, false, 96),
    },

    97: { // bush 3
        topX: 49,
        topY: 16,
        width: 7,
        height: 7,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 49, 16, 7, 7, false, 97),
    },

    98: { // grass 1
        topX: 57,
        topY: 10,
        width: 5,
        height: 5,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 57, 10, 5, 5, false, 98),
    },

    99: { // grass 2
        topX: 58,
        topY: 17,
        width: 4,
        height: 6,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 58, 17, 4, 6, false, 99),
    },

    100: { // grass 3
        topX: 57,
        topY: 24,
        width: 7,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 57, 24, 7, 8, false, 100),
    },

    101: { // short cacti 1
        topX: 88,
        topY: 11,
        width: 8,
        height: 5,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 88, 11, 8, 5, false, 101),
    },

    102: { // short cacti 2
        topX: 88,
        topY: 24,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 88, 24, 8, 8, false, 102),
    },

    103: { // normal cacti 1
        topX: 72,
        topY: 8,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 8, 8, 8, false, 103),
        // topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 8, 8, 4, false, 103),
    },

    104: { // normal cacti 2
        topX: 72,
        topY: 16,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 16, 8, 8, false, 104),
        // topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 16, 8, 4, false, 104),
    },

    105: { // normal cacti 3
        topX: 72,
        topY: 24,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 24, 8, 8, false, 105),
        // topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 24, 8, 4, false, 105),
    },

    106: { // small bush with flowers 1
        topX: 104,
        topY: 8,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 104, 8, 8, 8, false, 106),
    },

    107: { // small bush with flowers 2
        topX: 112,
        topY: 8,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 112, 8, 8, 8, false, 107),
    },

    108: { // small bush no flowers 1
        topX: 104,
        topY: 24,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 104, 24, 8, 8, false, 108),
    },

    109: { // small bush no flowers 2
        topX: 112,
        topY: 24,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 112, 24, 8, 8, false, 109),
    },

    110: { // small light green cacti with flowers 1
        topX: 128,
        topY: 8,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 128, 8, 8, 8, false, 110),
    },

    111: { // small light green cacti with flowers 2
        topX: 136,
        topY: 8,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 136, 8, 8, 8, false, 111),
    },

    112: { // small light green cacti without flowers 1
        topX: 128,
        topY: 24,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 128, 24, 8, 8, false, 112),
    },

    113: { // small light green cacti without flowers 2
        topX: 136,
        topY: 24,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 136, 24, 8, 8, false, 113),
    },
    114: { // medium bush
        topX: 105,
        topY: 46,
        width: 14,
        height: 9,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 105, 46, 14, 9, false, 114),
    },

    116: { // medium rock
        topX: 8,
        topY: 47,
        width: 16,
        height: 9,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 8, 51, 16, 5, true, 116),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 8, 47, 16, 4, false, 116),
    },

    117: { // large rock
        topX: 8,
        topY: 57,
        width: 15,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 8, 67, 15, 5, true, 117),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 8, 57, 15, 10, false, 117),
    },

    118: { // large bush
        topX: 104,
        topY: 56,
        width: 16,
        height: 16,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 104, 67, 16, 5, true, 118),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 104, 56, 16, 11, false, 118),
    },

    119: { // straight tree
        topX: 48,
        topY: 40,
        width: 16,
        height: 16,
        // bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 48, 51, 16, 5, false, 119),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 54, 51, 4, 5, true, 119),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 48, 40, 16, 11, false, 119),
    },

    120: { // left tree
        topX: 48,
        topY: 56,
        width: 16,
        height: 16,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 48, 56, 16, 6, false, 120),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 56, 66, 4, 6, true, 120),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 48, 56, 16, 11, false, 120),
    },

    121: { // right tree
        topX: 48,
        topY: 73,
        width: 16,
        height: 16,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 48, 73, 16, 6, false, 121),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 49, 82, 8, 6, true, 121),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 48, 73, 16, 11, false, 121),
    },

    122: { // large cacti 1
        topX: 72,
        topY: 40,
        width: 15,
        height: 16,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 50, 15, 5, false, 122),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 76, 50, 5, 6, true, 122),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 40, 15, 10, false, 122),
    },

    123: { // large cacti 2
        topX: 72,
        topY: 56,
        width: 15,
        height: 16,
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 66, 16, 5, false, 123),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 66, 13, 6, true, 123),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/desert/props.png", 72, 56, 16, 10, false, 123),
    },

    
    





// castle props
    150: { // red banner flag
        topX: 8,
        topY: 8,
        width: 8,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 8, 8, 8, 15, false, 150),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 7, 8, 8, 15, false, 150)
    },

    151: { // gold guard face right
        topX: 104,
        topY: 76,
        width: 8,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 104, 84, 8, 4, true, 151),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 104, 76, 8, 8, false, 151),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 103, 85, 1, 3, false, 151)
    },

    152: { // gold guard face forward
        topX: 72,
        topY: 76,
        width: 8,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 72, 83, 8, 5, true, 152),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 72, 76, 8, 7, false, 152),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 71, 84, 1, 4, false, 152)
    },

    153: { // colored dinner table leaf
        topX: 216,
        topY: 72,
        width: 8,
        height: 24,
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 216, 72, 8, 5, false, 153),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 216, 77, 8, 15, true, 153),
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 216, 72, 8, 24, false, 153),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 216, 93, 1, 3, false, 153)
    },

    154: { // dinner table left
        topX: 208,
        topY: 80,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 213, 80, 3, 8, true, 154),
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 208, 80, 5, 8, false, 154),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 207, 85, 1, 3, false, 154)
    },

    155: { // dinner table right
        topX: 224,
        topY: 80,
        width: 8,
        height: 8,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 224, 80, 3, 8, true, 155),
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 227, 80, 5, 8, false, 155)
    },

    156: { // floor torch
        topX: 2,
        topY: 0,
        width: 11,
        height: 20,
        customAnim: {frameCount: 8, frameDuration: 0.1, framePadding: 5},
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/torches.png", 6, 16, 3, 3, true, 156),
        bottomNotCollidable: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/torches.png", 2, 15, 11, 5, false, 156),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/torches.png", 2, 0, 11, 15, false, 156),
    },

    157: { // chest closed
        topX: 80,
        topY: 18,
        width: 8,
        height: 6,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 79, 22, 1, 2, false, 157),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 80, 18, 8, 6, false, 157),
    },

    158: { // chest open
        topX: 96,
        topY: 14,
        width: 8,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 95, 22, 1, 2, false, 158),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 96, 14, 8, 10, false, 158),
    },

    159: { // wall shield
        topX: 9,
        topY: 58,
        width: 6,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 8, 58, 6, 10, false, 159),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 9, 58, 6, 10, false, 159),
    },

    160: { // wall axe
        topX: 17,
        topY: 58,
        width: 7,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 16, 58, 7, 10, false, 160),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 17, 58, 7, 10, false, 160),
    },

    161: { // wall swords
        topX: 27,
        topY: 58,
        width: 10,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 26, 58, 10, 10, false, 161),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 27, 58, 10, 10, false, 161),
    },

    162: { // wall swords
        topX: 44,
        topY: 58,
        width: 10,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 43, 58, 10, 10, false, 162),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 44, 58, 10, 10, false, 162),
    },

    163: { // wall deer facing right
        topX: 12,
        topY: 82,
        width: 14,
        height: 14,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 11, 87, 4, 9, false, 163),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 12, 82, 14, 14, false, 163),
    },

    164: { // wall deer facing left
        topX: 38,
        topY: 82,
        width: 14,
        height: 14,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 43, 90, 4, 6, false, 164),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 38, 82, 14, 14, false, 164),
    },

    165: { // wall bear facing right
        topX: 11,
        topY: 110,
        width: 12,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 10, 110, 4, 10, false, 165),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 11, 110, 12, 10, false, 165),
    },

    166: { // wall bear facing left
        topX: 41,
        topY: 110,
        width: 12,
        height: 10,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 43, 118, 2, 2, false, 166),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 41, 110, 12, 10, false, 166),
    },

    167: { // gold guard face up
        topX: 88,
        topY: 76,
        width: 8,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 88, 83, 8, 5, true, 167),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 88, 76, 8, 7, false, 167),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 87, 84, 1, 4, false, 167)
    },

    168: { // gold guard face left
        topX: 120,
        topY: 76,
        width: 8,
        height: 12,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 120, 83, 8, 5, true, 168),
        topper: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 120, 76, 8, 7, false, 168),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 119, 85, 1, 3, false, 168)
    },

    169: { // wall torch
        topX: 2,
        topY: 48,
        width: 11,
        height: 20,
        customAnim: {frameCount: 8, frameDuration: 0.1, framePadding: 5},
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/torches.png", 2, 48, 11, 20, false, 169)
    },

    170: { // chair face forward
        topX: 89,
        topY: 56,
        width: 6,
        height: 8,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 88, 61, 1, 3, false, 170),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 89, 56, 6, 8, false, 170),
    },

    171: { // chair face right
        topX: 105,
        topY: 56,
        width: 6,
        height: 8,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 104, 61, 1, 3, false, 171),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 105, 56, 6, 8, false, 171),
    },

    172: { // chair face left
        topX: 121,
        topY: 56,
        width: 6,
        height: 8,
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 120, 61, 1, 3, false, 172),
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 121, 56, 6, 8, false, 172),
    },

    173: { // checkered banner flag
        topX: 24,
        topY: 8,
        width: 8,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 24, 8, 8, 15, false, 173),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 23, 8, 8, 15, false, 173)
    },

    174: { // gold checkered banner flag
        topX: 40,
        topY: 8,
        width: 8,
        height: 15,
        base: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props.png", 40, 8, 8, 15, false, 174),
        shadow: (game, x, y, centered) => genProp(game, x, y, centered, "./sprites/biomes/castle/props_shadows.png", 39, 8, 8, 15, false, 174)
    },
};