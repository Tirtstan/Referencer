import Utilities from "../helpers/Utilities.js";
import YouTubeHelper from "../helpers/YouTubeHelper.js";
import YouTube from "../media/YouTube.js";
import { gapi } from "gapi-script";

class YouTubeElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="info-panel inner-panel">
                        <label for="link"><u>Link:</u></label>
                        <div class="next-to">
                            <input
                                type="url"
                                name="link"
                                id="txtLink"
                                class="input-device input-box-1"
                                placeholder="Link" />
                            <button id="btnAutoFill" class="input-device button-1">Auto Fill</button>
                        </div>
                        <label for="video title"><u>Video Title:</u></label>
                        <input
                            type="text"
                            name="video title"
                            id="txtVideoTitle"
                            class="input-device input-box-1"
                            placeholder="Video Title" />
                        <label for="channel"><u>Channel:</u></label>
                        <input
                            type="text"
                            name="channel"
                            id="txtChannel"
                            class="input-device input-box-1"
                            placeholder="Channel" />
                        <label for="date accessed"><u>Date Accessed:</u></label>
                        <input type="date" name="date accessed" id="dtAccessedWhen" class="input-device input-box-1" />
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

        const btnAutoFill = document.getElementById("btnAutoFill");
        const btnFormat = document.getElementById("btnFormat");

        const txtLink = document.getElementById("txtLink");
        const txtVideoTitle = document.getElementById("txtVideoTitle");
        const txtChannel = document.getElementById("txtChannel");
        const dtAccessedWhen = document.getElementById("dtAccessedWhen");
        const txtYear = document.getElementById("txtYear");

        const txtParaQuote = document.getElementById("txtParaQuote");
        const txtReferenceList = document.getElementById("txtReferenceList");

        const date = new Date();
        dtAccessedWhen.valueAsDate = date;
        txtYear.value = date.getFullYear();

        btnAutoFill.addEventListener("click", () => {
            if (Utilities.isNullOrEmpty(txtLink.value) || !YouTubeHelper.isYouTubeLink(txtLink.value)) {
                return;
            }

            gapi.client.youtube.videos
                .list({
                    part: ["snippet"],
                    id: [YouTubeHelper.getYouTubeId(txtLink.value)],
                })
                .then(
                    function (response) {
                        const snippet = response.result.items[0].snippet;

                        txtVideoTitle.value = snippet.title;
                        txtChannel.value = snippet.channelTitle;

                        const dateString = snippet.publishedAt.split("T")[0];
                        txtYear.value = new Date(dateString).getFullYear();

                        FillInfo();
                    },
                    function (err) {
                        console.error("Execute error", err);
                    }
                );
        });

        btnFormat.addEventListener("click", FillInfo);

        function FillInfo() {
            if (Utilities.areNullOrEmpty(txtVideoTitle.value, txtChannel.value, txtLink.value)) {
                return;
            }

            const youtube = new YouTube(
                txtVideoTitle.value,
                txtYear.value,
                txtChannel.value,
                txtLink.value,
                dtAccessedWhen.value
            );

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${youtube.getParaphrased()}
            <br><br><u><strong>In-Text Quote:</strong></u><br><br>${youtube.getQuote()}`;
            txtReferenceList.innerHTML = youtube.toString();
        }
    }
}

window.customElements.define("youtube-element", YouTubeElement);
