import Utilities from "../helpers/Utilities";
import OnlineImage from "../media/OnlineImage";

class OnlineImageElement extends HTMLElement {
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
                        <div class="stretch-grow">
                            <label for="image title"><u>Image Title:</u></label>
                            <input
                                type="text"
                                name="image title"
                                id="txtImgTitle"
                                class="input-device input-box-1"
                                placeholder="Title" />
                        </div>
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
                                <label for="link"><u>Link:</u></label>
                                <input
                                    type="url"
                                    name="link"
                                    id="txtLink"
                                    class="input-device input-box-1"
                                    placeholder="Link" />
                            </div>
                            <div>
                                <label for="date accessed"><u>Date Accessed:</u></label>
                                <input
                                    type="date"
                                    name="date accessed"
                                    id="dtAccessedWhen"
                                    class="input-device input-box-1" />
                            </div>
                        </div>
                        <div class="container-b">
                            <div class="input-space">
                                <label for="article title"><u>Article Title:</u></label>
                                <input
                                    type="text"
                                    name="article title"
                                    id="txtArticleTitle"
                                    class="input-device input-box-1"
                                    placeholder="Title" />
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

        const txtImgTitle = document.getElementById("txtImgTitle");
        const txtYear = document.getElementById("txtYear");
        const txtPubName = document.getElementById("txtPubName");
        const txtLink = document.getElementById("txtLink");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");

        const txtArticleTitle = document.getElementById("txtArticleTitle");

        const txtOtherInfo = document.getElementById("txtOtherInfo");
        const txtOutput = document.getElementById("txtOutput");

        let authors = [];
        const date = new Date();
        dtAccessedWhen.valueAsDate = date;
        txtYear.value = date.getFullYear();

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
            const onlineImage = new OnlineImage(
                authors,
                txtYear.value,
                txtImgTitle.value,
                txtArticleTitle.value,
                txtPubName.value,
                dtAccessedWhen.valueAsDate,
                txtLink.value
            );

            txtOtherInfo.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${onlineImage.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${onlineImage.getQuote()}`;
            txtOutput.innerHTML = onlineImage.toString();
        });
    }
}

window.customElements.define("online-image-element", OnlineImageElement);