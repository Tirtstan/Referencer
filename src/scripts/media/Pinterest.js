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

        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        let formattedAuthor = Utilities.formatFullName(this.author);

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a";
        } else {
            strYear = this.year.toString();
        }

        return `${formattedAuthor}. ${strYear}. <em>${this.picTitle}</em>. [Online]. Available at: ${currentLink} [Accessed ${formattedDate}]`;
    }

    getParaphrased() {
        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        let formattedAuthor = Utilities.formatFullName(this.author);

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a";
        } else {
            strYear = this.year.toString();
        }

        return `In Figure 1, ${formattedAuthor}'s (${strYear}) image demonstrates...`;
    }

    getQuote() {
        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        let formattedAuthor = Utilities.formatFullName(this.author);

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a";
        } else {
            strYear = this.year.toString();
        }

        return `Figure 1: ${formattedAuthor}. ${strYear}. <em>${this.picTitle}</em> (${this.author}, ${strYear})`;
    }
}
