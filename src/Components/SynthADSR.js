export default class SynthADSR extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthKnobAttack = this.shadowRoot.querySelectorAll('synth-knob')[0]
        this.synthKnobDecay = this.shadowRoot.querySelectorAll('synth-knob')[1]
        this.synthKnobSustain = this.shadowRoot.querySelectorAll('synth-knob')[2]
        this.synthKnobRelease = this.shadowRoot.querySelectorAll('synth-knob')[3]
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="ADSR">
            <synth-knob min="0" max="1000" unit="ms" value="0">Attack</synth-knob>
            <synth-knob min="0" max="1000" unit="ms" value="0">Decay</synth-knob>
            <synth-knob min="0" max="100" unit="%" value="100">Sustain</synth-knob>
            <synth-knob min="0" max="1000" unit="ms" value="0">Release</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-adsr', SynthADSR)
