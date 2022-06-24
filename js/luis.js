

class Game {
    constructor(){
        this.time = 0;
        this.player = null; // will store an instance of the class Player
        this.obstacleArr = []; // will store multiple instances of the class Obstacle
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();

        setInterval(() => {

            // create new obstacle
            if(this.time % 60 === 0){
                const newObstacle = new Obstacle();
                this.obstacleArr.push(newObstacle);
            }

            // move & remove obstacles
            this.obstacleArr.forEach((obstacleInstance) => {
                
                // move
                obstacleInstance.moveDown();

                // remove old obstacles
                if( (obstacleInstance.positionY + obstacleInstance.height) === 0){
                    this.obstacleArr.shift(); // remove from array (we remove the first obstacle in the array)
                    obstacleInstance.domElement.remove(); // remove from the DOM
                }
            });

            // detect collision
            this.obstacleArr.forEach((obstacleInstance) => {
                // horizontal pos of the player
                if(this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY){
                        //collision detected !!
                        console.log("collision detected !!");
                }
            });

            this.time++;

        }, 30);

    }
    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            } else if(event.key === "ArrowRight"){
                this.player.moveRight();
            }
        });
    }
}


class Thing {
    constructor(className, width, height, positionX, positionY){
        
        this.className = className;
        
        this.width = width;
        this.height = height;
        this.positionX = positionX;
        this.positionY = positionY;

        this.domElement = this.createDomElement();
    }

    createDomElement(){
        // create dom element
        const newElm = document.createElement('div');

        // set id and css 
        newElm.className = this.className;
        newElm.style.left = this.positionX + "vw";
        newElm.style.bottom = this.positionY + "vh";
        newElm.style.width = this.width + "vw";
        newElm.style.height = this.height + "vh";

        // append to the dom
        const boardElm = document.getElementById("board"); //
        boardElm.appendChild(newElm);

        return newElm;
    }
}


class Player extends Thing {
    constructor(){
        const width = 20;
        const height = 10;
        const positionX = 50 - width/2;
        const positionY = 0;

        super("player", width, height, positionX, positionY);
    }

    moveLeft(){
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
}



class Obstacle extends Thing {
    constructor(){
        const width = 10;
        const height = 10;
        const positionX = Math.floor(Math.random() * (100 - width + 1)); // generate random number between 0 and (100-width)        
        const positionY = 90;

        super("obstacle", width, height, positionX, positionY);
    }
    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}



const game = new Game();
game.start();


