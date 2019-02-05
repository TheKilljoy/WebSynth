export default class SynthFilter extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthKnobCutoff = this.shadowRoot.querySelectorAll('synth-knob')[0]
        this.synthKnobQ = this.shadowRoot.querySelectorAll('synth-knob')[1]
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="Filter">
            <synth-knob min="20" max="20000" unit="Hz" value="20000">Cutoff Frequency</synth-knob>
            <synth-knob min="0" max="12" unit="dB" value="0">Resonance</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-filter', SynthFilter)