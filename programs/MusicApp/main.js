// lets create the Play, Next, Prev variables
const play = document.querySelector(".play"), // check play class
next = document.querySelector(".next"), // check next class
prev = document.querySelector(".prev"), // check prev  class

// lets create variables that will target album image, song title, and artist name
trackImage = document.querySelector(".track-image"), // track album image
title = document.querySelector(".title"), // song title
artist = document.querySelector(".artist"), // artist name

// time duration: time input slider range, current song time (LHS), and track duration (RHS)
trackCurrentTime = document.querySelector(".duration-slider"), // time duration slider
timeSlider = document.querySelector(".current-time"), // current song time 
trackDuration = document.querySelector(".track-duration"), // track duration

// Target 'volume' class variables. 
// Note: 'volume' class ('show-volume') made use of 'id' tags, so lets use # for all of these
showVolume = document.querySelector("#show-volume"), // show-volume is the one that displays volume level
volumeIcon = document.querySelector("#volume-icon"), // volume-icon class si the one that renders speaker icon
currentVolume = document.querySelector("#volume"), // volume range input slider that shows what the current volume is

// Auto-play class button
autoPlay = document.querySelector(".play-all"), // volume range input slider that shows what the current volume is

// Bar icon make playlist slide in:
playlistBars = document.querySelector(".fa-bars"), // playlist dropdown bars icon
playlistClose = document.querySelector(".fa-times"), // close icon

// Music Playlist class
musicPlaylist = document.querySelector(".music-playlist"),
playlist = document.querySelector(".playlist"); // end of all constant variables

// Helper variables
let timer;
let autoplay = 0; // not camelcase, since we already have a variable named like that (for the Play All button)
let indexTrack = 0; // current track thats supposed to be played
let songIsPlaying = false; // check if song is playing
let song = document.createElement("audio"); // create audio element

// when the page loads up, we also want to load an .mp3 up, so its ready to play
play.addEventListener("click", justPlay); // listen for a click event on the play button, if clicked, then call 'justPlay' function: which chooses to 'playSong' or 'pauseSong'
next.addEventListener("click", nextSong); // listen for a click event on the next button, if clicked, then call 'playSong' function
prev.addEventListener("click", prevSong); // listen for a click event on the prev button, if clicked, then call 'prevSong' function

// Load Track Function
function loadTrack(indexTrack) { // load first song in array
    song.src = trackList[indexTrack].path; // get 'path' property, aka folder where song is kept, of the tracklist object (array from the music.js script)
    trackImage.src = trackList[indexTrack].img; // get 'img' property of the tracklist object (array from the music.js script)
    title.innerHTML = trackList[indexTrack].name; // get 'name' property of the tracklist object (array from the music.js script)
    artist.innerHTML = trackList[indexTrack].singer; // get 'singer' property of the tracklist object (array from the music.js script)
    song.load(); // load the actual mp3 song
}
loadTrack(indexTrack);

// Play Song or Pause Song Function
function justPlay() {
    if (songIsPlaying == false){ // use our helper variable to see if we should play or pause
        playSong();
    }
    else {
        pauseSong();
    }
}

// Play Song Function
function playSong() {
    song.play(); // play song
    songIsPlaying = true; // update our helper variable that lets us know if song is playing
    play.innerHTML = '<i class="fa fa fa-pause"></i>'; // lets changed the play buttons fa icon from play to pause
}

// Pause Song Function
function pauseSong() {
    song.pause(); // pause song
    songIsPlaying = false; // update our helper variable that lets us know if song is playing, its not for pause
    play.innerHTML = '<i class="fa fa fa-play"></i>'; // lets changed the play buttons fa icon from play to pause
}

// Next Song Function
function nextSong() {
    if (indexTrack < trackList.length-1) { // 4 tracks stored in trackList[]: index 0, 1, 2, and 3
        indexTrack++; // increment index up by 1, for next song 
        loadTrack(indexTrack); // load new index track
        playSong();
    }
    else { // if index track list is more than an index, then we have to reset the increment count
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong();
    }
}

// Prev Song Function
function prevSong() {
    if (indexTrack > 0) { // 4 tracks stored in trackList[]: index 0, 1, 2, and 3, if we are on index 1, 2, or 3, we want the ability to be able to go back to prevSong
        indexTrack--; // increment index down by 1, for prev song 
        loadTrack(indexTrack); // load new index track
        playSong();
    }
    else { // if index track list is less than index 0, then we have to reset the increment count to the max index value, so we stay within trackList[] indexes
        indexTrack = trackList.length-1;
        loadTrack(indexTrack);
        playSong();
    }
}