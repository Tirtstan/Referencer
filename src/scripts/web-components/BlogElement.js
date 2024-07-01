import Utilities from "../helpers/Utilities";
import Blog from "../media/Blog";

class BlogElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<form>
        <div class="info-panel inner-panel">
                        <label for="txtLink"><u>Link:</u><span class="required"> *</span></label>
                        <input
                            type="url"
                            name="link"
                            id="txtLink"
                            class="input-device input-box-1"
                            placeholder="Link" />
                        <label for="txtArticleTitle"><u>Article Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="article title"
                            id="txtArticleTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtPubName"><u>Publication Name:</u></label>
                        <input
                            type="text"
                            name="publication name"
                            id="txtPubName"
                            class="input-device input-box-1"
                            placeholder="Name" />
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
                            <button type="button" id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>
                    </form>`;

        const form = this.querySelector("form");

        const btnFormat = document.getElementById("btnFormat");

        const txtLink = document.getElementById("txtLink");
        const txtArticleTitle = document.getElementById("txtArticleTitle");
        const txtPubName = document.getElementById("txtPubName");
        const txtAuthor = document.getElementById("txtAuthor");
        const dtPublished = document.getElementById("dtPublished");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        const date = new Date();
        dtAccessedWhen.valueAsDate = date;

        form.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        };

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtArticleTitle.value, txtLink.value)) {
                return;
            }

            const blog = new Blog(
                txtAuthor.value,
                txtArticleTitle.value,
                txtPubName.value,
                dtPublished.value,
                txtLink.value,
                dtAccessedWhen.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${blog.getParaphrased()}<br><br><u><strong>In-Text Quote:</strong></u><br><br>${blog.getQuote()}`;
            txtReferenceList.innerHTML = blog.toString();
        });
    }
}

window.customElements.define("blog-element", BlogElement);
