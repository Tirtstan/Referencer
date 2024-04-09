import moment from "moment";
import Utilities from "../helpers/Utilities.js";

export default class CodeSnippet {
    constructor(authors, datePublished, title, codeVersion, type, link, accessedWhen) {
        this.authors = authors;
        this.datePublished = datePublished;
        this.title = title;
        this.codeVersion = codeVersion;
        this.type = type;
        this.link = link;
        this.accessedWhen = accessedWhen;

        if (Utilities.isNullOrEmpty(this.authors[0])) {
            this.authors = ["Anon"];
        }

        if (Utilities.isNullOrEmpty(this.datePublished)) {
            this.datePublished = "n.d";
            this.year = "s.a";
        } else {
            const published = moment(this.datePublished);
            this.datePublished = published.format("DD MMMM YYYY");
            this.year = new Date(this.datePublished).getFullYear();
        }

        const accessed = moment(this.accessedWhen);
        this.accessedWhen = accessed.format("DD MMMM YYYY");
    }

    toString() {
        const formattedNames = new Array(this.authors.length);
        for (let i = 0; i < formattedNames.length; i++) {
            formattedNames[i] = Utilities.formatFullName(this.authors[i]);
        }

        return `${Utilities.listNamesWithPeriods(formattedNames, "and")} (${this.year}). <em>${
            this.title
        }</em> (Version ${this.codeVersion}) [${this.type}]. ${this.link} (Accessed ${this.accessedWhen}).`;
    }

    getParaphrased() {
        const surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        return `${Utilities.listNames(surnames, "and")} (${this.year}) demonstrates how...`;
    }

    getQuote() {
        return "N/A";
    }
}
