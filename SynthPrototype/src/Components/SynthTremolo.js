export default class SynthTremolo extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthSwitch = this.shadowRoot.querySelector('synth-switch')
        this.synthOsc = this.shadowRoot.querySelector('synth-osc')
        this.synthKnobFrequency = this.shadowRoot.querySelector('synth-knob')
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="LFO 1 – Tremolo">
            <synth-osc></synth-osc>
            <synth-knob min="0" max="20" unit="Hz" value="0">Frequency</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-tremolo', SynthTremolo)
