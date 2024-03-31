import moment from "moment/moment";
import Utilities from "../helpers/Utilities";

export default class Website {
    constructor(author, articleTitle, datePublished, link, accessedWhen) {
        this.author = author;
        this.articleTitle = articleTitle;
        this.datePublished = datePublished;
        this.link = link;
        this.accessedWhen = accessedWhen;
    }

    toString() {
        let formattedDatePublished = "";
        let strYear = "";
        if (Utilities.isNullOrEmpty(this.datePublished)) {
            formattedDatePublished = "n.d";
            strYear = "s.a";
        } else {
            const published = moment(this.datePublished);
            formattedDatePublished = published.format("DD MMMM YYYY");

            strYear = new Date(this.datePublished).getFullYear();
        }

        const accessed = moment(this.accessedWhen);
        const formattedAccessedWhen = accessed.format("DD MMMM YYYY");

        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        return `${this.author}. ${strYear}. ${this.articleTitle}, ${formattedDatePublished}. [Online]. Available at: ${this.link} [Accessed ${formattedAccessedWhen}]`;
    }

    getParaphrased() {
        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        const strYear = Utilities.isNullOrEmpty(this.datePublished)
            ? "s.a"
            : new Date(this.datePublished).getFullYear();

        return `... (${this.author}, ${strYear})`;
    }

    getQuote() {
        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        const strYear = Utilities.isNullOrEmpty(this.datePublished)
            ? "s.a"
            : new Date(this.datePublished).getFullYear();

        return `According to ${this.author} (${strYear}) ...`;
    }
}
