/**
 * @param: String of text
 * @return Object with the detected language from the text
 * 
 * @note Usage limits to 500 request a month and 5r/s 
 */

const getLanguage = async (text) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
            'X-RapidAPI-Key': 'd4db23b5e3msh43209409a0520f9p148ebdjsnc2636ceb0fbf'
        },
        body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options)
        .then(response => response.text())
        .then((response) => {
            var data = JSON.parse(response);
            var lang = data.data.detections[0][0].language;
            return lang;
        })
        .catch(err => console.error(err));
}