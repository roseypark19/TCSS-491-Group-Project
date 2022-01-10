let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/hero/hero.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/props_shadows.png");

ASSET_MANAGER.downloadAll(function () {
	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();	

});
