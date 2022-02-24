// use weak map to map a JSON to a value (not possible with regular objs)
const levelIndexes = new WeakMap();
levelIndexes.set(plains1, 1);
levelIndexes.set(plains2, 2);
levelIndexes.set(desert1, 3);
levelIndexes.set(desert2, 4);
levelIndexes.set(snow1, 5);
levelIndexes.set(snow2, 6);
levelIndexes.set(swamp1, 7);
levelIndexes.set(swamp2, 8);
levelIndexes.set(castle, 9);


// returns true/false based on whether or not it is valid 
// to travel to the given destination
function isLevelUnlocked(level) {
    
    if (level == town || level == overworld) {
        return true;
    }
    return saveState.numLevelsCompleted >= levelIndexes.get(level);
}

function isFinalUnlockedDungeon(level) {
    return saveState.numLevelsCompleted == levelIndexes.get(level);
}

// console.log(saveState.numLevelsCompleted)
// console.log("res" + isLevelUnlocked(town));  // t
// console.log("res" + isLevelUnlocked(overworld)); // t 
// console.log("res" + isLevelUnlocked(desert1)); // t
// console.log("res" + isLevelUnlocked(desert2)); // f
// saveState.numLevelsCompleted++;
// console.log("res" + isLevelUnlocked(desert2)); // t
// console.log("res" + isLevelUnlocked(snow1)); // f
// saveState.numLevelsCompleted+=4;
// console.log("res" + isLevelUnlocked(desert1)); // t
// console.log("res" + isLevelUnlocked(desert2)); // t
// console.log("res" + isLevelUnlocked(snow1)); // t
// console.log("res" + isLevelUnlocked(snow2)); // t
