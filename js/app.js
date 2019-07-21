/**
 * Representing the functionalities of the game
 * @constructor
 * @param {string} sprite - Item's Image
 * @param {number} x - Item's x coordinate on canvas
 * @param {number} y - Item's y coordinate on canvas
 */
class GameFunctions {
    constructor(sprite, x, y){
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 171;
        this.sprite = sprite;
        this.pathImg = "images/";

        this.canvasWidth = 505;
        this.canvasHeight = 606;
    }

    /* Draw the item on the screen */
    render(){
        ctx.drawImage(Resources.get(this.pathImg + this.sprite),  this.x,  this.y);        
    }

    /* End Game, player returns to start */
    endGame(){        
        player.x = 202;
        player.y = 400;
    }
}

/**
 * Represents the enemy bugs 
 * @constructor
 * @param {string} sprite - Enemy's Image
 * @param {number} x - Enemy's x coordinate on canvas
 * @param {number} y - Enemy's y coordinate on canvas
 */
class Enemy extends GameFunctions{
    constructor(y, x = -101, sprite = "enemy-bug.png"){
        super(sprite, x, y);        
        this.speed = this.randomSpeed();
        this.startingXEnemy = x;
    }

    /* Update the enemy's position */
    update(dt){
        this.x += this.speed * dt;

        if (this.x >= this.canvasWidth) {
            this.x = this.startingXEnemy;
            this.speed = this.randomSpeed();
        }

        this.checkCrash(player.x, player.y, this.x, this.y);
    }

    /* Draw the enemy on the screen */
    render(){
        super.render();
    }

    /* Random speed generator */
    randomSpeed(){
        return Math.floor((Math.random() * 400) + 50);
    }   

    /* Check for collision */
    checkCrash(playerX, playerY, enemyX, enemyY){       
        if ((playerX >= enemyX - 75 && playerX <= enemyX + 75) && (playerY >= enemyY - 20 && playerY <= enemyY + 20)) {
            alert("You Died!");
            super.endGame();            
        }
    }
};

/**
 * Represents the Player
 * @constructor
 * @param {string} sprite - Player's Image
 * @param {number} x - Player's x coordinate on canvas
 * @param {number} y - Player's y coordinate on canvas
 */
class Player extends GameFunctions{
    constructor(x = 202, y = 400, sprite = "char-boy.png"){
        super(sprite, x, y);
    }

    update(){}

    /* Draw the Player on the screen */
    render(){
        super.render();
    }

    /* Finish the game */
    endGame(){
        super.endGame();
        alert("Awesome, you rock!");
    }

    /* Move the player according to keys pressed  */
    handleInput(keypressed){

        switch (keypressed) {
                //Check for canvas limit on left
            case "left":
                if (this.x > 0) {
                    this.x -= this.width;
                }
                break;

                //Check for canvas limit on right
            case "right":
                if (this.x < 402) {
                    this.x += this.width;
                }
                break;

            case "up":
                //check if player reached top (water), if so call update function, otherwise move up
                if (this.y == 58){
                    this.endGame();
                } else {
                    this.y -= (this.height/2);
                }
                break;

            case "down":
                //Check for canvas limit on bottom
                if (this.y < 400) {
                    this.y += (this.height/2);
                }
                break;
        }
    }
}

// Instantiate player
const player = new Player();

// Instatiate enemies in allEnemie array
const allEnemies =[new Enemy(229),new Enemy(143.5),new Enemy(58),new Enemy(229),new Enemy(143.5),new Enemy(58)];

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});