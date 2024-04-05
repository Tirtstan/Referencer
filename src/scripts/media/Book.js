import Utilities from "../helpers/Utilities.js";

export default class Book {
    constructor(year, bookName, editionNum, pubPlace, pubName, authors) {
        this.year = year;
        this.bookName = bookName;
        this.editionNum = editionNum;
        this.pubPlace = pubPlace;
        this.pubName = pubName;
        this.authors = authors;

        if (Utilities.isNullOrEmpty(this.authors[0])) {
            this.authors = ["Anon"];
        }

        if (this.year <= 0) {
            this.year = "s.a";
        }

        if (Utilities.isNullOrEmpty(this.pubPlace)) {
            this.pubPlace = "s.l";
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }
    }

    toString() {
        const formattedNames = new Array(this.authors.length);
        for (let i = 0; i < formattedNames.length; i++) {
            formattedNames[i] = Utilities.formatFullName(this.authors[i]);
        }

        const edition = this.editionNum > 1 ? ` ${Utilities.addOrdinal(this.editionNum)} ed. ` : "";

        return `${Utilities.listNamesWithPeriods(formattedNames, "and")} ${this.year}. <em>${this.bookName}</em>.
        ${edition} ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        let output = "";
        const surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        if (this.authors.length === 1) {
            output = `${surnames[0]} (${this.year}) argues...<br><strong>OR</strong><br>... (${surnames[0]}, ${this.year})`;
        } else if (this.authors.length >= 2) {
            output = "<u>For first use...</u><br>";
            output += `${Utilities.listNames(surnames, "and")} (${this.year}) assert...<br><strong>OR</strong><br>`;
            output += `...(${Utilities.listNames(surnames, "&")}, ${this.year})`;

            output += "<br><br><u>For after first use...</u><br>";
            output += `${surnames[0]} et al. (${this.year}) argues...<br><strong>OR</strong><br>`;
            output += `(${surnames[0]} et al., ${this.year})`;
        }

        return output;
    }

    getQuote() {
        let output = "";
        let surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        if (this.authors.length === 1) {
            output = `According to ${surnames[0]} (${this.year}: page num)<br><strong>OR</strong><br>...(${surnames[0]}, ${this.year}: page num)`;
        } else if (this.authors.length >= 2) {
            output = "<u>For first use...</u><br>";
            output += `${Utilities.listNames(surnames, "and")} (${this.year}: page num)<br><strong>OR</strong><br>`;
            output += `...(${Utilities.listNames(surnames, "&")}, ${this.year}: page num)`;

            output += "<br><br><u>For after first use...</u><br>";
            output += `${surnames[0]} et al. (${this.year}: page num) argues...<br><strong>OR</strong><br>`;
            output += `(${surnames[0]} et al., ${this.year}: page num)`;
        }

        return output;
    }
}
