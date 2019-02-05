export default class SynthOsc extends HTMLElement {
    constructor() {
        super()

        this.value = "sine"
        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.shadowRoot.querySelector('button:nth-of-type(1)').onclick = () => { this.value = "sine" }
        this.shadowRoot.querySelector('button:nth-of-type(2)').onclick = () => { this.value = "triangle" }
        this.shadowRoot.querySelector('button:nth-of-type(3)').onclick = () => { this.value = "sawtooth" }
        this.shadowRoot.querySelector('button:nth-of-type(4)').onclick = () => { this.value = "square" }

        this.shadowRoot.querySelectorAll('button').forEach(button =>
            button.addEventListener('click', e => {
                this.shadowRoot.querySelector('.selected').classList.remove('selected')
                button.classList.add('selected')

                let selectEvent = new Event('select', {bubbles: true, composed: true})
                selectEvent.data = this.value;
                this.shadowRoot.dispatchEvent(selectEvent)
            })
        )
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
        <div class="wrapper">
            <button class="selected">SINE</button>
            <button>TRIANGLE</button>
            <button>SAW</button>
            <button>SQUARE</button>
        </div>
        `
    }
}

customElements.define('synth-osc', SynthOsc)
