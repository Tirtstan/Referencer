import Utilities from "../helpers/Utilities";
import VideoGame from "../media/VideoGame";

class VideoGameElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="txtGameTitle"><u>Game Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="game title"
                            id="txtGameTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtAuthor"><u>Author:</u></label>
                        <input
                            type="text"
                            name="author"
                            id="txtAuthor"
                            class="input-device input-box-1"
                            placeholder="Name And/Or Surname" />
                        <label for="txtPlatform"><u>Platform:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="platform"
                            id="txtPlatform"
                            class="input-device input-box-1"
                            placeholder="Platform" />
                        <div class="grid-input">
                            <label for="txtPubName"><u>Publication Name:</u></label>
                            <input
                                type="text"
                                name="publication name"
                                id="txtPubName"
                                class="input-device input-box-1"
                                placeholder="Name" />
                            <label for="txtPubPlace"><u>Publication Place:</u></label>
                            <input
                                type="text"
                                name="publication place"
                                id="txtPubPlace"
                                class="input-device input-box-1"
                                placeholder="Place" />
                        </div>
                        <div class="grid-input">
                            <label for="txtYear"><u>Year:</u></label>
                            <input
                                type="number"
                                name="year"
                                id="txtYear"
                                class="input-device input-box-1"
                                placeholder="Year" />
                            <label for="btnFormat"><u>Format:</u></label>
                            <button id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>`;

        const btnFormat = document.getElementById("btnFormat");

        const txtGameTitle = document.getElementById("txtGameTitle");
        const txtAuthor = document.getElementById("txtAuthor");
        const txtPlatform = document.getElementById("txtPlatform");

        const txtPubPlace = document.getElementById("txtPubPlace");
        const txtPubName = document.getElementById("txtPubName");
        const txtYear = document.getElementById("txtYear");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        txtYear.value = new Date().getFullYear();

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtGameTitle.value, txtPlatform.value)) {
                return;
            }

            const videoGame = new VideoGame(
                txtAuthor.value,
                txtYear.value,
                txtGameTitle.value,
                txtPlatform.value,
                txtPubPlace.value,
                txtPubName.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${videoGame.getParaphrased()}`;
            txtReferenceList.innerHTML = videoGame.toString();
        });
    }
}

window.customElements.define("video-game-element", VideoGameElement);
