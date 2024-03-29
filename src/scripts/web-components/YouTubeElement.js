import Utilities from "../helpers/Utilities.js";
import YouTubeHelper from "../helpers/YouTubeHelper.js";
import YouTube from "../media/YouTube.js";
import { gapi } from "gapi-script";

class YouTubeElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="inner-panel info-panel">
                        <label for="Reference Info"><u>Referencer Info:</u></label>
                        <label for="Link"><u>Link:</u></label>
                        <div class="container-a">
                            <input
                                type="url"
                                name="link"
                                id="txtLink"
                                class="input-device input-box-1 input-space"
                                placeholder="YouTube URL" />
                            <button id="btnAutoFill" class="input-device button-1">Auto Fill</button>
                        </div>
                        <div class="stretch-grow">
                            <label for="video title"><u>Video Title:</u></label>
                            <input
                                type="text"
                                name="video title"
                                id="txtTitle"
                                class="input-device input-box-1"
                                placeholder="Title" />
                        </div>
                        <div class="stretch-grow">
                            <label for="channel"><u>Channel:</u></label>
                            <input
                                type="text"
                                name="channel"
                                id="txtChannel"
                                class="input-device input-box-1"
                                placeholder="Channel" />
                        </div>
                        <div class="stretch-grow">
                            <label for="date accessed"><u>Date Accessed:</u></label>
                            <input
                                type="date"
                                name="date accessed"
                                id="dtAccessedWhen"
                                class="input-device input-box-1" />
                        </div>
                        <div class="container-b">
                            <div class="input-space">
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

        const txtOtherInfo = document.getElementById("txtOtherInfo");
        const txtOutput = document.getElementById("txtOutput");

        const date = new Date();
        dtAccessedWhen.valueAsDate = date;
        txtYear.value = date.getFullYear();

        btnAutoFill.addEventListener("click", () => {
            if (txtLink.value === "" || txtLink.value === null || !YouTubeHelper.isYouTubeLink(txtLink.value)) {
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

                        txtTitle.value = snippet.title;
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
        }
    }
}

window.customElements.define("youtube-element", YouTubeElement);
