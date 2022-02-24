class CutSceneScreen {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.cutScene = ASSET_MANAGER.getAsset("./sprites/cutscene/opening_cutscene.png");
        this.cutScene2 = ASSET_MANAGER.getAsset("./sprites/cutscene/opening_cutscene_2.png"); 
        this.cutScene3 = ASSET_MANAGER.getAsset("./sprites/cutscene/opening_cutscene_3.png");  
        this.BB = new BoundingBox(0, 0, 1, 1);
        this.animationList = [];
        this.animationIndex = 0;

        this.animationList[0] = new AnimationGroup(this.cutScene, 0, 0, 1050, 1050, 89, 0.1, false, false);
        this.animationList[1] = new AnimationGroup(this.cutScene2, 0, 0, 1050, 1050, 81, 0.1, false, false);
        this.animationList[2] = new AnimationGroup(this.cutScene3, 0, 0, 1050, 1050, 92, 0.1, false, false);

    } 
    update() {
        //if someone clicks to skip/ end cutscene
        let  currentAnimation = this.animationList[this.animationIndex];
        if (currentAnimation.elapsedTime + this.game.clockTick >= currentAnimation.frameCount * currentAnimation.frameDuration - .03) {
            this.animationIndex++;
            if (this.animationIndex === 3) {
                this.game.camera.travelTo(town);
            }
        }
    }

    draw(ctx) { 
 

        this.animationList[this.animationIndex].drawFrame(this.game.clockTick, ctx, -50, 0, 1);
  
       
    }

}