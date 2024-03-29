import Utilities from "../helpers/Utilities.js";
import Book from "../media/Book.js";

class BookElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                 <div class="inner-panel info-panel">
                        <label for="Reference Info"><u>Referencer Info:</u></label>
                        <label for="Authors"><u>Authors:</u></label>
                        <div class="container-a">
                            <input
                                type="text"
                                name="authors"
                                id="txtAuthors"
                                class="input-device input-box-1 input-space"
                                placeholder="Name And/Or Surname" />
                            <button id="btnAdd" class="input-device button-1 add-button">Add</button>
                            <button id="btnClear" class="input-device button-1">Clear</button>
                        </div>
                        <textarea id="txtAuthorsOutput" name="authors-display" class="input-device" readonly></textarea>
                        <div class="container-b">
                            <div class="input-space">
                                <label for="year"><u>Year:</u></label>
                                <input
                                    type="number"
                                    name="year"
                                    id="txtYear"
                                    class="input-device input-box-1"
                                    placeholder="Year" />
                            </div>
                            <div>
                                <label for="publication place"><u>Publication Place:</u></label>
                                <input
                                    type="text"
                                    name="publication place"
                                    id="txtPubPlace"
                                    class="input-device input-box-1"
                                    placeholder="Publication Place" />
                            </div>
                        </div>
                        <div class="container-b">
                            <div class="input-space">
                                <label for="book name"><u>Book Name:</u></label>
                                <input
                                    type="text"
                                    name="book name"
                                    id="txtBookName"
                                    class="input-device input-box-1"
                                    placeholder="Book Name" />
                            </div>
                            <div>
                                <label for="publication name"><u>Publication Name:</u></label>
                                <input
                                    type="text"
                                    name="publication name"
                                    id="txtPubName"
                                    class="input-device input-box-1"
                                    placeholder="Publication Name" />
                            </div>
                        </div>
                        <div class="container-b">
                            <div class="input-space">
                                <label for="edition number"><u>Edition Number:</u></label>
                                <input
                                    type="number"
                                    name="edition"
                                    id="txtEditionNum"
                                    class="input-device input-box-1"
                                    placeholder="Edition Number" />
                            </div>
                            <div>
                                <label for="format"><u>Format:</u></label
                                ><button class="input-device button-1" id="btnFormat">Format</button>
                            </div>
                        </div>
                    </div>`;

        const btnAdd = document.getElementById("btnAdd");
        const btnClear = document.getElementById("btnClear");
        const btnFormat = document.getElementById("btnFormat");

        const txtAuthors = document.getElementById("txtAuthors");
        const txtAuthorsOutput = document.getElementById("txtAuthorsOutput");

        const txtYear = document.getElementById("txtYear");
        const txtPubPlace = document.getElementById("txtPubPlace");
        const txtBookName = document.getElementById("txtBookName");
        const txtPubName = document.getElementById("txtPubName");
        const txtEditionNum = document.getElementById("txtEditionNum");

        const txtOtherInfo = document.getElementById("txtOtherInfo");
        const txtOutput = document.getElementById("txtOutput");

        let authors = [];
        txtYear.value = new Date().getFullYear();
        txtEditionNum.value = 1;

        btnAdd.addEventListener("click", () => {
            if (txtAuthors.value === null || txtAuthors.value === "") {
                return;
            }

            authors.push(txtAuthors.value);
            txtAuthors.value = "";
            txtAuthorsOutput.value = "";

            for (let i = 0; i < authors.length; i++) {
                txtAuthorsOutput.value = Utilities.listNames(authors, "and");
            }
        });

        btnClear.addEventListener("click", () => {
            authors = [];
            txtAuthors.value = "";
            txtAuthorsOutput.value = "";
        });

        btnFormat.addEventListener("click", () => {
            const book = new Book(
                txtYear.value,
                txtBookName.value,
                txtEditionNum.value,
                txtPubPlace.value,
                txtPubName.value,
                authors
            );

            txtOtherInfo.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${book.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${book.getQuote()}`;
            txtOutput.innerHTML = book.toString();
        });
    }
}

window.customElements.define("book-element", BookElement);
