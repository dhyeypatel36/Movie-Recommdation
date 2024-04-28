const apiKey = 'b2e0e279254be11b9e964599d850a21c';
const baseUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

function addGenre(genere){
    const g = document.getElementById('genres');
    
    for(const gener of genere){
        let option = document.createElement('option');
        option.value = gener.id;
        option.text = gener.name;
        g.appendChild(option);
    }
}

function getGenere(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET' , baseUrl , true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            const jsonReposnse = JSON.parse(xhr.responseText);
            addGenre(jsonReposnse.genres);
        }
    }
    xhr.send();
}

getGenere();

let genereMovieArray = [];

function genereMovieRequest(selectedGenre){
    removeImgText();
    let genereMovieApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`;
    // console.log(genereMovieApi);
    const xhr = new XMLHttpRequest;
    xhr.open('GET' , genereMovieApi , true);

    xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
            const jsonReposnse = JSON.parse(xhr.responseText);
            // console.log(jsonReposnse);
            genereMovieArray = [];
            genereMovieArray = jsonReposnse.results;
            genereMovieAdd(jsonReposnse.results);
        }
    }

    xhr.send();
}

let index = 0;

function genereMovieAdd(){
    removeImgText();

    const moviePoster = document.querySelector('#moviePoster');
    moviePoster.setAttribute('src' , `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${genereMovieArray[index].poster_path}`);

    document.getElementById('movieText').innerText = genereMovieArray[index].title;
    document.getElementById('overView').innerText = genereMovieArray[index].overview;
}

//////////////////REMOVE IMAGE AND TEXT////////////////
function removeImgText(){
    document.querySelector('#moviePoster').innerText = '';
    document.querySelector('#movieText').innerText = '';
    document.querySelector('#overView').innerText = '';
}

/////////////////SEARCH BUTTON/////////////////////

document.querySelector('#playBtn').addEventListener('click' , () => {
    removeImgText();
    index = 0;
    document.querySelector('#likeOrDislikeBtns').removeAttribute('hidden');
    const save = document.querySelector('#genres').value;
    const getGenere = document.querySelectorAll('option');
    findValue(save);

    function findValue(val){
        getGenere.forEach((ans) => {
            if(ans.value == val){
                selectedGenre = ans.textContent;
                genereMovieRequest(ans.value);
            }
        })
    }
});


const nextBtn = document.querySelector('#likeBtn');

nextBtn.addEventListener('click' , ()=>{
    if(index == genereMovieArray.length-1){
        index = -1;
    }
    index++;
    genereMovieAdd();
})