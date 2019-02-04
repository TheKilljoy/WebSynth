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

var analyserData;
// var ac = new AudioContext();
// var voices = new Voices(ac);
// console.log(voices.getAudioContext());

function prueba(data){
  analyserData = data;

}

//Wird gezeigt wenn geladen
function preload(){
    song = loadSound("src/media/Chopin - Nocturne op.9 No.2.mp3");
    button = createButton("Play");
    button.mousePressed(togglePlaying);
    slider = createSlider(0,1,0.5,0.01);
    // voices = new Voices(getAudioContext());
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //song.play();
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  fft = new p5.FFT(0.8);
  widthBand = (width / 128);
  console.log(analyserData);
  //passValue();
  //console.log(getAudioContext());
}


function draw() {
  background(61);
  //Berechnet Amplitudenwerte im Frequenzbereich -> Zu Array
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i<spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height, 0);
    fill(i, 255, 255);
    rect(i*widthBand,y,widthBand-2, height - y );
  }
  //voices.getAnalyserData();

  //Set Volume according to slider
  song.setVolume(slider.value());
}

  // voices.getData();
  // voices.getData();
  // voices.getData();
  // voices.getData();
  // voices.getData();
  // voices.getData();
  // voices.getData();
  // voices.getData();

//Play/Pause Button
function togglePlaying(){
  if(!song.isPlaying()){
    song.play();
    button.html("Pause");
  }else if(song.isPlaying()){
    song.pause();
    button.html("Play");
  }
}
