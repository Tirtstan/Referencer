import { gapi } from "gapi-script";
import Utilities from "./helpers/Utilities.js";

const slctMedia = document.getElementById("slctMedia");
const pnlMedia = document.getElementById("pnlMedia");
const btnCopy = document.getElementById("btnCopy");
const txtParaQuote = document.getElementById("txtParaQuote");
const txtReferenceList = document.getElementById("txtReferenceList");

slctMedia.addEventListener("change", (event) => {
    switch (event.target.value) {
        default:
        case "Book":
            pnlMedia.innerHTML = "<book-element></book-element>";
            break;
        case "YouTube":
            pnlMedia.innerHTML = "<youtube-element></youtube-element>";
            break;
        case "OnlineImage":
            pnlMedia.innerHTML = "<online-image-element></online-image-element>";
            break;
        case "Website":
            pnlMedia.innerHTML = "<website-element></website-element>";
            break;
        case "VideoGame":
            pnlMedia.innerHTML = "<video-game-element></video-game-element>";
            break;
    }

    txtParaQuote.innerHTML = "";
    txtReferenceList.innerHTML = "";
});

btnCopy.addEventListener("click", () => {
    if (Utilities.isNullOrEmpty(txtReferenceList.value)) {
        return;
    }

    copyToClipboard(txtReferenceList.innerHTML, txtReferenceList.textContent);
});

// https://stackoverflow.com/questions/23934656/how-can-i-copy-rich-text-contents-to-the-clipboard-with-javascript/77305170#77305170
async function copyToClipboard(rich, plain) {
    if (typeof ClipboardItem !== "undefined") {
        const html = new Blob([rich], { type: "text/html" });
        const text = new Blob([plain], { type: "text/plain" });
        const data = new ClipboardItem({ "text/html": html, "text/plain": text });
        await navigator.clipboard.write([data]);
    } else {
        // fallback for browser support
        const cb = (e) => {
            e.clipboardData.setData("text/html", rich);
            e.clipboardData.setData("text/plain", plain);
            e.preventDefault();
        };
        document.addEventListener("copy", cb);
        document.execCommand("copy");
        document.removeEventListener("copy", cb);
    }
}

function start() {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (Utilities.isNullOrEmpty(apiKey)) {
        console.warn("YouTube API key not found");
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
