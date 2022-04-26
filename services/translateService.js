/**
 * @param: text to be translated, language acronym of such text (See google for details), langague acronym for translation
 * @return: translated text to the lanague of parameter
 * 
 * @Note There is a 500 request limit between this API and the lanague detector, and a 5r/s cap
 */

const getTranslation = async (text,Tlang,Olang) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    encodedParams.append("target", Tlang);
    encodedParams.append("source", Olang);

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

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.text())
        .then((response) => {
            var data = JSON.parse(response);
            var translateText = data.data.translations[0].translatedText;
            console.log(translateText);
            return translateText;
        })
        .catch(err => console.error(err));
}