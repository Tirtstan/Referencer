import Utilities from "../helpers/Utilities";

export default class Film {
    constructor(title, year, director, medium, pubPlace, pubName) {
        this.title = title;
        this.year = year;
        this.director = director;
        this.medium = medium;
        this.pubPlace = pubPlace;
        this.pubName = pubName;

        if (this.year <= 0) {
            this.year = "s.a";
        }

        if (Utilities.isNullOrEmpty(this.director)) {
            this.director = "Anon";
        }

        if (Utilities.isNullOrEmpty(this.pubPlace)) {
            this.pubPlace = "s.l";
        }

        if (Utilities.isNullOrEmpty(this.pubName)) {
            this.pubName = "s.n";
        }
    }

    toString() {
        return `<u>${this.title}</u>. ${this.year}. Directed by ${this.director}. [${this.medium}]. ${this.pubPlace}: ${this.pubName}.`;
    }

    getParaphrased() {
        return `... (${this.title}, ${this.year})`;
    }

    getQuote() {
        return `"Quote from ${this.medium}" (${this.title}, ${this.year}).`;
    }
}
