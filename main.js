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
var resultsSection = document.querySelector(".results");

document.querySelector('.submitBtn').addEventListener("click", function() {
    console.log(document.querySelector('#artistSearch').value);

    let artist = document.querySelector('#artistSearch').value

    getMusic(artist);
});  

document.querySelector('.results').addEventListener("click", function(e) {
    console.log("results was clicked ");
     var selectedId;
    console.log("e", e);
    console.log("e.target = ", e.target);
    console.log("e.target.title = ", e.target.title);
    // console.log("e.target.nodeName ", e.target.nodeName);
    // if (e.target && (e.target.nodeName == 'IMG' || 'P' )) {
    //     console.log("TARGETED", e.target.id);
        selectedId = e.target.id.replace("artwork-", "");
    //     document.querySelector('.music-player').src = stream_url
    // } else {

    //     console.log("failed to TARGET");
    // }

    // document.querySelector(".music-player").src = e.target.title + clientId;

    document.querySelector("audio").src = document.querySelector("#track-" + selectedId).title + clientId;
});

function getMusic(artist) {

    resultsSection.innerHTML = "";
    
    // var url = "http://api.soundcloud.com/tracks/13158665?client_id=8538a1744a7fdaa59981232897501e04";
    // var url = "http://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=%22hazzard%22";
    
    let url = api + clientId + "&q=%22" + artist + "%22";
    // console.log(url);
    // console.log(url1);
    

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
    newDiv.appendChild(artwork);

    title = document.createElement('p');
    title.innerHTML = tracks[i].title;
    title.id = 'title-' + i;
    newDiv.appendChild(title);

    band = document.createElement('p');
    band.innerHTML = tracks[i].user.username;
    band.id = 'band-' + i;
    newDiv.appendChild(band);
}