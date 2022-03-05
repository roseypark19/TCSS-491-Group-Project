let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// audio
ASSET_MANAGER.queueDownload("./audio/Upgrade.wav");
ASSET_MANAGER.queueDownload("./audio/CoinUpgrade.wav");
ASSET_MANAGER.queueDownload("./audio/MaxLevelUpgrade.wav");

ASSET_MANAGER.queueDownload("./audio/hero_death.mp3");
ASSET_MANAGER.queueDownload("./audio/spell_unlock.mp3");
ASSET_MANAGER.queueDownload("./audio/minotaur_ogre_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/minotaur_ogre_death.mp3");
ASSET_MANAGER.queueDownload("./audio/orc_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/orc_death.mp3");
ASSET_MANAGER.queueDownload("./audio/skeleton_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/skeleton_death.mp3");
ASSET_MANAGER.queueDownload("./audio/slime_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/slime_death.mp3");
ASSET_MANAGER.queueDownload("./audio/sword.mp3");
ASSET_MANAGER.queueDownload("./audio/trasgo_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/trasgo_death.mp3");
ASSET_MANAGER.queueDownload("./audio/hero_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/lightning.mp3");
ASSET_MANAGER.queueDownload("./audio/victory.mp3");
ASSET_MANAGER.queueDownload("./audio/coin.wav");
ASSET_MANAGER.queueDownload("./audio/bird_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/hound_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/beast_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/druid_death.mp3");
ASSET_MANAGER.queueDownload("./audio/ogre_hit.mp3");
ASSET_MANAGER.queueDownload("./audio/ogre_death.mp3");

ASSET_MANAGER.queueDownload("./audio/snow.mp3");
ASSET_MANAGER.queueDownload("./audio/plains.mp3");
ASSET_MANAGER.queueDownload("./audio/desert.mp3");
ASSET_MANAGER.queueDownload("./audio/swamp.mp3");
ASSET_MANAGER.queueDownload("./audio/castle.mp3");
ASSET_MANAGER.queueDownload("./audio/town.mp3");
ASSET_MANAGER.queueDownload("./audio/overworld.mp3");
ASSET_MANAGER.queueDownload("./audio/druid_battle.mp3");
ASSET_MANAGER.queueDownload("./audio/cutscene.mp3");

// sprites
ASSET_MANAGER.queueDownload("./sprites/hero/tiny_hero.png");
ASSET_MANAGER.queueDownload("./sprites/hero/hero.png");
ASSET_MANAGER.queueDownload("./sprites/ui/portals.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/structures.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/overworld/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/propsAndShadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/propsShadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/propsNoShadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/trees.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/treesShadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/penguin.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/snow/shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/desert/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/desert/shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/desert/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/swamp/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/swamp/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/swamp/propsShadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/swamp/propsNoShadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/HenIdle.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/town/ChickIdle.png");
ASSET_MANAGER.queueDownload("./sprites/ui/weapon_icons.png");
ASSET_MANAGER.queueDownload("./sprites/ui/stats_icons.png");
ASSET_MANAGER.queueDownload("./sprites/hero/earth_shield.png");
ASSET_MANAGER.queueDownload("./sprites/hero/wind_shield.png");
ASSET_MANAGER.queueDownload("./sprites/hero/ice_shield.png");
ASSET_MANAGER.queueDownload("./sprites/hero/fire_shield.png");

ASSET_MANAGER.queueDownload("./sprites/biomes/plains/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/props_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/plains/tiles_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/ogre.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/minotaur.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_blue.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_green.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_mother_blue.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/slime_mother_green.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/druid_bird.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/druid_hound.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/druid_beast.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/druid.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/root.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/dwarf.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/dwarf_beard.png");

ASSET_MANAGER.queueDownload("./sprites/enemies/cyclops.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/yeti.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/wargo.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/centaur.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/troll.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/rhino.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/polarbear.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/snowman.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/trasgo.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/orc.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/orc_wild.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/goblins.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/zombie.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/giant_toad.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/livingfire.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/tentacle.png");

ASSET_MANAGER.queueDownload("./sprites/projectiles/earth_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/wind_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/fire_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/ice_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_wargo.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/druid_beam.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_snowball.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_bow.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_plains_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_slingshot.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_sword.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_axe.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_whip.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_flail.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_yeti.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_shrek.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_polarbear.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_frog.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_green_slime.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_tentacle.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_snow_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_blue_slime.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_centaur.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_cyclops.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_dwarf.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_flame.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_goblin.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_minotaur.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_rhino.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_desert_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_wild_orc.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_trasgo.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_troll.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_swamp_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/projectile_zombie.png");

ASSET_MANAGER.queueDownload("./sprites/biomes/castle/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/castle/tiles_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/castle/carpet.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/castle/props.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/castle/props_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/biomes/castle/torches.png");

ASSET_MANAGER.queueDownload("./sprites/ui/bars.png");
ASSET_MANAGER.queueDownload("./sprites/ui/bars_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/ui/frames.png");
ASSET_MANAGER.queueDownload("./sprites/ui/frames_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icons.png");
ASSET_MANAGER.queueDownload("./sprites/ui/grids.png");
ASSET_MANAGER.queueDownload("./sprites/ui/enemies.png");
ASSET_MANAGER.queueDownload("./sprites/ui/portal_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/ui/overworld_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/ui/enemy_arrow.png");

ASSET_MANAGER.queueDownload("./sprites/hero/spells.png");
ASSET_MANAGER.queueDownload("./sprites/cutscene/opening_cutscene.png");
ASSET_MANAGER.queueDownload("./sprites/cutscene/opening_cutscene_2.png");
ASSET_MANAGER.queueDownload("./sprites/cutscene/opening_cutscene_3.png");

ASSET_MANAGER.queueDownload("./sprites/items/coin.png");

ASSET_MANAGER.downloadAll(function () {

	loadGame();

	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();	
});
