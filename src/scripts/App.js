const btnCopy = document.getElementById("btnCopy");

const txtOtherInfo = document.getElementById("txtOtherInfo");
const txtOutput = document.getElementById("txtOutput");

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
