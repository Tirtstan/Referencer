export default class YouTube {
    constructor(title, year, channel, link, accessedWhen) {
        this.title = title;
        this.year = year;
        this.channel = channel;
        this.link = link;
        this.accessedWhen = accessedWhen;
    }

    // https://stackoverflow.com/a/20438448/19860255
    convertDate(date_str) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let temp_date = date_str.split("-");
        return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
    }

    toString() {
        return `<em>${this.title}</em>. ${this.year}. YouTube video, added by ${
            this.channel
        }. [Online]. Available at: ${this.link} [Accessed ${this.convertDate(this.accessedWhen)}]`;
    }

    getParaphrased() {
        return `... (see ${this.title}, ${this.year})`;
    }

    getQuote() {
        return "N/A";
    }
}
