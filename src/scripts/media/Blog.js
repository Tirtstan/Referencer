import moment from "moment";
import Utilities from "../helpers/Utilities.js";

export default class Blog {
    constructor(author, title, pubName, datePublished, link, accessedWhen) {
        this.author = author;
        this.title = title;
        this.pubName = pubName;
        this.datePublished = datePublished;
        this.link = link;
        this.accessedWhen = accessedWhen;

        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
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
        const formattedName = Utilities.formatFullName(this.author);

        return `${formattedName}. ${this.year}. ${this.title}. <em>${this.pubName}</em>, ${this.datePublished}. [Blog] Available from: ${this.link} [Accessed ${this.accessedWhen}].`;
    }

    getParaphrased() {
        return `${Utilities.getSurname(this.author)} (${this.year}) argues that...`;
    }

    getQuote() {
        return `${Utilities.getSurname(this.author)} (${this.year}) asserts that "..."`;
    }
}
