/*
  Here is a guide for the steps you could take:
*/
// (function () {
// 1. First select and store the elements you'll be working with
// 2. Create your `onSubmit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

'use strict';

const api = "http://api.soundcloud.com/tracks";
const clientId = "?client_id=8538a1744a7fdaa59981232897501e04";

var marqueeText = document.querySelector('marquee');
var resultsSection = document.querySelector(".results");

document.querySelector('.submitBtn').addEventListener("click", function() {
// event.preventDefault();
    let artist = document.querySelector('#artistSearch').value
    getMusic(artist);
});  

document.querySelector('.results').addEventListener("click", function(e) {
    var selectedId = e.target.id.replace("artwork-", "");
    document.querySelector("audio").src = document.querySelector("#track-" + selectedId).title + clientId;
    marqueeText.innerHTML = document.querySelector('#title-' + selectedId).innerHTML;
});

document.querySelector("#artistSearch").addEventListener("keyup", function(event) {
    
    event.preventDefault();
    // window.alert(event.keyCode);
    console.log(event.keyCode);
    if (event.keyCode == 13) {
        window.alert("YESSS");
        document.querySelector(".submitBtn").click();
    }
});


document.querySelector('.search').addEventListener("submit", function() {
event.preventDefault();
    
});  

function getMusic(artist) {

    resultsSection.innerHTML = "";
    let url = api + clientId + "&q=%22" + artist + "%22";

    fetch(url).then(function(response) {
    // handle HTTP response
        response.json().then(function(data) {  
            console.log("Here is the data:", data);
            var tracks = data.results;
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                createTrack(data, i);
            }
        });
    }, function(error) {
    // handle network error
    console.log('Fetch Error :-S', err); 
    });
}

function createTrack(tracks, i) {
    let newDiv;
    let artwork; 
    let title;
    let band;
    
    newDiv = document.createElement('div');
    newDiv.className = 'track';
    newDiv.id = 'track-' + i;
    newDiv.title = tracks[i].stream_url;
    resultsSection.appendChild(newDiv);

    artwork = document.createElement('img');
    if (tracks[i].artwork_url != null) {
        artwork.src = tracks[i].artwork_url;
    } else {
        artwork.src ="No_image_available.png";
    }
    artwork.id = 'artwork-' + i;
    artwork.className = 'artwork'
    newDiv.appendChild(artwork);

    title = document.createElement('p');
    title.innerHTML = tracks[i].title;
    title.id = 'title-' + i;
    newDiv.appendChild(title);

    band = document.createElement('p');
    band.innerHTML = tracks[i].user.username;
    band.id = 'band-' + i;
    band.className = 'band';
    newDiv.appendChild(band);
}