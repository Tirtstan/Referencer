import moment from "moment/moment";
import Utilities from "../helpers/Utilities";

export default class Pinterest {
    constructor(author, year, picTitle, link, originalLink, accessedWhen) {
        this.author = author;
        this.year = year;
        this.picTitle = picTitle;
        this.link = link;
        this.originalLink = originalLink;
        this.accessedWhen = accessedWhen;
    }

    toString() {
        const date = moment(this.accessedWhen);
        const formattedDate = date.format("DD MMMM YYYY");
        const currentLink = Utilities.isNullOrEmpty(this.originalLink) ? this.link : this.originalLink;

        return `${this.author}. ${this.year}. <em>${this.picTitle}</em>. [Online]. Available at: ${currentLink} [Accessed ${formattedDate}]`;
    }

    getParaphrased() {
        return `In Figure 1, ${this.author}'s (${this.year}) image demonstrates...`;
    }

    getQuote() {
        return `Figure 1: ${this.author}. ${this.year}. <em>${this.picTitle}</em> (${this.author}, ${this.year})`;
    }
}
