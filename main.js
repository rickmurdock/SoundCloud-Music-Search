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

var clientId = "8538a1744a7fdaa59981232897501e04";


document.querySelector('.submitBtn').addEventListener("click", function() {
    console.log(document.querySelector('#artistSearch').value);

    var artist = document.querySelector('#artistSearch').value

    getMusic(artist);
});  

document.querySelector('.results').addEventListener("click", function(e) {
    console.log("results was clicked ");
    var selectdId;
    console.log("e.target = ", e.target);
    console.log("e.target.nodeName ", e.target.nodeName);
    if (e.target && (e.target.nodeName == 'IMG' || 'P' )) {
        console.log("TARGETED", e.target.id);
        selectedId = e.target.id.replace("artwork-", "");
        document.querySelector('.music-player').src = stream_url
    } else {

        console.log("failed to TARGET");
    }
});

function getMusic(artist) {
    var api = "http://api.soundcloud.com/tracks?client_id=";
    // var clientId = "8538a1744a7fdaa59981232897501e04";
    
    // var url = "http://api.soundcloud.com/tracks/13158665?client_id=8538a1744a7fdaa59981232897501e04";
    var url = "http://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=%22hazzard%22";
    
    var url1 = api + clientId + "&q=%22" + artist + "%22";
    console.log(url);
    console.log(url1);
    
    fetch(url1).then(function(response) {
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
    console.log(tracks[i].title);
    if (i == 0) {
        document.querySelector("audio").src = tracks[i].stream_url + "?client_id=" + clientId;
    }

    var resultsSection = document.querySelector(".results");
    var newDiv = document.createElement('div');
    newDiv.className = 'track';
    newDiv.id = 'track-' + i;
    resultsSection.appendChild(newDiv);

    var artwork = document.createElement('img');
    artwork.src = tracks[i].artwork_url;
    artwork.id = 'artwork-' + i;
    newDiv.appendChild(artwork);

    var title = document.createElement('p');
    title.innerHTML = tracks[i].title;
    title.id = 'title-' + i;
    newDiv.appendChild(title);

    var band = document.createElement('p');
    band.innerHTML = tracks[i].user.username;
    band.id = 'band-' + i;
    newDiv.appendChild(band);
}