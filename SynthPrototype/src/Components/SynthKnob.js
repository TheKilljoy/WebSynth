export default class SynthKnob extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML =
        `
        <style>
        .wrapper {
            display: inline-block;
            margin: 24px;
        }
        #circle {
            position: relative;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #000;
            cursor: pointer;
            display: block;
        }
        #circle::before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            margin: 8px;
            top: 50%;
            border-radius: 50%;
            background: #FFF;
            opacity: .5;
        }
        input[type="range"] {
            -webkit-appearance: none;
            background: #FFF;
            width: 128px;
            height: 6px;
            border-radius: 3px;
            opacity: 0.2;
        }
        input[type="range"]:hover {
            opacity: 0.4;
        }
        input[type="range"]::-webkit-slider-thumb,
        input[type="range"]::-moz-range-thumb {
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
            text-align: center;
            display: block;
        }
        </style>
        <div class="wrapper">
            <input id="slider" type="range" min="1" max="100">
            <p><slot></slot></p>
        </div>
        `

        let slider = this.shadowRoot.querySelector('#slider')
        slider.addEventListener('input', (event) => {
            let value = slider.value
            this.value = value
            let moveEvent = new Event('move', {bubbles: true, composed: true})
            moveEvent.data = value
            this.shadowRoot.dispatchEvent(moveEvent)
        })
    }
}

customElements.define('synth-knob', SynthKnob)
