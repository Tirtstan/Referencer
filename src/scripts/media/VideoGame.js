import Utilities from "../helpers/Utilities";

export default class VideoGame {
    constructor(author, year, gameTitle, platform, pubPlace, pubName) {
        this.author = author;
        this.year = year;
        this.gameTitle = gameTitle;
        this.platform = platform;
        this.pubPlace = pubPlace;
        this.pubName = pubName;
    }

    toString() {
        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = Utilities.isNullOrEmpty(this.author) ? "Anon" : this.author;
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }

        this.author = Utilities.formatFullName(this.author);

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a";
        } else {
            strYear = this.year.toString();
        }

        return `${this.author}. ${strYear}. <em>${this.gameTitle}</em> [Online Digital Game], ${this.platform}. ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        const surname = Utilities.getSurname(this.author);

        let strYear = "";
        if (this.year <= 0) {
            strYear = "s.a";
        } else {
            strYear = this.year.toString();
        }

        return `... (${surname}, ${strYear})`;
    }

    getQuote() {
        return "N/A";
    }
}
