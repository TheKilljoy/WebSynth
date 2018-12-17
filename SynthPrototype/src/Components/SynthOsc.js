export default class SynthOsc extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML =
        `
        <style>
        .wrapper {
            display: inline-block;
            margin: 24px;
        }
        button {
            display: block;
            margin: 6px auto;
            padding: 12px;
            width: 128px;
            height: 48px;
            color: #FFF;
            background-color: rgba(0,0,0,0);
            font-size: 1em;
            border: none;
            border-radius: 24px;
            cursor: pointer;
        }
        button:hover {
            border: 1px solid rgba(255,255,255,.5);
        }
        button:focus {
            outline: none;
            border: 1px solid #FFF;
        }
        </style>
        <div class="wrapper">
            <button>SINE</button>
            <button>TRIANGLE</button>
            <button>SAW</button>
            <button>SQUARE</button>
        </div>
        `

        this.shadowRoot.querySelector('button:nth-of-type(1)').onclick = () => { this.value = "sine" }
        this.shadowRoot.querySelector('button:nth-of-type(2)').onclick = () => { this.value = "triangle" }
        this.shadowRoot.querySelector('button:nth-of-type(3)').onclick = () => { this.value = "sawtooth" }
        this.shadowRoot.querySelector('button:nth-of-type(4)').onclick = () => { this.value = "square" }
    }
}

customElements.define('synth-osc', SynthOsc)
