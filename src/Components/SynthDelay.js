export default class SynthDelay extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthKnobTime = this.shadowRoot.querySelectorAll('synth-knob')[0]
        this.synthKnobDuration = this.shadowRoot.querySelectorAll('synth-knob')[1]
    }

    template() {
        const html = String.raw

        return html`
        <synth-module name="Delay">
            <synth-knob min="100" max="1000" unit="ms" value="0">Time</synth-knob>
            <synth-knob min="0" max="99" value="0" unit="%">Duration</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-delay', SynthDelay)
