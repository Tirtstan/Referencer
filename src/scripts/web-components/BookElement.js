import Utilities from "../helpers/Utilities.js";
import Book from "../media/Book.js";

class BookElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<form>
        <div class="info-panel inner-panel">
                        <label for="txtAuthors"><u>Authors:</u></label>
                        <div class="next-to">
                            <input
                                type="text"
                                name="authors"
                                id="txtAuthors"
                                class="input-device input-box-1"
                                placeholder="Name And/Or Surname" />
                            <button type="button" id="btnAdd" class="input-device button-1">Add</button>
                            <button type="button" id="btnClear" class="input-device button-1">Clear</button>
                        </div>
                        <div id="pnlAuthors" class="input-device chip-input"></div>
                        <div class="grid-input">
                            <label for="txtYear"><u>Year:</u></label>
                            <input
                                type="number"
                                name="year"
                                id="txtYear"
                                class="input-device input-box-1"
                                placeholder="Year" />
                            <label for="txtEditionNum"><u>Edition Number:</u></label>
                            <input
                                type="number"
                                name="edition number"
                                id="txtEditionNum"
                                class="input-device input-box-1"
                                placeholder="Edition" />
                        </div>
                        <div class="grid-input">
                            <label for="txtBookName"><u>Book Name:</u><span class="required"> *</span></label>
                            <input
                                type="text"
                                name="book name"
                                id="txtBookName"
                                class="input-device input-box-1"
                                placeholder="Name" />
                            <label for="txtPubName"><u>Publication Name:</u></label>
                            <input
                                type="text"
                                name="publication name"
                                id="txtPubName"
                                class="input-device input-box-1"
                                placeholder="Name" />
                        </div>
                        <div class="grid-input">
                            <label for="txtPubPlace"><u>Publication Place:</u></label>
                            <input
                                type="text"
                                name="publication place"
                                id="txtPubPlace"
                                class="input-device input-box-1"
                                placeholder="Place" />
                            <label for="btnFormat"><u>Format:</u></label>
                            <button type="button" id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>
                    </form>`;

        const form = this.querySelector("form");

        const btnAdd = document.getElementById("btnAdd");
        const btnClear = document.getElementById("btnClear");
        const btnFormat = document.getElementById("btnFormat");

        const txtAuthors = document.getElementById("txtAuthors");
        const pnlAuthors = document.getElementById("pnlAuthors");

        const txtYear = document.getElementById("txtYear");
        const txtPubPlace = document.getElementById("txtPubPlace");
        const txtBookName = document.getElementById("txtBookName");
        const txtPubName = document.getElementById("txtPubName");
        const txtEditionNum = document.getElementById("txtEditionNum");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        let authors = [];
        txtYear.value = new Date().getFullYear();
        txtEditionNum.value = 1;

        document.onkeydown = (e) => {
            if (txtAuthors === document.activeElement && e.key === "Enter") {
                addAuthor();
            }
        };

        form.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        };

        form.addEventListener("reset", () => {
            authors = [];
            pnlAuthors.innerHTML = "";
        });

        btnAdd.addEventListener("click", addAuthor);

        function addAuthor() {
            if (Utilities.isNullOrEmpty(txtAuthors.value)) {
                return;
            }

            authors.push(txtAuthors.value);
            txtAuthors.value = "";
            displayAllAuthors();
        }

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
            if (Utilities.isNullOrEmpty(txtBookName.value)) {
                return;
            }

            const book = new Book(
                txtYear.value,
                txtBookName.value,
                txtEditionNum.value,
                txtPubPlace.value,
                txtPubName.value,
                authors
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${book.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${book.getQuote()}`;
            txtReferenceList.innerHTML = book.toString();
        });
    }
}

window.customElements.define("book-element", BookElement);
