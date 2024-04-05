import moment from "moment/moment";
import Utilities from "../helpers/Utilities";

export default class Website {
    constructor(author, articleTitle, datePublished, link, accessedWhen) {
        this.author = author;
        this.articleTitle = articleTitle;
        this.datePublished = datePublished;
        this.link = link;
        this.accessedWhen = accessedWhen;

        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        if (Utilities.isNullOrEmpty(this.datePublished)) {
            this.datePublished = "n.d";
            this.year = "s.a";
        } else {
            const published = moment(this.datePublished);

            this.datePublished = published.format("DD MMMM YYYY");
            this.year = new Date(this.datePublished).getFullYear();
        }
    }

    toString() {
        const accessed = moment(this.accessedWhen);
        const formattedAccessedWhen = accessed.format("DD MMMM YYYY");

        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        return `${this.author}. ${this.year}. ${this.articleTitle}, ${this.datePublished}. [Online]. Available at: ${this.link} [Accessed ${formattedAccessedWhen}]`;
    }

    getParaphrased() {
        return `... (${this.author}, ${this.year})`;
    }

    getQuote() {
        return `According to ${this.author} (${this.year}) ...`;
    }
}
