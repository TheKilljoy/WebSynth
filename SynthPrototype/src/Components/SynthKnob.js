export default class SynthKnob extends HTMLElement {

    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML =
        `
        <style>
        #circle {
            position: relative;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #000;
            cursor: pointer;
        }
        #circle::before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            margin: 8px;
            border-radius: 50%;
            background: #FFF;
        }
        </style>
        <p>LEVEL</p>
        <div id="circle"></div>
        `

        let circle = this.shadowRoot.querySelector('#circle')
        circle.addEventListener('mousemove', (event) => {
            let vector = [event.x, event.y]
            let centerVector = [event.target.offsetWidth / 2 - vector[0], event.target.offsetHeight / 2 - vector[1]]
            let value = Math.atan(centerVector[0], centerVector[1]) * (1 / Math.PI) + 0.5

            console.log(value);

            this.value = value
            this.shadowRoot.dispatchEvent(new Event('knobmove', {bubbles: true, composed: true}))
        })
    }
}

customElements.define('synth-knob', SynthKnob)
