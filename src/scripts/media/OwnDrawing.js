import Utilities from "../helpers/Utilities";

export default class OwnDrawing {
    constructor(author, year, description, place) {
        this.author = author;
        this.year = year;
        this.description = description;
        this.place = place;

        if (Utilities.isNullOrEmpty(this.author)) {
            this.author = "Anon";
        }

        if (this.year <= 0) {
            this.year = "s.a";
        }
    }

    toString() {
        return `${Utilities.formatFullName(this.author)}. ${this.year}. ${this.description}. [Personal drawing]. ${
            this.place
        }: Unpublished.`;
    }

    getParaphrased() {
        return `... (${Utilities.getSurname(this.author)}, ${this.year})`;
    }

    getQuote() {
        return `Figure 1: a drawing illustrating... (${Utilities.getSurname(this.author)}, ${this.year})`;
    }
}
