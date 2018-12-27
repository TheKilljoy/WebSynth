export default class SynthModule extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()
    }

    template() {
        const html = String.raw

        return html`
        <style>
        div {
            width: 50%;
            background: rgba(0,0,0,.5);
            padding: 12px;
            margin: 12px;
            border-radius: 12px;
        }
        </style>
        <div><slot></slot></div>
        `
    }
}

customElements.define('synth-module', SynthModule)
