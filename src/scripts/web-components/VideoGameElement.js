import Utilities from "../helpers/Utilities";
import VideoGame from "../media/VideoGame";

class VideoGameElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="game title"><u>Game Title:</u></label>
                        <input
                            type="text"
                            name="game title"
                            id="txtGameTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="author"><u>Author:</u></label>
                        <input
                            type="text"
                            name="author"
                            id="txtAuthor"
                            class="input-device input-box-1"
                            placeholder="Name And/Or Surname" />
                        <label for="platform"><u>Platform:</u></label>
                        <input
                            type="text"
                            name="platform"
                            id="txtPlatform"
                            class="input-device input-box-1"
                            placeholder="Platform" />
                        <div class="grid-input">
                            <label for="publication name"><u>Publication Name:</u></label>
                            <input
                                type="text"
                                name="publication name"
                                id="txtPubName"
                                class="input-device input-box-1"
                                placeholder="Name" />
                            <label for="publication place"><u>Publication Place:</u></label>
                            <input
                                type="text"
                                name="publication place"
                                id="txtPubPlace"
                                class="input-device input-box-1"
                                placeholder="Place" />
                        </div>
                        <div class="grid-input">
                            <label for="year"><u>Year:</u></label>
                            <input
                                type="number"
                                name="year"
                                id="txtYear"
                                class="input-device input-box-1"
                                placeholder="Year" />
                            <label for="format"><u>Format:</u></label>
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

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtGameTitle.value, txtPlatform.value, txtPubPlace.value)) {
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

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${videoGame.getParaphrased()}<br><br><u><strong>In-Text Quote:</strong></u><br><br>${videoGame.getQuote()}`;
            txtReferenceList.innerHTML = videoGame.toString();
        });
    }
}

window.customElements.define("video-game-element", VideoGameElement);
