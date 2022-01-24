let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// audio
ASSET_MANAGER.queueDownload("./audio/Upgrade.wav");
ASSET_MANAGER.queueDownload("./audio/CoinUpgrade.wav");
ASSET_MANAGER.queueDownload("./audio/MaxLevelUpgrade.wav");

// sprites
ASSET_MANAGER.queueDownload("./sprites/hero/tiny_hero.png");
ASSET_MANAGER.queueDownload("./sprites/hero/hero.png");
ASSET_MANAGER.queueDownload("./sprites/ui/portals.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/structures.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/HenIdle.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/ChickIdle.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/ui/weapon_icons.png");
ASSET_MANAGER.queueDownload("./sprites/ui/stats_icons.png");
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
ASSET_MANAGER.queueDownload("./sprites/enemies/druid_bird.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/druid_hound.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/druid_beast.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/druid_beam.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/druid.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/root.png");


ASSET_MANAGER.downloadAll(function () {

	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();	
});
