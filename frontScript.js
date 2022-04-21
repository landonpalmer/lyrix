
// functions for the drop down menu
function dropFunction(){
    document.getElementById("dropdown").classList.toggle("show")
}

// filter function
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("dropSearch");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
}

function translate(content){
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", content);
    encodedParams.append("target", "es");
    encodedParams.append("source", "en");

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