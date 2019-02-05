export default class SynthSwitch extends HTMLElement {
    constructor() {
        super()

        //this.value = false
        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.value = !this.value

            let switchEvent = new Event('switch', {bubbles: true, composed: true})
            switchEvent.data = this.value;
            this.shadowRoot.dispatchEvent(switchEvent)
        })
    }

    template() {
        const html = String.raw

        return html`
        <style>
        .wrapper {
            display: inline-block;
            margin: 12px;
        }
        button {
            display: block;
            margin: 3px auto;
            padding: 6px;
            width: 128px;
            height: 32px;
            color: #FFF;
            background-color: rgba(0,0,0,0);
            font-size: 1em;
            border: none;
            border-radius: 16px;
            cursor: pointer;
        }
        button:hover {
            border: 1px solid rgba(255,255,255,.5);
        }
        button:focus {
            outline: none;
        }
        .selected {
            outline: none;
            border: 1px solid #FFF;
        }
        </style>
        <button>ON / OFF</button>
        `
    }
}

customElements.define('synth-switch', SynthSwitch)
