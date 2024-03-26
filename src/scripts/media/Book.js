import Utilities from "../Utilities.js";

export default class Book {
    constructor(year, bookName, editionNum, pubPlace, pubName, authors) {
        this.year = year;
        this.bookName = bookName;
        this.editionNum = editionNum;
        this.pubPlace = pubPlace;
        this.pubName = pubName;
        this.authors = authors;
    }

    toString() {
        const formattedAuthors = new Array(this.authors.length);
        for (let i = 0; i < formattedAuthors.length; i++) {
            formattedAuthors[i] = Utilities.formatFullName(this.authors[i]);
        }
        const edition = this.editionNum > 1 ? ` ${Utilities.addOrdinal(this.editionNum)} ed. ` : "";

        return `${Utilities.listNamesWithPeriods(formattedAuthors, "and")} ${this.year}. <em>${this.bookName}</em>.
        ${edition} ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        throw new Error("Method not implemented.");
    }

    getQuote() {
        throw new Error("Method not implemented.");
    }
}
