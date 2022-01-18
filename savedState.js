const saveState = {
    firstCutsceneFinished: false,
    gameFinished: false,   // if boss is complete
    numLevelsCompleted: 1, // 1 - 9
    currency: 1500,
    
    numSpellsUnlocked: 0, // 0 - 4

    heroStats: { 
        0: 0, // speed of character
        1: 0, // maxHp
        2: 0, // maxMp
        3: 0, // vitality (rate of health regen)
        4: 0, // wisdom (rate of mP regen)
        5: 0, // defense
    },

    weapons: { 
        0 : { // sword
            "bought": false,
            "attack": 0,
            "dexterity": 0
        },
        1 : { // axe
            "bought": false,
            "attack": 0,
            "dexterity": 0
        },
        2 : { // whip
            "bought": false,
            "attack": 0,
            "dexterity": 0
        },
        3 : { // flail
            "bought": false,
            "attack": 0,
            "dexterity": 0
        },
        4 : { // slingshot
            "bought": false,
            "attack": 0,
            "dexterity": 0
        },
        5 : { // bow
            "bought": false,
            "attack": 0,
            "dexterity": 0
        }
    },

};