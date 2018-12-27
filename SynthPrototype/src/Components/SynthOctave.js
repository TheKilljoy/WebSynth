export default class SynthOctave extends HTMLElement {
    constructor() {
        super()

        this.value = 0
        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.shadowRoot.querySelector('button:nth-of-type(1)').onclick = () => { this.value = 0 }
        this.shadowRoot.querySelector('button:nth-of-type(2)').onclick = () => { this.value = 1 }
        this.shadowRoot.querySelector('button:nth-of-type(3)').onclick = () => { this.value = 2 }
        this.shadowRoot.querySelector('button:nth-of-type(4)').onclick = () => { this.value = 3 }

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
            width: 64px;
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
            <button class="selected">C0</button>
            <button>C1</button>
            <button>C2</button>
            <button>C3</button>
        </div>
        `
    }
}

customElements.define('synth-octave', SynthOctave)
