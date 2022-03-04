const PARAMS = {
    BLOCKWIDTH : 8,
    DEBUG : false,
    DEBUG_WIDTH : 1,
    DEBUG_COLOR: "Red",
    CANVAS_DIMENSION : 1000,
    SCALE : 4,
    OVERWORLD_SCALE: 6,
    PROJECTILE_SCALE: 1.2,
    GUI_SCALE : 6,
    MMAP_SCALE: 0.4625,
    GAMEOVER: false,
    LIFE_ID: 0,
    SHOT_ID: 0,
    COLLIDE_ID: 0,
    NPC_ID: 0,
    LOW_HP_COLOR: "Red",
    MED_HP_COLOR: "Orange",
    HIGH_HP_COLOR: "Green"  
};

const PROJECTILE_LIFETIMES = {
    short: 0.75,
    mid: 1.25,
    long: 1.75
};

const WEAPONS = {
    0 : { base_damage: 20, base_dexterity: 0.16, range: 6, projectileType: 19 },
    1 : { base_damage: 30, base_dexterity: 0.17, range: 6, projectileType: 3 },
    2 : { base_damage: 15, base_dexterity: 0.175, range: 14, projectileType: 4 },
    3 : { base_damage: 25, base_dexterity: 0.25, range: 14, projectileType: 5 },
    4 : { base_damage: 5, base_dexterity: 0.12, projectileType: 1 },
    5 : { base_damage: 10, base_dexterity: 0.125, projectileType: 0 },
};

const PROJECTILES = {
    0: { spritesheet: "./sprites/projectiles/arrow.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.long },
    1: { spritesheet: "./sprites/projectiles/projectile_slingshot.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.long },
    2: { spritesheet: "./sprites/projectiles/projectile_sword1.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.short },
    3: { spritesheet: "./sprites/projectiles/projectile_axe.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.short },
    4: { spritesheet: "./sprites/projectiles/projectile_whip.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    5: { spritesheet: "./sprites/projectiles/projectile_flail.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    6: { spritesheet: "./sprites/projectiles/projectile_enemy_close_range.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.short },
    7: { spritesheet: "./sprites/projectiles/projectile_slingshot.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.long },
    8: { spritesheet: "./sprites/projectiles/Green_Arrow.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.long },
    9: { spritesheet: "./sprites/projectiles/projectile_sword2.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.short },
    10: { spritesheet: "./sprites/projectiles/snowball.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    11: { spritesheet: "./sprites/projectiles/projectile_yeti.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    12: { spritesheet: "./sprites/projectiles/projectile_shrek.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    13: { spritesheet: "./sprites/projectiles/projectile_polarbear.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    14: { spritesheet: "./sprites/projectiles/projectile_frog.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    15: { spritesheet: "./sprites/projectiles/projectile_skeleton.png", velocity: 8, lifetime: PROJECTILE_LIFETIMES.mid },
    16: { spritesheet: "./sprites/projectiles/projectile_green_slime.png", velocity: 4, lifetime: PROJECTILE_LIFETIMES.mid },
    17: { spritesheet: "./sprites/projectiles/projectile_green_slime.png", velocity: 8, lifetime: PROJECTILE_LIFETIMES.long },
    18: { spritesheet: "./sprites/projectiles/projectile_tentacle.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
    19: { spritesheet: "./sprites/projectiles/projectile_sword3.png", velocity: 6, lifetime: PROJECTILE_LIFETIMES.mid },
};

// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a rgba web color
function rgba(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

function distance(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
};

function magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
};

function unitVector(vector) {
    return {x: vector.x / magnitude(vector), y: vector.y / magnitude(vector)};
};

function oscillate(input, min, max) {
    let range = max - min;
    return min + Math.abs(((input + range) % (range * 2)) - range);
};

function toDegrees(radians) {
    return radians * 180 / Math.PI;
};

function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

function rotateImage(spritesheet, xStart, yStart, width, height, theta, scale) {
    let offscreenCanvas = document.createElement('canvas');
    let dimension = Math.max(width, height) * scale;
    offscreenCanvas.width = dimension;
    offscreenCanvas.height = dimension;
    let offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.save();
    offscreenCtx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
    offscreenCtx.rotate(theta);
    offscreenCtx.translate(-offscreenCanvas.width / 2, -offscreenCanvas.height / 2);
    offscreenCtx.drawImage(spritesheet, xStart, yStart, width, height, 
                           width * scale < dimension ? (dimension - width * scale) / 2 : 0, 
                           height * scale < dimension ? (dimension - height * scale) / 2 : 0, width * scale, height * scale);
    offscreenCtx.restore();
    return offscreenCanvas;
};

function flipImage(spritesheet, xStart, yStart, width, height, horizontal) {
    let offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    let offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.save();
    offscreenCtx.scale(horizontal === 0 ? 1 : -1, horizontal === 0 ? -1 : 1);
    offscreenCtx.drawImage(spritesheet, xStart, yStart, width, height, horizontal === 0 ? 0 : -width, horizontal === 0 ? -height : 0, width, height);
    offscreenCtx.restore();
    return offscreenCanvas;
};

function createSpritesheet(sprites, frameWidth, frameHeight) {
    let offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = sprites.length * frameWidth;
    offscreenCanvas.height = frameHeight;
    let offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.imageSmoothingEnabled = false;
    let x = 0;
    for (let i = 0; i < sprites.length; i++) {
        offscreenCtx.drawImage(sprites[i], 0, 0, frameWidth, frameHeight, x, 0, frameWidth, frameHeight);
        x += frameWidth;
    }
    return offscreenCanvas;
};

function circleCollide(circle, line) {
    let slope = (line.pt2.y - line.pt1.y) / (line.pt2.x - line.pt1.x);
    let yInt = line.pt1.y - slope * line.pt1.x;
    let a = 1 + slope * slope;
    let b = 2 * (slope * (yInt - circle.y) - circle.x);
    let c = circle.x * circle.x + (yInt - circle.y) * (yInt - circle.y) - circle.radius * circle.radius;

    let d = b * b - 4 * a * c;

    if (d === 0) {
        return [(-b + Math.sqrt(d)) / (2 * a)];
    } else if (d > 0) {
        return [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)];
    } 

    return false;
};

function mMapDimension() {
    return 34 * PARAMS.GUI_SCALE;
};

function statsDisplayDimension() {
    return 25 * PARAMS.GUI_SCALE;
};

function abilityDisplayDimension() {
    return 18 * PARAMS.GUI_SCALE;
};

function weaponsDisplayDimension() {
    return 18 * PARAMS.GUI_SCALE;
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();







