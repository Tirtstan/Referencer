export default class YouTubeHelper {
    // https://stackoverflow.com/a/9102270/19860255
    static getYouTubeId(link) {
        let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        let match = link.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return "";
        }
    }

    // https://irishdotnet.dev/how-to-validate-a-youtube-url-using-javascript
    static isYouTubeLink(linkToParse) {
        if (linkToParse) {
            let regExp =
                /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            if (linkToParse.match(regExp)) {
                return true;
            }
        }

        return false;
    }
}
