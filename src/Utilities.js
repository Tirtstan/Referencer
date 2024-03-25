export default class Utilities {
    static FormatFullName(name) {
        const names = name.split(" ");
        return `${names[1]}, ${names[0].substring(0, 1)}`;
    }

    static GetSurname(name) {
        return name.split(" ")[1];
    }

    static ListNames(names, endingWith) {
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

    static ListNamesWithPeriods(names, endingWith) {
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

    static AddOrdinal(num) {
        let number = num.toString();
        if (number.endsWith("11")) return number.concat("th");
        else if (number.endsWith("12")) return number.concat("th");
        else if (number.endsWith("13")) return number.concat("th");
        else if (number.endsWith("1")) return number.concat("st");
        else if (number.endsWith("2")) return number.concat("nd");
        else if (number.endsWith("3")) return number.concat("rd");
        return number.concat("th");
    }

    static AreNullOrEmpty(...strings) {
        let valid = false;
        for (let i = 0; i < strings.length; i++) {
            if (strings[i] === null || strings[i] === "") return true;
        }
        return false;
    }
}
