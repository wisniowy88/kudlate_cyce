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
imgBg.draw();

  boobieL.drawObject();//line30
  boobieR.drawObject();
constraintL.drawObject();
constraintR.drawObject();
bgTransformL.transformImage();
bgTransformR.transformImage();
}

// 42Funkcja do aktualizacji kamery
function updateCamera() {
 
camera.x = imgBg.width/2 - camera.width / 2;
camera.y = imgBg.height/2 - camera.height / 2;
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

class ImageObj {
  constructor(source) {
    this.img = new Image();
    
this.width = 0;
this.height = 0;
this.img.onload = () => {
console.log('kudlej załadowany! '+this.img.width+' x '+this.img.height);
        this.resizeImageToScreen();
 

console.log('kudlej załadowany! '+this.img.width+' x '+this.img.height);
console.log('kudlej przeskalowany! '+this.width+' x '+this.height);
console.log('kudlej wyruchany! '+this.img.width+' x '+this.img.height);
      };
   this.img.src = source;
    }
    draw(){
      if(!this.img.complete) 
return;

        ctx.globalAlpha = 0.6;
        ctx.drawImage(this.img, 0-camera.x, 0-camera.y,this.width, this.height);
        ctx.globalAlpha = 1;
      
    }
 resizeImageToScreen() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var imageRatio = this.img.width / this.img.height;

    var screenRatio = screenWidth / screenHeight;

    var newWidth = screenWidth;
    var newHeight = screenHeight;

    if (imageRatio > screenRatio) {  
        newHeight = screenWidth / imageRatio;
    } else {
        newWidth = screenHeight * imageRatio;
    }

    this.width = newWidth; 
    this.height= newHeight;
    this.img.width = newWidth;
    this.img.height = newHeight;
  }
}

class NinePatchImageTransform {
  constructor(imgBg, targetObj, ctx) {
    this.imgBg = imgBg.img;
    console.log(this.imgBg.width);

    this.gameObj = targetObj;
this.startObj = {...targetObj};

this.ctx = ctx;
  }

  render() {
    // Draw the image on the canvas
    //ctx.drawImage(this.imgBg, 0, 0);
  }

  transformImage() {  
const naturalRatioX = this.imgBg.naturalWidth / this.imgBg.width;
console.log(this.imgBg.naturalWidth);

    const naturalRatioY = this.imgBg.naturalHeight / this.imgBg.height;
//console.log(naturalRatioX);
//console.log(naturalRatioY);
const gameObjX = this.gameObj.x - this.gameObj.width / 2-camera.x;
    const gameObjY = this.gameObj.y - this.gameObj.height / 2-camera.y;
const startObjX = this.startObj.x * naturalRatioX - this.startObj.width / 2;
    const startObjY = this.startObj.y * naturalRatioY- this.startObj.height / 2;

console.log("startObjX "+startObjX+" "+startObjY);
    // Center patch - translation
    //ctx.clearRect(gameObjX, gameObjY, this.gameObj.width, this.gameObj.height);
    ctx.drawImage(this.imgBg, startObjX,startObjY, this.gameObj.width*naturalRatioX, this.gameObj.height, gameObjX, gameObjY, this.startObj.width, this.startObj.height);
return;
    // Top left patch
    ctx.clearRect(0, 0, gameObjX, gameObjY);
    ctx.drawImage(this.imgBg, 0, 0, gameObjX, gameObjY, 0, 0, gameObjX, gameObjY);

    // Top center patch
    ctx.clearRect(gameObjX, 0, this.gameObj.width, gameObjY);
    ctx.drawImage(this.imgBg, gameObjX, 0, this.gameObj.width, gameObjY, gameObjX, 0, this.gameObj.width, gameObjY);

    // Top right patch
    ctx.clearRect(gameObjX + this.gameObj.width, 0, canvas.width - (gameObjX + this.gameObj.width), gameObjY);
    ctx.drawImage(this.imgBg, gameObjX + this.gameObj.width, 0, canvas.width - (gameObjX + this.gameObj.width), gameObjY, gameObjX + this.gameObj.width, 0, canvas.width - (gameObjX + this.gameObj.width), gameObjY);

    // Left center patch
    ctx.clearRect(0, gameObjY, gameObjX, this.gameObj.height);
    ctx.drawImage(this.imgBg, 0, gameObjY, gameObjX, this.gameObj.height, 0, gameObjY, gameObjX, this.gameObj.height);

    // Right center patch
    ctx.clearRect(gameObjX + this.gameObj.width, gameObjY, canvas.width - (gameObjX + this.gameObj.width), this.gameObj.height);
    ctx.drawImage(this.imgBg, gameObjX + this.gameObj.width, gameObjY, canvas.width - (gameObjX + this.gameObj.width), this.gameObj.height, gameObjX + this.gameObj.width, gameObjY, canvas.width - (gameObjX + this.gameObj.width), this.gameObj.height);

    // Bottom left patch
    ctx.clearRect(0, gameObjY + this.gameObj.height, gameObjX, canvas.height - (gameObjY + this.gameObj.height));
    ctx.drawImage(this.imgBg, 0, gameObjY + this.gameObj.height, gameObjX, canvas.height - (gameObjY + this.gameObj.height), 0, gameObjY + this.gameObj.height, gameObjX, canvas.height - (gameObjY + this.gameObj.height));

    // Bottom center patch
    ctx.clearRect(gameObjX, gameObjY + this.gameObj.height, this.gameObj.width, canvas.height - (gameObjY + this.gameObj.height));
    ctx.drawImage(this.imgBg, gameObjX, gameObjY + this.gameObj.height, this.gameObj.width, canvas.height - (gameObjY + this.gameObj.height), gameObjX, gameObjY + this.gameObj.height, this.gameObj.width, canvas.height - (gameObjY + this.gameObj.height));

    // Bottom right patch
    ctx.clearRect(gameObjX + this.gameObj.width, gameObjY + this.gameObj.height, canvas.width - (gameObjX + this.gameObj.width), canvas.height - (gameObjY + this.gameObj.height));
    ctx.drawImage(this.imgBg, gameObjX + this.gameObj.width, gameObjY + this.gameObj.height, canvas.width - (gameObjX + this.gameObj.width), canvas.height - (gameObjY + this.gameObj.height), gameObjX + this.gameObj.width, gameObjY + this.gameObj.height, canvas.width - (gameObjX + this.gameObj.width), canvas.height - (gameObjY + this.gameObj.height));
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
debug.log('bbL.x: '+boobieL.x+' bbL.y: '+boobieL.y);
debug.log('bbR.x: '+boobieR.x);
debug.log('camera.x: '+camera.x);
debug.log('camera.y: '+camera.y);
debug.log('img.compltd:'+imgBg.img.complete);

}
// Główna pętla gry
function gameLoop() {
  updatePhysics();
  //updateCamera();
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
const screenRatio=canvas.width/canvas.height;
const boobsDistH=100;
const boobsDistConstrV=50;
const boobsPosTopLeft={x:150/screenRatio,y:200/screenRatio};
const boobsSize=80;
let constraint = {
x: boobsPosTopLeft.x,
y: boobsPosTopLeft.y,
dx: NaN,
dy: NaN,
width:10,
height:10,
color: 'blue'
};
let constraint2 = {...constraint};
constraint2.x+=boobsDistH;
// Pozycja bohatera
let player = {
  x: constraint.x-2,
  y: constraint.y+boobsDistConstrV,
dx:0,
dy:0,
  width: boobsSize,
  height: boobsSize,
color: 'orange'
};
let player2 = {...player};
player2.x=constraint2.x+2;

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

var imgBg = new ImageObj('20240331141022.jpg');
var bgTransformL = new NinePatchImageTransform(imgBg, boobieL,ctx);
var bgTransformR = new NinePatchImageTransform(imgBg, boobieR,ctx);

gameLoop();
