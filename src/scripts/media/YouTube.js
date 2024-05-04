import moment from "moment/moment";

export default class YouTube {
    constructor(title, year, channel, link, accessedWhen) {
        this.title = title;
        this.year = year;
        this.channel = channel;
        this.link = link;
        this.accessedWhen = accessedWhen;
    }

    toString() {
        const date = moment(this.accessedWhen);
        const formattedDate = date.format("DD MMMM YYYY");
        return `<em>${this.title}</em>. ${this.year}. YouTube video, added by ${this.channel}. [Online]. Available at: <a href="${this.link}">${this.link}</a> [Accessed ${formattedDate}]`;
    }

    getParaphrased() {
        return `... (see ${this.title}, ${this.year})`;
    }
}
