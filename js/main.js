class Game {
  constructor() {
    this.time = 0;
    this.player = null;
    this.obstacles = [];
  }
  start() {
    this.player = new Player();
    this.createListeners();

    const intervalId = setInterval(() => {
      if (this.time % 60 === 0) {
        this.obstacles.push(new Obstacle());
      }

      this.obstacles.forEach((obstacle) => {
        obstacle.moveDown();
        if (obstacle.positionY + obstacle.height <= 0) {
          this.obstacles.shift();
          obstacle.remove();
        }
      });

      this.obstacles.forEach((obstacle) => {
        if (
          this.player.positionX < obstacle.positionX + obstacle.width &&
          this.player.positionX + this.player.width > obstacle.positionX &&
          this.player.positionY < obstacle.positionY + obstacle.height &&
          this.player.height + this.player.positionY > obstacle.positionY
        ) {
          //collision detected !!
          console.log("collision detected !!");
        }
      });
      this.time++;
    }, 50);
  }
  createListeners() {
    window.addEventListener("load", (event) => {});
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.player.moveRight();
      } else if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      }
    });
  }
}

class Thing {
  constructor(element) {
    this.className = element.className;

    this.width = element.width;
    this.height = element.height;
    this.positionX = element.positionX;
    this.positionY = element.positionY;
  }
  createDomElement() {
    const newElm = document.createElement("div");

    newElm.className = this.className;
    newElm.style.left = this.left + "vw";
    newElm.style.bottom = this.bottom + "vh";
    newElm.style.width = this.width + "vw";
    newElm.style.height = this.height + "vh";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(newElm);
    return newElm;
  }
}

class Player extends Thing {
  constructor() {
    const element = (() => {
      return {
        className: "player",
        height: 10,
        width: 10,
        positionX: 50 - this.width / 2,
        positionY: 0,
      };
    })();
    super(element);

    this.domElement = this.createDomElement();
  }
  moveLeft() {
    if (this.positionX >= 2) this.positionX -= 2;
    this.domElement.style.left = `${this.positionX}vw`;
  }
  moveRight() {
    if (this.positionX < 100 - this.width) this.positionX += 2;
    this.domElement.style.left = `${this.positionX}vw`;
  }
}

class Obstacle extends Thing {
  constructor() {
    super({
      className: "obstacle",
      positionX: 45,
      positionY: 90,
      height: 10,
      width: 5,
    });
    this.positionX = 45;
    this.positionY = 90;
    this.height = 10;
    this.width = 5;

    this.domElement = this.createDomElement();
  }
  remove() {
    const boardElm = document.getElementById("board");
    boardElm.removeChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = `${this.positionY}vh`;
  }
}

const game = new Game();
game.start();
