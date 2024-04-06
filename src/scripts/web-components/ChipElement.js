class ChipElement extends HTMLElement {
    static get observedAttributes() {
        return ["index"];
    }

    // so, innerText returns the parents input AND all children text so I have to split it because button has text too
    connectedCallback() {
        const index = this.getAttribute("index");
        this.innerHTML = `<div class="chip-1">
                                <div>${this.innerText.split("X")[0]}</div>
                                <button id="btnRemove${index}">X</button>
                            </div>`;
    }
}

window.customElements.define("chip-element", ChipElement);
