# WebSynth Beleg
* s0557967 – Robin Meier
* s0557917 – Phillip Friedel
* s0559811 – Julian Boehm-Tettelbach

# Installation:
In der Konsole eingeben (ohne Anführungszeichen):
*  "git clone https://github.com/TheKilljoy/WebSynth.git"
*  "npm install"

# Starten:
Der Browser, den man für diese Anwendung nutzen sollte ist Chrome, da andere Browser nicht kompatibel sind.
Wenn man sich im "WebSynth" Ordner befindet folgendes in die Konsole eingeben (ohne Anführungszeichen):
* "npm start"

# Tastenbelegung:
Man kann ein angeschlossenes MIDI-Keyboard nutzen. Dort sind alle Tasten/Oktaven nutzbar. Pitch-Funktionen sind nicht unterstützt.

Bei der Computertastatur kann man die Reihe QWE... als weisse Tasten nutzen, die Tastenreihe darüber sind die schwarzen Tasten.
YXC ist wieder eine Reihe weisser Tasten, die Reihe darüber sind schwarze Tasten.
Q ist hierbei ein C3 (MIDI-Wert von 48).

Mit den Pfeiltasten Hoch und Runter kann man zwischen verschiedenen visuellen Effekten wechseln.
# Oszillatoren
Die Oszillatoren sind Klangerzeuger. Sie erzeugen Wellen einer bestimmten Form (z.B. Sinus, Square, ...), mit einer bestimmten Frequenz (Tonhöhe) und einer bestimmten Amplitude (Lautstärke).
Die Anwendung startet per Default mit 3 Oszillatoren, die man einstellen kann. Man kann aber auch beliebig viele Oszillatoren hinzufügen.
Einstellparameter sind hier 
* die Wellenform 
* die Tonhöhe (Grundton = C0, eine Oktave darüber C1, zwei Oktaven darüber C2,...) 
* Semitöne (- 12 bis +12 - also maximal eine Oktave über oder unter dem jeweiligen Ton)
* Lautstärke

# Effekte:
## ADSR
ADSR steht für Attack, Decay, Sustain und Release. Attack wird in Millisekunden angegeben und legt fest, wie lange es braucht, bis der Ton nach dem Tastenanschlag mit voller Lautstärke zu hören ist. Sustain ist die Lautstärke, die bei langem Drücken erhalten bleibt in Prozent, wie lange der Übergang zwischen Anfangslautstärke und Sustain andauert, wird durch Decay in Millisekunden angegeben. Release gibt zum Schluss noch an, wie lange nach dem Loslassen der Taste der Ton noch zu hören ist.
## Reverb
Reverb simuliert natürlichen Hall. Dabei kann man zwischen verschiedenen Räumen wählen, die als Vorbild für die Erzeugung des Halls dienen.
## Delay
Bei einem Delay wird der zuletzt gespielte Ton wiederholt, wie bei einem Echo. Dabei kann man einstellen, die lang die Verzögerung zwischen Klangerzeugung und Klangwiederholung sein soll, und die langlebig das Echo ist.
## Tremolo
Verändert die Lautstärke des Sounds periodisch.
Dabei kann man zwischen verschiedenen Wellenformen auswählen. Die Stärke gibt an, wie laut/leise das Maximum/Minimum ist, die Frequenz wie schnell diese Änderung stattfindet.
## Vibrato
Verändert die Tonhöhe des Sounds periodisch.
Dabei kann man zwischen verschiedenen Wellenformen auswählen. Die Stärke gibt an, wie weit die Tonhöhe vom Original abweicht. Die Frequenz gibt an, wie schnell diese Änderungen stattfinden.
## Filter
Durch Filter lassen sich Frequenzen herausfiltern, indem nur bestimmte Frequenzen durchgelassen werden. Dazu wird ein Lowpass Filter verwendet. Alle Frequenzen, die sich über der angegebenen Frequenz befinden, werden herausgefiltert.
## Compressor
Verändert die Dynamik. Der Threshold gibt an, ab wann der Kompressor anfängt die Lautstärke zu reduzieren. Die Ratio gibt an, wie stark ab dem Threshold das Signal reduziert werden soll, bei einer Ratio von 4:1 werden bspw. 4 dB auf 1 dB reduziert. Der Knee Parameter gibt an, wie viel Übergang zwischen Threshold und Kompression stattfindet. Attack und Release regeln, ab wann der Kompressor nach Überschreitung anfängt zu arbeiten bzw. wieder endet.
## MasterGain
Der MasterGain regelt die Gesamtlautstärke der Anwendung.
