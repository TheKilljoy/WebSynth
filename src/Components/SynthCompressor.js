export default class SynthCompressor extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthSwitch = this.shadowRoot.querySelector('synth-switch')
        this.synthOsc = this.shadowRoot.querySelector('synth-osc')
        this.synthKnobThreshold = this.shadowRoot.querySelectorAll('synth-knob')[0]
        this.synthKnobKnee = this.shadowRoot.querySelectorAll('synth-knob')[1]
        this.synthKnobRatio = this.shadowRoot.querySelectorAll('synth-knob')[2]
        this.synthKnobAttack = this.shadowRoot.querySelectorAll('synth-knob')[3]
        this.synthKnobRelease = this.shadowRoot.querySelectorAll('synth-knob')[4]
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="Compressor">
            <synth-knob min="-32" max="0" unit="dB" value="0">Threshold</synth-knob>
            <synth-knob min="0" max="40" unit="dB" value="0">Knee</synth-knob>
            <synth-knob min="1" max="20" unit=": 1" value="1">Ratio</synth-knob>
            <synth-knob min="0" max="500" unit="ms" value="0">Attack</synth-knob>
            <synth-knob min="0" max="500" unit="ms" value="0">Release</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-compressor', SynthCompressor)
