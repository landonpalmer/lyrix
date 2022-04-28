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
            'X-RapidAPI-Key': '7d4f11b260msh56a75041baf0f7cp11fc2ejsn6e7731669e23'
        },
        body: encodedParams
    };

    let translatedGuy = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options);
    var translatedJSON = await translatedGuy.text();
    var data = JSON.parse(translatedJSON);
    var translateText = data.data.translations[0].translatedText;
    console.log(translateText);

    return translateText;
        // .then(response => response.text())
        // .then((response) => {
        //     var data = JSON.parse(response);
            
        //     return translateText;
        // })
        // .catch(err => console.error(err));
}