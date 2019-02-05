export default class SynthMaster extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthKnobVolume = this.shadowRoot.querySelector('synth-knob')
        this.synthKnobVolume.value = 100
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="Master">
            <synth-knob min="0" max="100" unit="%" value="100">Volume</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-master', SynthMaster)
