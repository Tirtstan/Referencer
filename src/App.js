import Book from "./Media/Book.js";
import markdownIt from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm";

const btn = document.querySelector("#btnClickMe");
const p = document.querySelector("#output");

btn.addEventListener("click", () => {
    let book = new Book(2016, "The Book", 3, "The Place", "The Name", [
        "Tristan Gold",
        "Lee James",
        "Connor Grayington",
    ]);

    const md = markdownIt();
    p.innerHTML = md.renderInline(book.toString());
});
