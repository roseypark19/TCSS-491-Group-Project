class TownSigns {
    constructor(game) {
        Object.assign(this, {game});
        
        this.LEFT_SIGN_X = 32 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        this.RIGHT_SIGN_X = 40 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;

        this.SIGN_Y = 25 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        this.SIGN_WIDTH = 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        this.SIGN_HEIGHT = 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;

        this.leftSignBB = new BoundingBox(this.LEFT_SIGN_X, this.SIGN_Y, this.SIGN_WIDTH, this.SIGN_HEIGHT);
        this.rightSignBB = new BoundingBox(this.RIGHT_SIGN_X, this.SIGN_Y, this.SIGN_WIDTH, this.SIGN_HEIGHT);
    };


    update() {
         
    };

    draw(ctx) {



        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.leftSignBB.x, this.leftSignBB.y, this.leftSignBB.width, this.leftSignBB.height);   
            ctx.strokeRect(this.rightSignBB.x, this.rightSignBB.y, this.rightSignBB.width, this.rightSignBB.height);   
        }
    };
};
