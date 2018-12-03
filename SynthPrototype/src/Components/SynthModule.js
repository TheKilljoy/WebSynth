export default class SynthModule extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML =
        `
        <style>
        div {
            background: rgba(0,0,0,.5);
            padding: 48px;
            margin: 24px;
            border-radius: 24px;
        }
        </style>
        <div><slot></slot></div>
        `
    }
}

customElements.define('synth-module', SynthModule)
