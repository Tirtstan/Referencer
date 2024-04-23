import Utilities from "../helpers/Utilities";
import Website from "../media/Website";

class WebsiteElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="txtLink"><u>Link:</u></label>
                        <input
                            type="url"
                            name="link"
                            id="txtLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <label for="txtArticleTitle"><u>Article Title:</u></label>
                        <input
                            type="text"
                            name="article title"
                            id="txtArticleTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtAuthor"><u>Author:</u></label>
                        <input
                            type="text"
                            name="author"
                            id="txtAuthor"
                            class="input-device input-box-1"
                            placeholder="Author" />
                        <label for="dtPublished"><u>Date Published:</u></label>
                        <input type="date" name="date published" id="dtPublished" class="input-device input-box-1" />
                        <div class="grid-input">
                            <label for="dtAccessedWhen"><u>Date Accessed:</u></label>
                            <input
                                type="date"
                                name="date accessed"
                                id="dtAccessedWhen"
                                class="input-device input-box-1" />
                            <label for="btnFormat"><u>Format:</u></label>
                            <button id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>`;

        const btnFormat = document.getElementById("btnFormat");

        const txtLink = document.getElementById("txtLink");
        const txtArticleTitle = document.getElementById("txtArticleTitle");
        const txtAuthor = document.getElementById("txtAuthor");
        const dtPublished = document.getElementById("dtPublished");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        const date = new Date();
        dtAccessedWhen.valueAsDate = date;

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtArticleTitle.value, txtLink.value)) {
                return;
            }

            const website = new Website(
                txtAuthor.value,
                txtArticleTitle.value,
                dtPublished.value,
                txtLink.value,
                dtAccessedWhen.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${website.getParaphrased()}<br><br><u><strong>In-Text Quote:</strong></u><br><br>${website.getQuote()}`;
            txtReferenceList.innerHTML = website.toString();
        });
    }
}

window.customElements.define("website-element", WebsiteElement);
