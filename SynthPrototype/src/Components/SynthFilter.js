export default class SynthFilter extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthKnobCutoff = this.shadowRoot.querySelector('synth-knob')
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="Filter">
            <synth-knob>CUTOFF</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-filter', SynthFilter)
