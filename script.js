class DebugDisplay {
  constructor(ctx) {
    this.ctx = ctx
    this.fontSize = 16;
    this.fontColor = 'cyan';
    this.x = 10;
    this.y = this.fontSize;
  }

  log(message) {
    this.ctx.fillStyle = 'black';
    this.ctx.font = `${this.fontSize}px Arial`;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    // Wyswietlanie tekstu
    this.ctx.fillText(message, this.x, this.y);
    this.y += this.fontSize*1.5;
  }
}

function draw() {
  // Czyścimy canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
if(img.complete) {
ctx.globalAlpha = 0.3;
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
ctx.globalAlpha = 1;
}
  boobieL.drawObject();
  boobieR.drawObject();
constraintL.drawObject();
constraintR.drawObject();
}

// 42Funkcja do aktualizacji kamery
function updateCamera() {
  // Ustawiamy kamerę na środku // camera.x = player.x - camera.width / 2;
  //camera.y = player.y - camera.height / 2;
}

class GameObj {
  constructor(obj) {
    Object.assign(this, obj);
  }

  drawObject() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.width / 2 - camera.x, this.y - this.height / 2 - camera.y, this.width, this.height);
}

  applyMove() {
    this.dy += 10 * deltaTime;
    this.x += this.dx * deltaTime;
    this.y += this.dy * deltaTime;
  }
}


class NinePatchImageTransform {
  constructor(imageData, top, right, bottom, left) {
    this.imageData = imageData;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.middleWidth = imageData.width - left - right;
    this.middleHeight = imageData.height - top - bottom;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = imageData.width;
    this.canvas.height = imageData.height;
    this.ctx.drawImage(imageData, 0, 0);
  }

  render() {
    // Rysuj obrazek na canvasie
    const img = new Image();
    img.src = this.canvas.toDataURL();
    document.body.appendChild(img);
  }

  transformImage(dx, dy) {
    // Środkowy kawałek - przesunięcie
    this.ctx.clearRect(this.left, this.top, this.middleWidth, this.middleHeight);
    this.ctx.drawImage(this.imageData, this.left + dx, this.top + dy, this.middleWidth, this.middleHeight, this.left + dx, this.top + dy, this.middleWidth, this.middleHeight);
    
    // Górny lewy kawałek - skalowanie poziome i pionowe
    this.ctx.clearRect(0, 0, this.left, this.top);
    this.ctx.drawImage(this.imageData, 0, 0, this.left, this.top, 0, 0, this.left, this.top);
    
    // Górny środkowy kawałek - skalowanie poziome
    this.ctx.clearRect(this.left, 0, this.middleWidth, this.top);
    this.ctx.drawImage(this.imageData, this.left, 0, this.middleWidth, this.top, this.left + dx, 0, this.middleWidth, this.top);
    
    // Górny prawy kawałek - skalowanie poziome i pionowe
    this.ctx.clearRect(this.canvas.width - this.right, 0, this.right, this.top);
    this.ctx.drawImage(this.imageData, this.imageData.width - this.right, 0, this.right, this.top, this.canvas.width - this.right, 0, this.right, this.top);
    
    // Lewy środkowy kawałek - skalowanie pionowe
    this.ctx.clearRect(0, this.top, this.left, this.middleHeight);
    this.ctx.drawImage(this.imageData, 0, this.top, this.left, this.middleHeight, 0, this.top + dy, this.left, this.middleHeight);
    
    // Prawy środkowy kawałek - skalowanie pionowe
    this.ctx.clearRect(this.canvas.width - this.right, this.top, this.right, this.middleHeight);
    this.ctx.drawImage(this.imageData, this.imageData.width - this.right, this.top, this.right, this.middleHeight, this.canvas.width - this.right, this.top + dy, this.right, this.middleHeight);
    
    // Dolny lewy kawałek - skalowanie poziome i pionowe
    this.ctx.clearRect(0, this.canvas.height - this.bottom, this.left, this.bottom);
    this.ctx.drawImage(this.imageData, 0, this.imageData.height - this.bottom, this.left, this.bottom, 0, this.canvas.height - this.bottom, this.left, this.bottom);
    
    // Dolny środkowy kawałek - skalowanie poziome
    this.ctx.clearRect(this.left, this.canvas.height - this.bottom, this.middleWidth, this.bottom);
    this.ctx.drawImage(this.imageData, this.left, this.imageData.height - this.bottom, this.middleWidth, this.bottom, this.left + dx, this.canvas.height - this.bottom, this.middleWidth, this.bottom);
    
    // Dolny prawy kawałek - skalowanie poziome i pionowe
    this.ctx.clearRect(this.canvas.width - this.right, this.canvas.height - this.bottom, this.right, this.bottom);
    this.ctx.drawImage(this.imageData, this.imageData.width - this.right, this.imageData.height - this.bottom, this.right, this.bottom, this.canvas.width - this.right, this.canvas.height - this.bottom, this.right, this.bottom);
}
}

class Spring {
  constructor(point1, point2, restLength, stiffness, damping) {
point2.dx||=0;
point2.dy||=0;
//console.log(point1.dx);
    this.point1 = point1;
    this.point2 = point2;
    this.restLength = restLength;
    this.stiffness = stiffness;
    this.damping = damping;;
  }

  applySpringForce() {
    const dx = this.point2.x - this.point1.x;
    const dy = this.point2.y - this.point1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate force based on Hooke's law (F = -kx)
    const displacement = distance - this.restLength;

  // Prevent division by zero
  if (distance === 0) {
    return; // Exit early to prevent further calculations
  }

    const springForce = this.stiffness * displacement;

    // Calculate damping force
    const relativeVelocityX = this.point2.dx- this.point1.dx;
    const relativeVelocityY = this.point2.dy- this.point1.dy;
    const dampingForceX = this.damping * relativeVelocityX;
    const dampingForceY = this.damping * relativeVelocityY;


    // Apply forces to points
    const totalForceX = (springForce * dx / distance) + dampingForceX;
    const totalForceY = (springForce * dy / distance) + dampingForceY;
    
this.point1.dx+=totalForceX*deltaTime;
this.point1.dy+=totalForceY*deltaTime;
}
}



function updatePhysics() {
deltaTime=(performance.now()-lastTime)/100;
lastTime=performance.now();

springL.applySpringForce();
springR.applySpringForce();
boobieL.applyMove();
boobieR.applyMove();

}

function debugDraw(){
debug.y=10;
debug.log('bbL.x: '+boobieL.x);
debug.log('bbR.x: '+boobieR.x);
debug.log('springL.stiffness: '+springL.stiffness);
debug.log('springR.stiffness: '+springR.stiffness);
debug.log('force.y: '+springL.forceY)

}
// Główna pętla gry
function gameLoop() {
  updatePhysics();
  updateCamera();
  draw();
debugDraw();
  
  requestAnimationFrame(gameLoop);
}
function createCanvas(){
const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
return canvas;
}
const canvas = createCanvas();
const ctx = canvas.getContext('2d');

// Pozycja i rozmiar kamery
let camera = {

  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height
};

// Pozycja bohatera
let player = {
  x: 98,
  y: 150,
dx:0,
dy:0,
  width: 50,
  height: 50,
color: 'orange'
};
let player2 = {...player};
player2.x=202;
let constraint = {
x: 100,
y: 150,
dx: NaN,
dy: NaN,
width:10,
height:10,
color: 'blue'
}
let constraint2 = {...constraint};
constraint2.x=200;
console.log(canvas.width+" x "+canvas.height);
const debug = new DebugDisplay(ctx);
var lastTime=performance.now();
var boobieL = new GameObj(player);
var boobieR = new GameObj(player2);
var constraintL = new GameObj(constraint);
var constraintR = new GameObj(constraint2);
console.log(boobieL.x);
console.log(boobieR.x);

var springL = new Spring(boobieL, constraintL, 30, 0.2, 0.2);
var springR = new Spring(boobieR, constraintR, 30, 0.2, 0.2);
console.log(springL.point1.x);
console.log(springR.point1.x);

var img = new Image();
img.onload = function() {
    
};
img.src = '20240331141022.jpg';
//Rozpoczęcie gry
gameLoop();
