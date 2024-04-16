import Utilities from "../helpers/Utilities";
import Sound from "../media/Sound";

class SoundElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="link"><u>Link:</u></label>
                        <input
                            type="url"
                            name="link"
                            id="txtLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <label for="title"><u>Title:</u></label>
                        <input
                            type="text"
                            name="title"
                            id="txtTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="composer"><u>Composer:</u></label>
                        <input
                            type="text"
                            name="composer"
                            id="txtComposer"
                            class="input-device input-box-1"
                            placeholder="Composer" />
                        <label for="year"><u>Year:</u></label>
                        <input
                            type="number"
                            name="year"
                            id="txtYear"
                            class="input-device input-box-1"
                            placeholder="Year" />
                        <div class="grid-input">
                            <label for="date accessed"><u>Date Accessed:</u></label>
                            <input
                                type="date"
                                name="date accessed"
                                id="dtAccessedWhen"
                                class="input-device input-box-1" />
                            <label for="format"><u>Format:</u></label>
                            <button id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>`;

        const btnFormat = document.getElementById("btnFormat");

        const txtLink = document.getElementById("txtLink");
        const txtTitle = document.getElementById("txtTitle");
        const txtComposer = document.getElementById("txtComposer");
        const txtYear = document.getElementById("txtYear");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        const date = new Date();
        txtYear.value = date.getFullYear();
        dtAccessedWhen.valueAsDate = date;

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtTitle.value, txtLink.value)) {
                return;
            }

            const sound = new Sound(
                txtComposer.value,
                txtYear.value,
                txtTitle.value,
                txtLink.value,
                dtAccessedWhen.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${sound.getParaphrased()}<br><br><u><strong>In-Text Quote:</strong></u><br><br>${sound.getQuote()}`;
            txtReferenceList.innerHTML = sound.toString();
        });
    }
}

window.customElements.define("sound-element", SoundElement);
