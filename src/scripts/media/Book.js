import Utilities from "../helpers/Utilities.js";

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
        let formattedAuthors = "";
        if (Utilities.isNullOrEmpty(this.authors[0])) {
            formattedAuthors = "Anon.";
        } else {
            const formattedNames = new Array(this.authors.length);
            for (let i = 0; i < formattedNames.length; i++) {
                formattedNames[i] = Utilities.formatFullName(this.authors[i]);
            }

            formattedAuthors = Utilities.listNamesWithPeriods(formattedNames, "and");
        }

        let strYear = "";
        if (this.year <= 0) {
            strYear = "[s.a.]";
        } else {
            strYear = this.year.toString();
        }

        if (Utilities.isNullOrEmpty(this.pubPlace)) {
            this.pubPlace = "s.l";
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }

        const edition = this.editionNum > 1 ? ` ${Utilities.addOrdinal(this.editionNum)} ed. ` : "";

        return `${formattedAuthors} ${strYear}. <em>${this.bookName}</em>.
        ${edition} ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        let output = "";
        const surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a.";
        } else {
            strYear = this.year.toString();
        }

        if (this.authors.length === 1) {
            output = `${surnames[0]} (${strYear}) argues...<br><strong>OR</strong><br>... (${surnames[0]}, ${strYear})`;
        } else if (this.authors.length >= 2) {
            output = "<u>For first use...</u><br>";
            output += `${Utilities.listNames(surnames, "and")} (${strYear}) assert...<br><strong>OR</strong><br>`;
            output += `...(${Utilities.listNames(surnames, "&")}, ${strYear})`;

            output += "<br><br><u>For after first use...</u><br>";
            output += `${surnames[0]} et al. (${strYear}) argues...<br><strong>OR</strong><br>`;
            output += `(${surnames[0]} et al., ${strYear})`;
        }

        return output;
    }

    getQuote() {
        let output = "";
        let surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a.";
        } else {
            strYear = this.year.toString();
        }

        if (this.authors.length === 1) {
            output = `According to ${surnames[0]} (${strYear}: page num)<br><strong>OR</strong><br>...(${surnames[0]}, ${strYear}: page num)`;
        } else if (this.authors.length >= 2) {
            output = "<u>For first use...</u><br>";
            output += `${Utilities.listNames(surnames, "and")} (${strYear}: page num)<br><strong>OR</strong><br>`;
            output += `...(${Utilities.listNames(surnames, "&")}, ${strYear}: page num)`;

            output += "<br><br><u>For after first use...</u><br>";
            output += `${surnames[0]} et al. (${strYear}: page num) argues...<br><strong>OR</strong><br>`;
            output += `(${surnames[0]} et al., ${strYear}: page num)`;
        }

        return output;
    }
}
