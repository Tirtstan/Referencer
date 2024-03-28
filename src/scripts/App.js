const slctMedia = document.getElementById("slctMedia");
const pnlMedia = document.getElementById("pnlMedia");
const btnCopy = document.getElementById("btnCopy");
const txtOutput = document.getElementById("txtOutput");

loadScript("src/scripts/web-components/BookElement.js");
loadScript("src/scripts/web-components/YouTubeElement.js");

slctMedia.addEventListener("change", (event) => {
    switch (event.target.value) {
        default:
        case "Book":
            pnlMedia.innerHTML = "<book-element></book-element>";
            break;
        case "YouTube":
            pnlMedia.innerHTML = "<youtube-element></youtube-element>";
            break;
    }
});

btnCopy.addEventListener("click", () => {
    if (txtOutput.value === null || txtOutput.value === "") {
        return;
    }

    copyToClipboard(txtOutput.innerHTML, txtOutput.textContent);
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

function loadScript(url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "module";
    script.src = url;
    head.appendChild(script);
}
