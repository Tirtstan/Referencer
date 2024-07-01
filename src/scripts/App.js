import Utilities from "./helpers/Utilities.js";

const slctMedia = document.getElementById("slctMedia");
const pnlMedia = document.getElementById("pnlMedia");
const btnCopy = document.getElementById("btnCopy");
const txtParaQuote = document.getElementById("txtParaQuote");
const txtReferenceList = document.getElementById("txtReferenceList");

const toggle = document.getElementById("theme-toggle");

const btnClearInfo = document.getElementById("btnClearInfo");

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
        case "Pinterest":
            pnlMedia.innerHTML = "<pinterest-element></pinterest-element>";
            break;
        case "Blog":
            pnlMedia.innerHTML = "<blog-element></blog-element>";
            break;
        case "Code":
            pnlMedia.innerHTML = "<code-element></code-element>";
            break;
        case "App":
            pnlMedia.innerHTML = "<application-element></application-element>";
            break;
        case "Sound":
            pnlMedia.innerHTML = "<sound-element></sound-element>";
            break;
        case "OwnDrawing":
            pnlMedia.innerHTML = "<own-drawing-element></own-drawing-element>";
            break;
        case "OwnPhoto":
            pnlMedia.innerHTML = "<own-photo-element></own-photo-element>";
            break;
        case "Film":
            pnlMedia.innerHTML = "<film-element></film-element>";
            break;
    }

    txtParaQuote.innerHTML = "";
    txtReferenceList.innerHTML = "";
});

btnClearInfo.addEventListener("click", () => {
    const form = pnlMedia.querySelector("form");
    form.reset();
});

btnCopy.addEventListener("click", () => {
    if (Utilities.isNullOrEmpty(txtReferenceList.innerHTML)) {
        return;
    }

    copyToClipboard(txtReferenceList.innerHTML, txtReferenceList.textContent);
});

// https://lukelowrey.com/css-variable-theme-switcher/
const storedTheme =
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

toggle.onclick = function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
};

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
