export default class SynthVibrato extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthOsc = this.shadowRoot.querySelector('synth-osc')
        this.synthKnobFrequency = this.shadowRoot.querySelector('synth-knob')
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="LFO 2 – Vibrato">
            <synth-osc></synth-osc>
            <synth-knob>Frequency</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-vibrato', SynthVibrato)
