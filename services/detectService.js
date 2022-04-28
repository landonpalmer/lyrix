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
            'X-RapidAPI-Key': '7d4f11b260msh56a75041baf0f7cp11fc2ejsn6e7731669e23'
        },
        body: encodedParams
    };

    let fetchDetecto = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options);
    var langJSON = await fetchDetecto.text();
    var data = JSON.parse(langJSON);
    var lang = data.data.detections[0][0].language;
    return lang;
}