import moment from "moment";
import Utilities from "../helpers/Utilities.js";

export default class OnlineImage {
    constructor(authors, year, imgTitle, articleTitle, pubName, accessedWhen, link) {
        this.authors = authors;
        this.year = year;
        this.title = imgTitle;
        this.articleTitle = articleTitle;
        this.pubName = pubName;
        this.accessedWhen = accessedWhen;
        this.link = link;

        if (Utilities.isNullOrEmpty(this.authors[0])) {
            this.authors = ["Anon"];
        }

        if (this.year <= 0) {
            this.year = "s.a";
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }
    }

    toString() {
        const date = moment(this.accessedWhen);
        const formattedDate = date.format("DD MMMM YYYY");

        const formattedNames = new Array(this.authors.length);
        for (let i = 0; i < formattedNames.length; i++) {
            formattedNames[i] = Utilities.formatFullName(this.authors[i]);
        }

        const referenceList = `${this.pubName}. ${this.year}. <em>${this.articleTitle}</em>. [Online]. Available at: ${this.link} [Accessed ${formattedDate}]`;
        const figureList = `Figure 1: ${Utilities.listNamesWithPeriods(formattedNames, "and")} ${this.year}. <em>${
            this.title
        }</em>.`;

        return `<u><strong>In The Reference List:</strong></u><br><br>${referenceList}<br><br><u><strong>In The List of Figures:</strong></u><br><br>${figureList}`;
    }

    getParaphrased() {
        const surnames = new Array(this.authors.length);
        for (let i = 0; i < surnames.length; i++) {
            surnames[i] = Utilities.getSurname(this.authors[i]);
        }

        return `In ${Utilities.listNames(surnames, "and")}'s (${this.year}) image, <em>${
            this.title
        }</em>, it is evident that...`;
    }

    getQuote() {
        const formattedNames = new Array(this.authors.length);
        for (let i = 0; i < formattedNames.length; i++) {
            formattedNames[i] = Utilities.formatFullName(this.authors[i]);
        }

        return `Figure 1: ${Utilities.listNamesWithPeriods(formattedNames, "and")} ${this.year}, <em>${
            this.articleTitle
        }</em>. (${this.pubName}, ${this.year})`;
    }
}
