class BookElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="inner-panel info-panel">
                <label for="Reference Info"><u>Referencer Info:</u></label>
                <label for="Authors"><u>Authors:</u></label>
                <div class="container-a">
                    <input type="text" name="authors" id="txtAuthors" class="input-device input-box-1" />
                    <button id="btnAdd" class="input-device button-1 add-button">Add</button>
                    <button id="btnClear" class="input-device button-1">Clear</button>
                </div>
                <textarea id="txtAuthorsOutput" name="authors-display" class="input-device" readonly></textarea>
                <div class="container-b">
                    <div class="container-b-input">
                        <label for="year"><u>Year:</u></label>
                        <input type="number" name="year" id="txtYear" class="input-device input-box-1" />
                    </div>
                    <div>
                        <label for="publication place"><u>Publication Place:</u></label>
                        <input
                            type="text"
                            name="publication place"
                            id="txtPubPlace"
                            class="input-device input-box-1" />
                    </div>
                </div>
                <div class="container-b">
                    <div class="container-b-input">
                        <label for="book name"><u>Book Name:</u></label>
                        <input type="text" name="book name" id="txtBookName" class="input-device input-box-1" />
                    </div>
                    <div>
                        <label for="publication name"><u>Publication Name:</u></label>
                        <input
                            type="text"
                            name="publication name"
                            id="txtPubName"
                            class="input-device input-box-1" />
                    </div>
                </div>
                <div class="container-b">
                    <div class="container-b-input">
                        <label for="edition number"><u>Edition Number:</u></label>
                        <input type="number" name="edition" id="txtEditionNum" class="input-device input-box-1" />
                    </div>
                    <div>
                        <label for="format"><u>Format:</u></label
                        ><button class="input-device button-1" id="btnFormat">Format</button>
                    </div>
                </div>
            </div>`;
    }
}

window.customElements.define("book-element", BookElement);
