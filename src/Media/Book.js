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
            formattedAuthors[i] = Utilities.FormatFullName(this.authors[i]);
        }
        const edition = this.editionNum > 1 ? ` ${Utilities.AddOrdinal(this.editionNum)} ed. ` : "";

        return `${Utilities.ListNamesWithPeriods(formattedAuthors, "and")} ${this.year}. *${this.bookName}*.
        ${edition} ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        throw new Error("Method not implemented.");
    }

    getQuote() {
        throw new Error("Method not implemented.");
    }
}
