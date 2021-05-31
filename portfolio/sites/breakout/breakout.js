let player;
let ball;
let paused = false;
let launched = false;
let entities = [];
let win = 0;

colors = []
/* 
 0 - playing
 1 - lost
 2 - won
*/
function setup() {
  createCanvas(600, 400);
  player = new Paddle(70, 15, width / 2 - 35, 360, 6);
  ball = new Ball(width / 2, player.y - 4, 8);
  genBricks();

  textSize(16);
}

function draw() {

  if (entities.length == 0) {
    win = 2;
  }

  background(7, 54, 66);
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    if (player.x + player.vel <= width - player.width + 1) {
      if (!paused)
        player.x += player.vel;
    }
  }

  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    if (player.x - player.vel >= 0)
      if (!paused)
        player.x -= player.vel;
  }

  if (!paused) {
    if (win == 0) {

      ball.update();
      ball.draw();
      player.draw();
      fill(238, 232, 213);
      text(`Score: ${player.score}`, 15, 25);
      for (let brick of entities) {
        brick.draw();
      }

      if (!launched) {
        fill(238, 232, 213);
        text(`Press p to launch`, width / 2 - 90, height / 2);
      }
    }

    if (win == 1) {
      alert("You have lost.");
      launched = 0;
      win = 0;
      ball = new Ball(width / 2, player.y - 4, 8);
      player = new Paddle(70, 15, width / 2 - 35, 360, 6);
      entities = []
      genBricks();
    }

    if (win == 2) {
      alert("YAY! Win!");
      launched = 0;
      win = 0;
      ball = new Ball(width / 2, player.y - 4, 8);
      player = new Paddle(70, 15, width / 2 - 35, 360, 6);
      entities = []
      genBricks();
    }
  }

  else {
    fill(238, 232, 213);
    text(`PAUSED`, width / 2 - 30, height / 2);
  }
}

function Paddle(width, height, x, y, vel) {
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
  this.vel = vel;
  this.score = 0;
  this.draw = function () {
    fill(42, 161, 152);
    rect(this.x, 360, this.width, this.height);
  }
}

function Brick(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.destroyed = false;
  this.width = w;
  this.height = h;

  this.draw = function () {
    if (!this.isDestroyed()) {
      fill(38, 139, 210);
      rect(this.x, this.y, w, h);
    }
  }

  this.destroy = function () {
    this.destroyed = true;
    for (let i = 0; i < entities.length; i++) {
      if (entities[i] === this) {
        entities.splice(i, 1);
        break;
      }
    }
  }

  this.isDestroyed = function () {
    return this.destroyed;
  }
}

function Ball(_x, _y, radius) {
  this.pos = {
    x: _x,
    y: _y
  }
  this.vel = {
    x: 0,
    y: 0
  }
  this.radius = radius;

  this.draw = function () {
    noStroke();
    fill(250, 50, 37);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }

  this.update = function () {

    if (!launched) {
      this.pos.x = player.x + player.width / 2;
      this.pos.y = player.y - 4;
    }
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0) {
      this.vel.y *= -1;
    }

    if (this.pos.y > height) {
      win = 1;
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.resolveCollisions();
  }

  this.isColliding = function (brick) {
    let dX = this.pos.x - Max(brick.x, Min(this.pos.x, brick.x + brick.width));
    let dY = this.pos.y - Max(brick.y, Min(this.pos.y, brick.y + brick.height));

    return (dX * dX + dY * dY) < (this.radius * this.radius);
  }

  this.resolveCollisions = function () {
    if (!paused) {
      for (let brick of entities) {
        if (this.isColliding(brick)) {

          if (!brick.isDestroyed()) {
            this.vel.y = -this.vel.y;
            brick.destroy();
          }
          player.score += 1;
        }
      }
      if (this.isColliding(player)) {
        ball.vel.y *= -1;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    paused = !paused;
  }

  if (keyCode === 80 || keyCode === UP_ARROW) {
    if (!launched) {
      ball.vel.y -= 2;
      ball.vel.x += 2;
    }
    launched = true;
  }
}

function genBricks() {
  let clr;
  for (let x = 20; x < width - 40; x += 40) {
    for (let y = 50; y <= 150; y += 20) {
      clr = colors[random(colors.length)];
      entities.push(new Brick(x, y, player.width / 2, player.height));
    }
  }
}

function Max(a, b) {
  if (a > b) return a;
  if (a < b) return b;

  return a;
}

function Min(a, b) {
  if (a < b) return a;
  if (a > b) return b;

  return a;
}
