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
            width: 96%;
            background: rgba(0,0,0,.5);
            padding: 1%;
            margin: 1%;
            border-radius: 12px;
        }
        h2 {
            color: #FFF;
            font-family: sans-serif;
            text-align: center;
        }
        </style>
        <div>
            <h2>${this.getAttribute('name')}</h2>
            <slot></slot>
        </div>
        `
    }
}

customElements.define('synth-module', SynthModule)
