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
            'X-RapidAPI-Key': 'd616f8c901msh20e2bf991e7104dp11d7f8jsndbc55af464ae'
        },
        body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}