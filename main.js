let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/hero/tiny_hero.png");
ASSET_MANAGER.queueDownload("./sprites/hero/hero.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/structures.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/arrow.png");

ASSET_MANAGER.downloadAll(async function () {

	await new Promise(r => setTimeout(r, 50)); // wait to ensure canvas has loaded

	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();	

});
