/**
 * @param: text to be translated, language acronym of such text (See google for details), langague acronym for translation
 * @return: translated text to the lanague of parameter
 * 
 * @Note There is a 500 request limit between this API and the lanague detector, and a 5r/s cap
 */

const getTranslation = async (text,Oacro,Tacro) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    encodedParams.append("target", Tacro);
    encodedParams.append("source", Oacro);

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

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}