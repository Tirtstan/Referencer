import Utilities from "../helpers/Utilities";

export default class OwnDrawing {
    constructor(author, year, description, place) {
        this.author = author;
        this.year = year;
        this.description = description;
        this.place = place;

        if (this.year <= 0) {
            this.year = "s.a";
        }

        if (Utilities.isNullOrEmpty(this.place)) {
            this.place = "s.l";
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
