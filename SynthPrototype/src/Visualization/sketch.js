var fft;
var button;
var song;
var slider;
var audiocontext;
var out;
var prue;
var source;
var analyser;

var bufferLength;
var dataArray;

//Wird gezeigt wenn geladen
function preload(){
    song = loadSound("src/media/Chopin - Nocturne op.9 No.2.mp3");
    button = createButton("Play");
    button.mousePressed(togglePlaying);
    slider = createSlider(0,1,0.5,0.01);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //song.play();
  fft = new p5.FFT(0.8);
  widthBand = (width / 128);
  //passValue();
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
  //Set Volume according to slider
  song.setVolume(slider.value());
}

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
