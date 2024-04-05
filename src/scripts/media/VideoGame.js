import Utilities from "../helpers/Utilities";

export default class VideoGame {
    constructor(author, year, gameTitle, platform, pubPlace, pubName) {
        this.author = author;
        this.year = year;
        this.gameTitle = gameTitle;
        this.platform = platform;
        this.pubPlace = pubPlace;
        this.pubName = pubName;

        if (Utilities.isNullOrEmpty(this.author)) {
            if (Utilities.isNullOrEmpty(this.pubName)) {
                this.author = "Anon";
            } else {
                this.author = this.pubName;
            }
        }

        if (this.year <= 0) {
            this.year = "s.a";
        }

        if (Utilities.isNullOrEmpty(this.pubPlace)) {
            this.pubPlace = "s.l";
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }
    }

    toString() {
        const formattedName = this.author === this.pubName ? this.author : Utilities.formatFullName(this.author);

        return `${formattedName}. ${this.year}. <em>${this.gameTitle}</em> [Online Digital Game], ${this.platform}. ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        const formattedName = this.author === this.pubName ? this.author : Utilities.getSurname(this.author);

        return `... (${formattedName}, ${this.year})`;
    }

    getQuote() {
        return "N/A";
    }
}
