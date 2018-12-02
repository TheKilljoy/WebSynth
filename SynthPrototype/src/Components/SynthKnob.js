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
    <script>
        let input = document.querySelector('#circle')
        input.addEventListener('mousemove', changeValue)

        function changeValue(event) {
            let vector = [event.x, event.y]
            let centerVector = [event.target.offsetWidth / 2 - vector[0], event.target.offsetHeight / 2 - vector[1]]
            let value = Math.atan(centerVector[0], centerVector[1]) * (1 / Math.PI) + 0.5

            let knobMoveEvent = document.createEvent("HTMLEvents")
            knobMoveEvent.initEvent("knobmove", false, true)

            event.target.dispatchEvent(knobMoveEvent)
        }
    </script>
    `
  }
}

customElements.define('synth-knob', SynthKnob)
