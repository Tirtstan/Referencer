import Utilities from "../helpers/Utilities";

export default class OwnDrawing {
    constructor(studentName, year, description) {
        this.studentName = studentName;
        this.year = year;
        this.description = description;

        if (this.year <= 0) {
            this.year = "s.a";
        }
    }

    toString() {
        return `${Utilities.formatFullName(this.studentName)}. ${this.year}. <em>${
            this.description
        }</em>. [Photograph] [Personal Collection]. Unpublished.`;
    }

    getParaphrased() {
        return `... (${Utilities.getSurname(this.studentName)}, ${this.year})`;
    }

    getQuote() {
        return `Figure 1: an image depicting... (${Utilities.getSurname(this.author)}, ${this.year})`;
    }
}
