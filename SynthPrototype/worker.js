self.addEventListener('message', function(){
    self.calcAudioGain();
});

function calcAudioGain(){
    self.audioGain = (Math.sin(ac.currentTime) + 1) / 2;
}