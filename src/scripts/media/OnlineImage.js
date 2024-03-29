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
    }

    toString() {
        const date = moment(this.accessedWhen);
        const formattedDate = date.format("DD MMMM YYYY");

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

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }

        const referenceList = `${this.pubName}. ${strYear}. <em>${this.articleTitle}</em>. [Online]. Available at: ${this.link} [Accessed ${formattedDate}]`;
        const figureList = `Figure 1: ${formattedAuthors} ${strYear}. <em>${this.title}</em>.`;

        return `<u>In The Reference List:</u><br><br>${referenceList}<br><br><u>In The List of Figures:</u><br><br>${figureList}`;
    }

    getParaphrased() {
        let formattedAuthors = "";
        if (Utilities.isNullOrEmpty(this.authors[0])) {
            formattedAuthors = "Anon";
        } else {
            const surnames = new Array(this.authors.length);
            for (let i = 0; i < surnames.length; i++) {
                surnames[i] = Utilities.getSurname(this.authors[i]);
            }

            formattedAuthors = Utilities.listNames(surnames, "and");
        }

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a.";
        } else {
            strYear = this.year.toString();
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n.";
        }

        return `In ${formattedAuthors}'s (${strYear}) image, <em>${this.title}</em>, it is evident that...`;
    }

    getQuote() {
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

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n.";
        }

        return `Figure 1: ${formattedAuthors} ${strYear}, <em>${this.articleTitle}</em>. (${this.pubName}, ${strYear})`;
    }
}
