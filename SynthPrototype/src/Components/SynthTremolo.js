export default class SynthTremolo extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthOsc = this.shadowRoot.querySelector('synth-osc')
        this.synthKnobFrequency = this.shadowRoot.querySelector('synth-knob')
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="LFO 1 – Tremolo">
            <synth-osc></synth-osc>
            <synth-knob>Frequency</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-tremolo', SynthTremolo)
