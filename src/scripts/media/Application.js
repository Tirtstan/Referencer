import moment from "moment";
import Utilities from "../helpers/Utilities.js";

export default class Application {
    constructor(authors, datePublished, appTitle, version, availableAt, accessedWhen) {
        this.authors = authors;
        this.datePublished = datePublished;
        this.appTitle = appTitle;
        this.version = version;
        this.availableAt = availableAt;
        this.accessedWhen = accessedWhen;

        if (Utilities.isNullOrEmpty(this.authors[0])) {
            this.authors = ["Anon"];
        }

        if (Utilities.isNullOrEmpty(this.datePublished)) {
            this.datePublished = "n.d";
            this.year = new Date(this.accessedWhen).getFullYear();
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

        const version = Utilities.isNullOrEmpty(this.version) ? "" : `Version ${this.version}. `;
        return `${Utilities.listNamesWithPeriods(formattedNames, "and")} ${this.year}. <em>${
            this.appTitle
        }</em>. ${version}[App] Available at: <a href="${this.availableAt}">${this.availableAt}</a> (Accessed ${
            this.accessedWhen
        }).`;
    }

    getParaphrased() {
        const surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        return `${Utilities.listNames(surnames, "and")} (${this.year}) includes functions...`;
    }
}
