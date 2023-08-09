// Point d'entree principal de consultation de l'API
const mainUrl = "http://localhost:8000/api/v1/titles"


// Fonction qui recupere le meilleur film
function fetchBestMovie() {
    let bestTitle = document.getElementById('top-title');
    let bestImg = document.getElementByClassName('best-cover')[0].getElementByTagName('img')[0];
    let bestDescription = document.getElementByClassName('button')[1];

    fetch(mainUrl + "?sort_by = imdb_score")
        .then(res => {
            console.log(res);

            if(res.statusCode === 200) {
                res.json().then(data => {
                    bestTitle.innerHTML = data['results'][0]['title'];
                    bestImg.src = data['results'][0]['image_url'];
                    bestButton.setAttribute('onclick', `openModal("${data['results'][0]['id']}")`)
                    fetch(data["results"][0]["url"])
                        .then(response => response.json())
                        .then(data => {
                            bestDescription.innerHTML = data["description"];
                        })
                })            }
            else{
                console.log("Error");
                document.getElementById('error').innerHTML = "Vous avez une erreur sur la requete :("
            }
        })
}
