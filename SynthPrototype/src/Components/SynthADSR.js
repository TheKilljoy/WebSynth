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
            <synth-knob min="2" max="20" unit="ms" value="2">Attack</synth-knob>
            <synth-knob min="2" max="20" unit="ms" value="2">Decay</synth-knob>
            <synth-knob min="0" max="100" unit="%" value="0">Sustain</synth-knob>
            <synth-knob min="2" max="20" unit="ms" value="2">Release</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-adsr', SynthADSR)
