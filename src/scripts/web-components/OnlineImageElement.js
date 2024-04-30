import Utilities from "../helpers/Utilities";
import OnlineImage from "../media/OnlineImage";

class OnlineImageElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="txtAuthors"><u>Authors:</u></label>
                        <div class="next-to">
                            <input
                                type="text"
                                name="authors"
                                id="txtAuthors"
                                class="input-device input-box-1"
                                placeholder="Name And/Or Surname" />
                            <button id="btnAdd" class="input-device button-1 add-button">Add</button>
                            <button id="btnClear" class="input-device button-1">Clear</button>
                        </div>
                        <div id="pnlAuthors" class="input-device chip-input"></div>
                        <label for="txtImgTitle"><u>Image Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="image title"
                            id="txtImgTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtArticleTitle"><u>Article Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="article title"
                            id="txtArticleTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtLink"><u>Link:</u><span class="required"> *</span></label>
                        <input
                            type="url"
                            name="link"
                            id="txtLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <div class="grid-input">
                            <label for="txtYear"><u>Year:</u></label>
                            <input
                                type="number"
                                name="year"
                                id="txtYear"
                                class="input-device input-box-1"
                                placeholder="Year" />
                            <label for="dtAccessedWhen"><u>Date Accessed:</u></label>
                            <input
                                type="date"
                                name="date accessed"
                                id="dtAccessedWhen"
                                class="input-device input-box-1" />
                        </div>
                        <div class="grid-input">
                            <label for="txtPubName"><u>Publication Name:</u></label>
                            <input
                                type="text"
                                name="publication name"
                                id="txtPubName"
                                class="input-device input-box-1"
                                placeholder="Name" />
                            <label for="btnFormat"><u>Format:</u></label>
                            <button id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>`;

        const btnAdd = document.getElementById("btnAdd");
        const btnClear = document.getElementById("btnClear");
        const btnFormat = document.getElementById("btnFormat");

        const txtAuthors = document.getElementById("txtAuthors");
        const pnlAuthors = document.getElementById("pnlAuthors");

        const txtImgTitle = document.getElementById("txtImgTitle");
        const txtYear = document.getElementById("txtYear");
        const txtPubName = document.getElementById("txtPubName");
        const txtLink = document.getElementById("txtLink");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");

        const txtArticleTitle = document.getElementById("txtArticleTitle");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        let authors = [];
        const date = new Date();
        dtAccessedWhen.valueAsDate = date;
        txtYear.value = date.getFullYear();

        document.onkeydown = (e) => {
            if (e.key === "Enter") {
                btnAdd.click();
            }
        };

        btnAdd.addEventListener("click", () => {
            if (Utilities.isNullOrEmpty(txtAuthors.value)) {
                return;
            }

            authors.push(txtAuthors.value);
            txtAuthors.value = "";
            displayAllAuthors();
        });

        function displayAllAuthors() {
            pnlAuthors.innerHTML = "";
            for (let i = 0; i < authors.length; i++) {
                pnlAuthors.innerHTML += `<chip-element index="${i}">${authors[i]}</chip-element>\n`;
            }

            displayChips();
        }

        function displayChips() {
            const removeButtons = document.querySelectorAll("button[id^='btnRemove']");
            for (let i = 0; i < removeButtons.length; i++) {
                removeButtons[i].addEventListener("click", () => {
                    const index = removeButtons[i].parentElement.parentElement.getAttribute("index");
                    authors.splice(index, 1);

                    displayAllAuthors();
                });
            }
        }

        btnClear.addEventListener("click", () => {
            authors = [];
            txtAuthors.value = "";
            pnlAuthors.innerHTML = "";
        });

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtImgTitle.value, txtArticleTitle.value, txtLink.value)) {
                return;
            }

            const onlineImage = new OnlineImage(
                authors,
                txtYear.value,
                txtImgTitle.value,
                txtArticleTitle.value,
                txtPubName.value,
                dtAccessedWhen.valueAsDate,
                txtLink.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${onlineImage.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${onlineImage.getQuote()}`;
            txtReferenceList.innerHTML = onlineImage.toString();
        });
    }
}

window.customElements.define("online-image-element", OnlineImageElement);
