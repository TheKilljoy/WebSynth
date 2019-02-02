export default class SynthReverb extends HTMLElement {
    constructor() {
        super()

        this.value = "SmallHexagon1"
        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.shadowRoot.querySelector('button:nth-of-type(1)').onclick = () => { this.value = "SmallHexagon1" }
        this.shadowRoot.querySelector('button:nth-of-type(2)').onclick = () => { this.value = "SmallHexagon2" }
        this.shadowRoot.querySelector('button:nth-of-type(3)').onclick = () => { this.value = "Basement" }
        this.shadowRoot.querySelector('button:nth-of-type(4)').onclick = () => { this.value = "LivingRoom" }
        this.shadowRoot.querySelector('button:nth-of-type(5)').onclick = () => { this.value = "Staircase1" }
        this.shadowRoot.querySelector('button:nth-of-type(6)').onclick = () => { this.value = "Staircase2" }
        this.shadowRoot.querySelector('button:nth-of-type(7)').onclick = () => { this.value = "Staircase3" }

        this.shadowRoot.querySelectorAll('button').forEach(button =>
            button.addEventListener('click', e => {
                this.shadowRoot.querySelector('.selected').classList.remove('selected')
                button.classList.add('selected')
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
            width: 192px;
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
        <synth-module name="Reverb">
            <button class="selected">Small Hexagon 1</button>
            <button>Small Hexagon 2</button>
            <button>Basement</button>
            <button>Living Room</button>
            <button>Staircase 1</button>
            <button>Staircase 2</button>
            <button>Staircase 3</button>
        </synth-module>
        `
    }
}

customElements.define('synth-reverb', SynthReverb)
