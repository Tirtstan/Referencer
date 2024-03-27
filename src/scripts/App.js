import Book from "./media/Book.js";
import Utilities from "./Utilities.js";

const btnAdd = document.getElementById("btnAdd");
const btnClear = document.getElementById("btnClear");
const btnFormat = document.getElementById("btnFormat");
const btnCopy = document.getElementById("btnCopy");

const txtAuthors = document.getElementById("txtAuthors");
const txtAuthorsOutput = document.getElementById("txtAuthorsOutput");

const txtYear = document.getElementById("txtYear");
const txtPubPlace = document.getElementById("txtPubPlace");
const txtBookName = document.getElementById("txtBookName");
const txtPubName = document.getElementById("txtPubName");
const txtEditionNum = document.getElementById("txtEditionNum");

const txtOtherInfo = document.getElementById("txtOtherInfo");
const txtOutput = document.getElementById("txtOutput");

let authors = [];

const date = new Date();
txtYear.value = date.getFullYear();
txtEditionNum.value = 1;

btnAdd.addEventListener("click", () => {
    if (txtAuthors.value === null || txtAuthors.value === "") {
        return;
    }

    authors.push(txtAuthors.value);
    txtAuthors.value = "";
    txtAuthorsOutput.value = "";

    for (let i = 0; i < authors.length; i++) {
        txtAuthorsOutput.value = Utilities.listNames(authors, "and");
    }
});

btnClear.addEventListener("click", () => {
    authors = [];
    txtAuthors.value = "";
    txtAuthorsOutput.value = "";
});

btnFormat.addEventListener("click", () => {
    if (Utilities.areNullOrEmpty(txtBookName.value, txtPubPlace.value, txtPubName.value)) {
        return;
    }

    const book = new Book(
        txtYear.value,
        txtBookName.value,
        txtEditionNum.value,
        txtPubPlace.value,
        txtPubName.value,
        authors
    );

    txtOtherInfo.innerHTML = book.toString();
    txtOutput.innerHTML = book.toString();
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
