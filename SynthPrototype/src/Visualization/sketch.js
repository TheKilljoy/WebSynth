var voices;
var canvas;

var counter = 1;

var analyserData = new Array(256+1).join('0').split('').map(parseFloat);

function setVoices(_voices){
  voices = _voices;
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //song.play();
  colorMode(HSB);
  angleMode(DEGREES);
  canvas = createCanvas(windowWidth-20,windowHeight-19);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  fft = new p5.FFT(0.8);
  widthBand = (width / 256);
}


function draw() {
  background(61);
  analyserData = voices.getData();

  if(counter == 1){
    barVisualizer();
  }else if(counter == 0){
    radialVisualizer();
  }




}

function barVisualizer(){
  noStroke();
  for (var i = 0; i<analyserData.length; i++) {
    var amp = analyserData[i];
    var y = map(amp, 0, 256, height, 0);
    fill(i + map(mouseX, 0, windowWidth, -20, 100), 255, 255);
    rect(i*widthBand,y,widthBand-2, windowHeight - y );
  }
}

function radialVisualizer(){
  translate(windowWidth/2, windowHeight/2);
  for (var i = 0; i<analyserData.length; i++) {
    var angle = map(i, 0, analyserData.length, 0, 360);
    var amp = analyserData[i];
    var r = map(amp, 0, 256, 150, 1500);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i,255,255);
    strokeWeight(3.5);
    line(0, 0, x, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 107) {
       counter += 1;
       console.log(counter);
   }else if (key == 109) {
       playerSpriteX -= 1;
       console.log(counter);
   }
}
