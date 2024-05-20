import Utilities from "../helpers/Utilities";
import Film from "../media/Film";

class FilmElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="txtTitle"><u>Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="title"
                            id="txtTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtDirector"><u>Director:</u></label>
                        <input
                            type="text"
                            name="director"
                            id="txtDirector"
                            class="input-device input-box-1"
                            placeholder="Director" />
                        <label for="slctMedium"><u>Medium:</u><span class="required"> *</span></label>
                        <select name="medium-types" id="slctMedium" class="input-device select-1">
                            <option value="Film" selected>Film</option>
                            <option value="Video">Video</option>
                            <option value="DVD">DVD</option>
                        </select>
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

        const txtTitle = document.getElementById("txtTitle");
        const txtDirector = document.getElementById("txtDirector");
        const slctMedium = document.getElementById("slctMedium");
        const txtPubPlace = document.getElementById("txtPubPlace");
        const txtPubName = document.getElementById("txtPubName");
        const txtYear = document.getElementById("txtYear");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        txtYear.value = new Date().getFullYear();

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtTitle.value, slctMedium.value)) {
                return;
            }

            const film = new Film(
                txtTitle.value,
                txtYear.value,
                txtDirector.value,
                slctMedium.value,
                txtPubPlace.value,
                txtPubName.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${film.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${film.getQuote()}`;
            txtReferenceList.innerHTML = film.toString();
        });
    }
}

window.customElements.define("film-element", FilmElement);
