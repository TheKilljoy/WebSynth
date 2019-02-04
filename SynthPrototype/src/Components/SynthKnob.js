export default class SynthKnob extends HTMLElement {
    constructor() {
        super()

        this.value = 50
        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        let slider = this.shadowRoot.querySelector('#slider')
        slider.addEventListener('input', (event) => {
            let value = slider.value
            this.value = value
            let moveEvent = new Event('move', {bubbles: true, composed: true})
            moveEvent.data = value
            this.shadowRoot.dispatchEvent(moveEvent)
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
        #slider {
            -webkit-appearance: none;
            background: #FFF;
            width: 128px;
            height: 6px;
            border-radius: 3px;
            opacity: 0.2;
        }
        #slider:hover {
            opacity: 0.4;
        }
        #slider::-webkit-slider-thumb,
        #slider::-moz-range-thumb {
            -webkit-appearance: none;
            appearance: none;
            background: #FFF;
            width: 12px;
            height: 12px;
            cursor: pointer;
        }
        p {
            color: #FFF;
            font-family: sans-serif;
            font-weight: bold;
            font-size: .75em;
            text-align: center;
            display: block;
        }
        </style>
        <div class="wrapper">
            <input id="slider" type="range" min="1" max="100">
            <p><slot></slot></p>
        </div>
        `
    }
}

customElements.define('synth-knob', SynthKnob)
