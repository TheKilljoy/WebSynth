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
            <synth-knob>Time</synth-knob>
            <synth-knob>Duration</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-delay', SynthDelay)
