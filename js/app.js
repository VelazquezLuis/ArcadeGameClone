'use strict';
// GETS THE ELEMENT SPAN
const gameScore = document.getElementById('gameScore');
//SETS THE INITIAL TEXT CONTENT OF SPAN TO 0
let score = gameScore.innerHTML = 0;

// Enemies our player must avoid
//WE GIVE OUR enemy 3 prams.
let Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y + 55;
  this.sprite = 'images/enemy-bug.png';
  this.slide = 101;
  this.offScreen = this.slide * 5;
  this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if(this.x < this.offScreen) {
    this.x += this.speed * dt;
  } else {
    this.x = -100;
  }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//makes our player model
class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.slide = 101;
    this.jump = 83;
    this.startX = this.slide * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.point = 0;
  }
  //renders hero in canavas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //keyboard input for hero
  handleInput(input){
    switch(input){
      case 'left':
      if (this.x >= this.slide){
        this.x -= this.slide;
      }
      break;
      case 'right':
      if (this.x <= this.slide * 3){
        this.x += this.slide;
      }
      break;
      case 'up':
      if (this.y >= 0) {
        this.y -= this.jump;
      }
      break;
      case 'down':
      if (this.y <= this.jump * 4){
        this.y += this.jump;
      }
      break;
    }
  }
  // checks if the enemys collides with hero and manages points.
  update() {
    for( let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + (enemy.slide - 20) > this.x
        && enemy.x < this.x + this.slide/2) ){
          this.reset();
          if (this.point > 0){
          this.point --;
          gameScore.innerHTML = this.point;
        }
      }
    }
    // once hero cross 3 times alerts a win.
    if(this.y  === -28 && this.point < 3 ){
      this.point ++;
      gameScore.innerHTML = this.point;
      if(this.point === 3 ){
        alert('you Win!!')
      }
      this.reset();
    }
  }
  // reset function to palce hero at starting position.
  reset(){
    this.x = this.startX;
    this.y = this.startY;
  }
}
// creates new instances of hero and enemies.
const player = new Hero();

const allEnemies = [new Enemy(-100,0, 120),
  new Enemy(-100,83,300),
  new Enemy(-250,83,100),
  new Enemy(-100,166,200)];

console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
