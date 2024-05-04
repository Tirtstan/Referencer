import moment from "moment/moment";
import Utilities from "../helpers/Utilities";

export default class Sound {
    constructor(composer, year, title, link, accessedWhen) {
        this.composer = composer;
        this.year = year;
        this.title = title;
        this.link = link;
        this.accessedWhen = accessedWhen;

        if (Utilities.isNullOrEmpty(this.composer)) {
            this.composer = "Anon";
        }

        if (this.year <= 0) {
            this.year = "s.a";
        }
    }

    toString() {
        const date = moment(this.accessedWhen);
        const formattedDate = date.format("DD MMMM YYYY");

        return `${Utilities.formatFullName(this.composer)}. ${this.year}. <em>${
            this.title
        }</em>. [Sound recording]. Available at: <a href="${this.link}">${this.link}</a> (Accessed ${formattedDate})`;
    }

    getParaphrased() {
        return `In the sound recording by ${Utilities.getSurname(this.composer)} (${this.year}), the composer...`;
    }
}
