import Utilities from "../helpers/Utilities";
import CodeSnippet from "../media/CodeSnippet";

class CodeElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="txtAuthors"><u>Authors:</u></label>
                        <div class="next-to">
                            <input
                                type="text"
                                name="authors"
                                id="txtAuthors"
                                class="input-device input-box-1"
                                placeholder="Publisher Or Full Names" />
                            <button id="btnAdd" class="input-device button-1 add-button">Add</button>
                            <button id="btnClear" class="input-device button-1">Clear</button>
                        </div>
                        <div id="pnlAuthors" class="input-device chip-input"></div>
                        <label for="txtTitle"><u>Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="title"
                            id="txtTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <div class="grid-input">
                            <label for="txtCodeVersion"><u>Code Version:</u></label>
                            <input
                                type="text"
                                name="code version"
                                id="txtCodeVersion"
                                class="input-device input-box-1"
                                placeholder="Version" />
                            <label for="dtPublished"><u>Date Published:</u></label>
                            <input
                                type="date"
                                name="date published"
                                id="dtPublished"
                                class="input-device input-box-1" />
                        </div>
                        <label for="txtLink"><u>Link:</u><span class="required"> *</span></label>
                        <input
                            type="url"
                            name="link"
                            id="txtLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <label for="txtType"><u>Type:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="type"
                            id="txtType"
                            class="input-device input-box-1"
                            placeholder="eg. Source Code, Program" />
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

        const btnAdd = document.getElementById("btnAdd");
        const btnClear = document.getElementById("btnClear");
        const btnFormat = document.getElementById("btnFormat");

        const txtAuthors = document.getElementById("txtAuthors");
        const pnlAuthors = document.getElementById("pnlAuthors");

        const txtTitle = document.getElementById("txtTitle");
        const txtCodeVersion = document.getElementById("txtCodeVersion");
        const txtType = document.getElementById("txtType");
        const txtLink = document.getElementById("txtLink");
        const dtPublished = document.getElementById("dtPublished");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        let authors = [];
        const date = new Date();
        dtAccessedWhen.valueAsDate = date;

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
            if (Utilities.areNullOrEmpty(txtTitle.value, txtType.value, txtLink.value)) {
                return;
            }

            const codeSnippet = new CodeSnippet(
                authors,
                dtPublished.value,
                txtTitle.value,
                txtCodeVersion.value,
                txtType.value,
                txtLink.value,
                dtAccessedWhen.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${codeSnippet.getParaphrased()}`;
            txtReferenceList.innerHTML = codeSnippet.toString();
        });
    }
}

window.customElements.define("code-element", CodeElement);
