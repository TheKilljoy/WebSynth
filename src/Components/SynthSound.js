export default class SynthSound extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthOsc = this.shadowRoot.querySelector('synth-osc')
        this.synthOctave = this.shadowRoot.querySelector('synth-octave')
        this.synthKnobPitch = this.shadowRoot.querySelectorAll('synth-knob')[0]
        this.synthKnobLevel = this.shadowRoot.querySelectorAll('synth-knob')[1]

        this.synthKnobLevel.value = 100
        this.synthKnobPitch.value = 0
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="Oscillator">
            <synth-osc></synth-osc>
            <synth-octave></synth-octave>
            <synth-knob min="-12" max="12" unit="semitones">Pitch</synth-knob>
            <synth-knob min="0" max="100" unit="%" value="100">Level</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-sound', SynthSound)
