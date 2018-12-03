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
        p {
            color: #FFF;
            font-family: sans-serif;
            font-weight: bold;
            text-align: center;
            display: block;
        }
        </style>
        <div class="wrapper">
            <div id="circle"></div>
            <p><slot></slot></p>
        </div>
        `

        let circle = this.shadowRoot.querySelector('#circle')
        circle.addEventListener('mousemove', (event) => {
            let value = event.x / event.target.offsetWidth
            let degrees = value * 0.75 * 360 - 45

            circle.style.transform = "rotate(" + degrees + "deg)"
            this.value = value
            this.shadowRoot.dispatchEvent(new Event('knobmove', {bubbles: true, composed: true}))
        })
    }
}

customElements.define('synth-knob', SynthKnob)
