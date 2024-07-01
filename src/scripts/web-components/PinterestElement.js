import Utilities from "../helpers/Utilities.js";
import Pinterest from "../media/Pinterest.js";

class PinterestElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<form>
        <div class="info-panel inner-panel">
                        <label for="txtLink"><u>Pinterest Link:</u><span class="required"> *</span></label>
                        <input
                            type="url"
                            name="pinterest link"
                            id="txtLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <label for="txtOriginalLink"><u>Original Link:</u></label>
                        <input
                            type="url"
                            name="original link"
                            id="txtOriginalLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <label for="txtAuthor"><u>Author:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="author"
                            id="txtAuthor"
                            class="input-device input-box-1"
                            placeholder="Author" />
                        <label for="txtPicTitle"><u>Picture Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="picture title"
                            id="txtPicTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="dtAccessedWhen"><u>Date Accessed:</u></label>
                        <input type="date" name="date accessed" id="dtAccessedWhen" class="input-device input-box-1" />
                        <div class="grid-input">
                            <label for="txtYear"><u>Year:</u></label>
                            <input
                                type="number"
                                name="year"
                                id="txtYear"
                                class="input-device input-box-1"
                                placeholder="Year" />
                            <label for="btnFormat"><u>Format:</u></label>
                            <button type="button" id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>
                    </form>`;

        const form = this.querySelector("form");

        const btnFormat = document.getElementById("btnFormat");

        const txtLink = document.getElementById("txtLink");
        const txtOriginalLink = document.getElementById("txtOriginalLink");
        const txtAuthor = document.getElementById("txtAuthor");
        const txtPicTitle = document.getElementById("txtPicTitle");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");
        const txtYear = document.getElementById("txtYear");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        const date = new Date();
        dtAccessedWhen.valueAsDate = date;
        txtYear.value = date.getFullYear();

        form.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        };

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtLink.value, txtAuthor.value, txtPicTitle.value)) {
                return;
            }

            const pinterest = new Pinterest(
                txtAuthor.value,
                txtYear.value,
                txtPicTitle.value,
                txtLink.value,
                txtOriginalLink.value,
                dtAccessedWhen.value
            );
            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${pinterest.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${pinterest.getQuote()}`;
            txtReferenceList.innerHTML = pinterest.toString();
        });
    }
}

window.customElements.define("pinterest-element", PinterestElement);
