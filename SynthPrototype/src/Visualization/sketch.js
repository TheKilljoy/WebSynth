var fft;
var button;
var song;
var slider;
var audiocontext;
var out;
var prue;
var source;
var analyser;
var voices;
var bufferLength;
var dataArray;
var canvas;

var analyserData = new Array(64+1).join('0').split('').map(parseFloat);
// console.log("LLena de ceros " + analyserData.length + " " +  analyserData);
// var ac = new AudioContext();
// var voices = new Voices(ac);
// console.log(voices.getAudioContext());

function getData(data){
  analyserData = data;
}

function printData(){
  console.log("Verga esta: " + analyserData.length);
}

//Wird gezeigt wenn geladen
function preload(){
    //song = loadSound("src/media/Chopin - Nocturne op.9 No.2.mp3");
    // button = createButton("Play");
    // button.mousePressed(togglePlaying);
    // slider = createSlider(0,1,0.5,0.01);
    // voices = new Voices(getAudioContext());
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //song.play();
  colorMode(HSB);
  canvas = createCanvas(windowWidth-20,windowHeight-19);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  fft = new p5.FFT(0.8);
  widthBand = (width / 64);
  //passValue();
  //console.log(getAudioContext());
}


function draw() {
  background(61);
  //Berechnet Amplitudenwerte im Frequenzbereich -> Zu Array
  //var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i<analyserData.length; i++) {
    var amp = analyserData[i];
    var y = map(amp, 0, 256, height, 0);
    fill(i + map(mouseX, 0, windowWidth, -20, 100), 255, 255);
    rect(i*widthBand,y,widthBand-2, windowHeight - y );
  }

  // for (var i = 0; i<spectrum.length; i++) {
  //   var amp = spectrum[i];
  //   var y = map(amp, 0, 256, height, 0);
  //   fill(i + map(mouseX, 0, windowWidth, -20, 100), 255, 255);
  //   rect(i*widthBand,y,widthBand-2, height - y );
  // }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// //Play/Pause Button
// function togglePlaying(){
//   if(!song.isPlaying()){
//     song.play();
//     button.html("Pause");
//   }else if(song.isPlaying()){
//     song.pause();
//     button.html("Play");
//   }
// }
