let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/hero/tiny_hero.png");
ASSET_MANAGER.queueDownload("./sprites/hero/hero.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/structures.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/earth_beam.png");
ASSET_MANAGER.queueDownload("./sprites/hero/earth_shield.png");
ASSET_MANAGER.queueDownload("./sprites/hero/wind_shield.png");
ASSET_MANAGER.queueDownload("./sprites/hero/ice_shield.png");
ASSET_MANAGER.queueDownload("./sprites/hero/fire_shield.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/wind_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/fire_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/ice_beam.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/props_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/ogre.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/minotaur.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_blue.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_green.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_mother_blue.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_mother_green.png");

ASSET_MANAGER.downloadAll(function () {
	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();	

});
