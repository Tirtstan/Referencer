export default class Utilities {
    static formatFullName(name) {
        const names = name.split(" ");

        const firstName = names[0];
        let surnames = "";
        for (let i = 1; i < names.length; i++) {
            surnames += " " + names[i];
        }

        if (this.isNullOrEmpty(surnames)) {
            return firstName;
        }
        return `${surnames}, ${firstName.substring(0, 1)}`;
    }

    static getSurname(name) {
        const names = name.split(" ");

        const firstName = names[0];
        let surnames = "";
        for (let i = 1; i < names.length; i++) {
            surnames += i == 1 ? names[i] : " " + names[i];
        }

        if (this.isNullOrEmpty(surnames)) {
            return firstName;
        }
        return surnames;
    }

    static listNames(names, endingWith) {
        let output = "";
        for (let i = 0; i < names.length; i++) {
            if (i === 0) {
                output += `${names[i]}`;
            } else if (i === names.length - 1) {
                output += ` ${endingWith} ${names[i]}`;
            } else {
                output += `, ${names[i]}`;
            }
        }
        return output;
    }

    static listNamesWithPeriods(names, endingWith) {
        let output = "";
        for (let i = 0; i < names.length; i++) {
            if (i === 0) {
                output += `${names[i]}.`;
            } else if (i === names.length - 1) {
                output += ` ${endingWith} ${names[i]}.`;
            } else {
                output += `, ${names[i]}.`;
            }
        }
        return output;
    }

    static addOrdinal(num) {
        let number = num.toString();
        if (number.endsWith("11")) return number.concat("th");
        else if (number.endsWith("12")) return number.concat("th");
        else if (number.endsWith("13")) return number.concat("th");
        else if (number.endsWith("1")) return number.concat("st");
        else if (number.endsWith("2")) return number.concat("nd");
        else if (number.endsWith("3")) return number.concat("rd");
        return number.concat("th");
    }

    static isNullOrEmpty(string) {
        return string === null || string === "" || string === undefined;
    }

    static areNullOrEmpty(...strings) {
        for (let i = 0; i < strings.length; i++) {
            if (strings[i] === null || strings[i] === "" || strings[i] === undefined) {
                return true;
            }
        }
        return false;
    }
}
