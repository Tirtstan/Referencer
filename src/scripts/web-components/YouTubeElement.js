import Utilities from "../helpers/Utilities.js";
import YouTubeHelper from "../helpers/YouTubeHelper.js";
import YouTube from "../media/YouTube.js";
import { gapi } from "gapi-script";

class YouTubeElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<form>
        <div class="info-panel inner-panel">
                        <label for="txtLink"><u>Link:</u><span class="required"> *</span></label>
                        <div class="next-to">
                            <input
                                type="url"
                                name="link"
                                id="txtLink"
                                class="input-device input-box-1"
                                placeholder="Link" />
                            <button type="button" id="btnAutoFill" class="input-device button-1">Auto Fill</button>
                        </div>
                        <label for="txtVideoTitle"><u>Video Title:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="video title"
                            id="txtVideoTitle"
                            class="input-device input-box-1"
                            placeholder="Title" />
                        <label for="txtChannel"><u>Channel:</u><span class="required"> *</span></label>
                        <input
                            type="text"
                            name="channel"
                            id="txtChannel"
                            class="input-device input-box-1"
                            placeholder="Channel" />
                        <label for="dtAccessedWhen"><u>Date Accessed:</u></label>
                        <input type="date" name="date accessed" id="dtAccessedWhen" class="input-device input-box-1" />
                        <div class="grid-input">
                            <label for="txtYear"><u>Year:</u></label>
                            <input
                                type="number"
                                name="year"
                                id="txtYear"
                                class="input-device input-box-1"
                                placeholder="Year" />
                            <label for="btnFormat"><u>Format:</u></label>
                            <button type="button" id="btnFormat" class="input-device button-1">Format</button>
                        </div>
                    </div>
                    </form>`;

        function start() {
            const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
            if (Utilities.isNullOrEmpty(apiKey)) {
                console.warn("YouTube API key not found!");
                return;
            }

            gapi.client
                .init({
                    apiKey: apiKey,
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
                })
                .then(
                    function () {
                        console.log("GAPI client loaded for API");
                    },
                    function (err) {
                        console.error("Error loading GAPI client for API", err);
                    }
                );
        }

        gapi.load("client", start);

        const form = this.querySelector("form");

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

        let previousLink = "";

        document.onkeydown = (e) => {
            if (txtLink === document.activeElement && e.key === "Enter") {
                autoFill();
            }
        };

        form.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        };

        btnAutoFill.addEventListener("click", autoFill);

        function autoFill() {
            if (Utilities.isNullOrEmpty(txtLink.value) || !YouTubeHelper.isYouTubeLink(txtLink.value)) {
                return;
            }

            if (previousLink === txtLink.value) {
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

            previousLink = txtLink.value;
        }

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

            txtParaQuote.innerHTML = `<u><strong>In-Text Paraphrase:</strong></u><br><br>${youtube.getParaphrased()}`;
            txtReferenceList.innerHTML = youtube.toString();
        }
    }
}

window.customElements.define("youtube-element", YouTubeElement);
