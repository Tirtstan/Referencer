import Utilities from "../Utilities.js";
import YouTube from "../media/YouTube.js";

class YouTubeElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <div class="inner-panel info-panel">
                        <label for="Reference Info"><u>Referencer Info YouTube:</u></label>
                        <label for="Link"><u>Link:</u></label>
                        <div class="container-a">
                            <input
                                type="url"
                                name="link"
                                id="txtLink"
                                class="input-device input-box-1"
                                placeholder="YouTube URL" />
                            <button id="btnAutoFill" class="input-device button-1">Auto Fill</button>
                        </div>
                        <div class="container-b">
                            <div>
                                <label for="video title"><u>Video Title:</u></label>
                                <input
                                    type="text"
                                    name="video title"
                                    id="txtTitle"
                                    class="input-device input-box-1"
                                    placeholder="Title" />
                            </div>
                        </div>
                        <div class="container-b">
                            <div>
                                <label for="channel"><u>Channel:</u></label>
                                <input
                                    type="text"
                                    name="channel"
                                    id="txtChannel"
                                    class="input-device input-box-1"
                                    placeholder="Channel" />
                            </div>
                        </div>
                        <div class="container-b">
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
                            <div class="container-b-input">
                                <label for="year uploaded"><u>Year Uploaded:</u></label>
                                <input
                                    type="number"
                                    name="year"
                                    id="txtYear"
                                    class="input-device input-box-1"
                                    placeholder="Year" />
                            </div>
                            <div>
                                <label for="format"><u>Format:</u></label
                                ><button class="input-device button-1" id="btnFormat">Format</button>
                            </div>
                        </div>
                    </div>`;

        const btnAutoFill = document.getElementById("btnAutoFill");
        const btnFormat = document.getElementById("btnFormat");

        const txtLink = document.getElementById("txtLink");
        const txtTitle = document.getElementById("txtTitle");
        const txtChannel = document.getElementById("txtChannel");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");
        const txtYear = document.getElementById("txtYear");

        const date = new Date();
        dtAccessedWhen.valueAsDate = date;
        txtYear.value = date.getFullYear();

        btnAutoFill.addEventListener("click", () => {
            console.log("coming soon...");
        });

        btnFormat.addEventListener("click", () => {
            if (Utilities.areNullOrEmpty(txtTitle.value, txtChannel.value, txtLink.value)) {
                return;
            }

            const youtube = new YouTube(
                txtTitle.value,
                txtYear.value,
                txtChannel.value,
                txtLink.value,
                dtAccessedWhen.value
            );

            txtOtherInfo.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${youtube.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${youtube.getQuote()}`;
            txtOutput.innerHTML = youtube.toString();
        });
    }
}

window.customElements.define("youtube-element", YouTubeElement);
