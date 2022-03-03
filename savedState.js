let saveState = {
    firstCutsceneFinished: null
};

function toBoolean(str) {
    if (str == "true") {
        return true;
    } else {
        return false;
    }
}

const initialState = {
    firstCutsceneFinished: false,
    gameFinished: true,   // if boss is complete
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
            "bought": true,
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

// saves the game based on the savestate obj given
function saveGame(obj) {
    const storage = window.localStorage;
    storage.setItem("firstCutsceneFinished", obj.firstCutsceneFinished);
    storage.setItem("gameFinished", obj.gameFinished);
    storage.setItem("numLevelsCompleted", obj.numLevelsCompleted);
    storage.setItem("currency", obj.currency);
    storage.setItem("numSpellsUnlocked", obj.numSpellsUnlocked);

    storage.setItem("heroStats0", obj.heroStats[0]);
    storage.setItem("heroStats1", obj.heroStats[1]);
    storage.setItem("heroStats2", obj.heroStats[2]);
    storage.setItem("heroStats3", obj.heroStats[3]);
    storage.setItem("heroStats4", obj.heroStats[4]);
    storage.setItem("heroStats5", obj.heroStats[5]);
    
    storage.setItem("weapons0bought", obj.weapons[0].bought);
    storage.setItem("weapons0attack", obj.weapons[0].attack);
    storage.setItem("weapons0dexterity", obj.weapons[0].dexterity);
    
    storage.setItem("weapons1bought", obj.weapons[1].bought);
    storage.setItem("weapons1attack", obj.weapons[1].attack);
    storage.setItem("weapons1dexterity", obj.weapons[1].dexterity);

    storage.setItem("weapons2bought", obj.weapons[2].bought);
    storage.setItem("weapons2attack", obj.weapons[2].attack);
    storage.setItem("weapons2dexterity", obj.weapons[2].dexterity);

    storage.setItem("weapons3bought", obj.weapons[3].bought);
    storage.setItem("weapons3attack", obj.weapons[3].attack);
    storage.setItem("weapons3dexterity", obj.weapons[3].dexterity);

    storage.setItem("weapons4bought", obj.weapons[4].bought);
    storage.setItem("weapons4attack", obj.weapons[4].attack);
    storage.setItem("weapons4dexterity", obj.weapons[4].dexterity);

    storage.setItem("weapons5bought", obj.weapons[5].bought);
    storage.setItem("weapons5attack", obj.weapons[5].attack);
    storage.setItem("weapons5dexterity", obj.weapons[5].dexterity);
}

// sets saveState to the saved state (or default if no save exists)
function loadGame() {
    const storage = window.localStorage;
    saveState = {
        firstCutsceneFinished: toBoolean(storage.getItem("firstCutsceneFinished")),
        gameFinished: toBoolean(storage.getItem("gameFinished")),   
        numLevelsCompleted: parseInt(storage.getItem("numLevelsCompleted")), 
        currency: parseInt(storage.getItem("currency")),
        
        numSpellsUnlocked: storage.getItem("numSpellsUnlocked"), 
    
        heroStats: { 
            0: parseInt(storage.getItem("heroStats0")),
            1: parseInt(storage.getItem("heroStats1")),
            2: parseInt(storage.getItem("heroStats2")),
            3: parseInt(storage.getItem("heroStats3")),
            4: parseInt(storage.getItem("heroStats4")),
            5: parseInt(storage.getItem("heroStats5"))
        },
    
        weapons: { 
            0 : { // sword
                "bought": toBoolean(storage.getItem("weapons0bought")),
                "attack": parseInt(storage.getItem("weapons0attack")),
                "dexterity": parseInt(storage.getItem("weapons0dexterity"))
            },
            1 : { // axe
                "bought": toBoolean(storage.getItem("weapons1bought")),
                "attack": parseInt(storage.getItem("weapons1attack")),
                "dexterity": parseInt(storage.getItem("weapons1dexterity"))
            },
            2 : { // whip
                "bought": toBoolean(storage.getItem("weapons2bought")),
                "attack": parseInt(storage.getItem("weapons2attack")),
                "dexterity": parseInt(storage.getItem("weapons2dexterity"))
            },
            3 : { // flail
                "bought": toBoolean(storage.getItem("weapons3bought")),
                "attack": parseInt(storage.getItem("weapons3attack")),
                "dexterity": parseInt(storage.getItem("weapons3dexterity"))
            },
            4 : { // slingshot
                "bought": toBoolean(storage.getItem("weapons4bought")),
                "attack": parseInt(storage.getItem("weapons4attack")),
                "dexterity": parseInt(storage.getItem("weapons4dexterity"))
            },
            5 : { // bow
                "bought": toBoolean(storage.getItem("weapons5bought")),
                "attack": parseInt(storage.getItem("weapons5attack")),
                "dexterity": parseInt(storage.getItem("weapons5dexterity"))
            }
        },
    
    };
    
    // set a default if first load
    if (saveState.firstCutsceneFinished == null) {

        saveGame(initialState);
        loadGame();
    }
}

// sets save state to default
function resetGame() {
    saveGame(initialState);
    loadGame();
}

loadGame();

//resetGame(); // REMOVE THIS LINE TO NOT RESET EVERY TIME PAGE IS RELOADED


// console.log(saveState.weapons[0].bought);