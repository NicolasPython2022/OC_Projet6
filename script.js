
function loadData() {
    fetch('http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=9.5&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
            })
            .then(data => {
                const movies = JSON.parse(data);
                const topMovieName = movies.results[0].title; 
                const topMovieImg = movies.results[0].image_url;
                const topDescMovieUrl = movies.results[0].url;
                fetch(topDescMovieUrl).then(res => {
                    if(!res.ok){
                        throw new Error('Network response was not ok');
                      }
                    return res.text();
                })
                .then(data =>{
                    const movie = JSON.parse(data);
                    console.log("notre movie unique :",movie);
                    const topDescMovie = movie.description;
                    console.log("topdescMovie : ",topDescMovie);
                    document.getElementById("top-desc").innerHTML = topDescMovie;
            
                })
                console.log("url for movie : ",topDescMovieUrl);
            
                console.log("movies ",movies)
                console.log("movies.results.title : ",movies.results[0].title)
                console.log("movies.results: ",movies.results[0])
                        
                document.getElementById("top-movie").innerHTML = topMovieName;
                document.getElementById("top-img").src = topMovieImg;
            
            
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
          }
  
  
  function loadBestMovies() {
    let linkTobeFetched = 'http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year='
    fetch(linkTobeFetched)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for fetching in the first fetch');
              }
              return response.text();
            })
            .then(data2 => {
                const movies = JSON.parse(data2);
                console.log("ultra data2",movies);
                //document.getElementById("top-img1").src = movies.results[0].image_url;
                for (let i = 0; i < 5; i++) {
                    const imgId = "top-img"+(i);
                    document.getElementById(imgId).src =movies.results[i].image_url;
                    console.log("imgId :",imgId);
                }
    
                fetch(movies.next)
                .then(res => {
                    if(!res.ok){
                        throw new Error('Network response was not ok in the second fetch');
                    }
                    return res.text();
                })
                .then(data3 => {
                  const nextMovies = JSON.parse(data3);
                  for (let i=0; i < 2; i++){
                        const imgId = "top-img"+(i+5);
                        document.getElementById(imgId).src =nextMovies.results[i].image_url;
    
                    }
                })
                               
              })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
          }
  
  loadData()
  loadBestMovies()