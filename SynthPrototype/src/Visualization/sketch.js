var voices;
var canvas;

var counter = 1;
var fireworks = [];
var gravity;
var pos;
var circles = [];

var analyserData = new Array(64+1).join('0').split('').map(parseFloat);

function setVoices(_voices){
  voices = _voices;
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //colorMode(HSB);
  angleMode(DEGREES);
  canvas = createCanvas(windowWidth-20,windowHeight-19);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  widthBand = (width / 64);
  gravity = createVector(0,0.2);
  pos = width/34;
}


function draw() {
  

  analyserData = voices.getData();
  analyserDataRadial = voices.getData();
    switch (counter) {
        case 0:
          clear();
          break;
        case 1:
          colorMode(HSB);
          background(0,0,15);
          //background(10);
          barVisualizer();
          break;
        case 2:
          colorMode(HSB);
          background(0,0,15);
          radialVisualizer();
          break;
        case 3:
          colorMode(HSB);
          background(0,0,15);
          startFireworks();
          break;
        case 4:
          colorMode(HSB);
          background(0,0,15);
          drawCircles();
          break;

    }
}

function barVisualizer(){
 push();
  noStroke();
  for (var i = 0; i<analyserData.length; i++) {
    var amp = analyserDataRadial[i];
    var y = map(amp, 0, 256, height, 0);

    fill(i + map(mouseX, 0, windowWidth, -20, 150), 255, 255);
    rect(i*widthBand,y,widthBand-2, windowHeight - y );
  }
  pop();
}

function radialVisualizer(){

  translate(windowWidth/2, windowHeight/2);
  for (var i = 0; i<analyserData.length; i++) {
    var angle = map(i, 0, analyserData.length, 0, 360);
    var amp = analyserData[i];
    var r = map(amp, 0, 256, windowWidth/8, 900);
    var x = r * cos(angle);
    var y = r * sin(angle);
    push();
    stroke(i + map(mouseX, 0, width, -10, 160), 255, 255);
    strokeWeight(7);
    line(0, 0, x, y);
    pop();
  }
}


function startFireworks(){
    push();
    stroke(255);
    strokeWeight(10);
    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if(fireworks[i].done()){
        fireworks.splice(i,1);
      }
  }
  pop();
}

/*
//------------------------------------------------------
function waveVisualizer(){
  //stroke(i + map(mouseX, 0, width, -20, 150), 255, 255);
  noFill();
  beginShape();
  strokeWeight(5);
  for (var i = 0; i<analyserData.length; i++) {
    var x = map(i, 0, analyserData.length, 0, width);
    var y = map(analyserData[i], -1, 1, height, 0);
    vertex(x, y);
    
    //var x = analyserDataRadial[i];
    //var y = map(amp, 0, 256, height, 0);
    //vertex();
    //fill(i + map(mouseX, 0, windowWidth, -20, 150), 255, 255);
    //rect(i*widthBand,y,widthBand-2, windowHeight - y );
  }
  endShape();
}
//------------------------------------------
*/

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 38) {
       if(counter == 4){
         counter = 0;
       }else{
        counter += 1;
       }
       console.log(counter);
   }else if (key == 40) {
       if(counter == 0){
         counter = 4;
       }else{
         counter -= 1;
       }
   }
}


function keyPressedFirework() {
    if(counter == 3){
      if(fireworks.length<15){
        fireworks.push(new Firework(random(0, windowWidth) +2, random(0,255)));
      }
    }
}

class Circle_ {
    constructor(radius, color) {
        this.color = color;
        this.radius = radius;
        this.directionX = random(-2, 2);
        this.directionY = random(-2, 2);
        this.posX = random(0, windowWidth);
        this.posY = random(0, windowHeight);
        this.sub1 = round(random(-1, 1));
        this.sub2 = round(random(-1, 1));
        this.sub3 = round(random(-1, 1));
    }
    update() {
        this.lifetime -= 1;
        this.radius += 0.1;
        this.color = [this.color[0] + this.sub1,
        this.color[1] + this.sub2,
        this.color[2] + this.sub3,
        this.color[3] - 1];

        if (this.color[0] > 255) {
            this.color[0] = 255;
        }
        if (this.color[0] < 0) {
            this.color[0] = 0;
        }
        if (this.color[1] > 255) {
            this.color[1] = 255;
        }
        if (this.color[1] < 0) {
            this.color[1] = 0;
        }
        if (this.color[2] > 255) {
            this.color[2] = 255;
        }
        if (this.color[2] < 0) {
            this.color[2] = 0;
        }

        if (this.posX + this.directionX + this.radius > windowWidth ||
            this.posX + this.directionX - this.radius < 0) {
            this.directionX *= -1;
        }
        if (this.posY + this.directionY + this.radius > windowHeight ||
            this.posY + this.directionY - this.radius < 0) {
            this.directionY *= -1;
        }
        this.posX += this.directionX;
        this.posY += this.directionY;
    }

    getColor() {
        return this.color;
    }

    getPos() {
        return [this.posX, this.posY];
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getLifetime() {
        return this.color[3];
    }

    getRadius() {
        return this.radius
    }
}

function spawnCircle() {
    if (counter == 4) {
        let color = [random(100, 255), random(100, 255), random(100, 255), random(160, 255)];
        circles.push(new Circle_(random(0.2, 5), color))
    }    
}

function drawCircles() {
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].getLifetime() <= 0) {
            circles.splice(i, 1);
        }
        if (circles[i] == undefined) {
            return;
        }
        push();
        let color = circles[i].getColor();
        fill(color[0], color[1], color[2], color[3]);
        ellipse(circles[i].getPosX(), circles[i].getPosY(), circles[i].getRadius(), circles[i].getRadius());
        circles[i].update();
        pop();
    }
}


