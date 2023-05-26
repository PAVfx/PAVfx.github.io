// lets create the Play, Next, Prev variables
const play = document.querySelector(".play"), // check play class
next = document.querySelector(".next"), // check next class
prev = document.querySelector(".prev"), // check prev  class

// lets create variables that will target album image, song title, and artist name
trackImage = document.querySelector(".track-image"), // track album image
title = document.querySelector(".title"), // song title
artist = document.querySelector(".artist"), // artist name

// time duration: time input slider range, current song time (LHS), and track duration (RHS)
timeSlider = document.querySelector(".duration-slider"), // time duration slider
trackCurrentTime = document.querySelector(".current-time"), // current song time 
trackDuration = document.querySelector(".track-duration"), // track duration

// Target 'volume' class variables. Use '.' operator for classes and '#' operator for id's
// Note: 'volume' class ('show-volume') made use of 'id' tags, so lets use # for all of these
showVolume = document.querySelector("#show-volume"), // show-volume is the one that displays volume level
volumeIcon = document.querySelector("#volume-icon"), // volume-icon class is the one that renders speaker icon
currentVolume = document.querySelector("#volume"), // volume range input slider that shows what the current volume is
volumeSlider = document.querySelector("#volume-slider"), // volume range input slider that shows what the current volume is

// Auto-play class button
autoPlayBtn = document.querySelector(".play-all"), // volume range input slider that shows what the current volume is

// Bar icon make playlist slide in:
playlistBars = document.querySelector(".fa-bars"), // playlist dropdown bars icon
playlistClose = document.querySelector(".fa-times"), // close icon

// Music Playlist class
musicPlaylist = document.querySelector(".music-playlist"),
playlistQue = document.querySelector(".playlist-que"),
playlist = document.querySelector(".playlist"); // end of all constant variables

// Helper variables
let timer;
let autoplay = 0; // not camelcase, since we already have a variable named like that (for the Play All button)
let indexTrack = 0; // current track thats supposed to be played
let songIsPlaying = false; // check if song is playing
let song = document.createElement("audio"); // create audio element
let soundMuted = false; // so we can unmute (muted or not state)
let soundMutedClick = 0; // so we can unmute (count clicks)
let prevVolume;

// Event Listeners: For which button is clicked: play, next, prev, Play All
play.addEventListener("click", justPlay); // listen for a click event on the play button, if clicked, then call 'justPlay' function: which chooses to 'playSong' or 'pauseSong'
next.addEventListener("click", nextSong); // listen for a click event on the next button, if clicked, then call 'playSong' function
prev.addEventListener("click", prevSong); // listen for a click event on the prev button, if clicked, then call 'prevSong' function
autoPlayBtn.addEventListener("click", autoPlayToggle); // listen for a click event on the Play All button, if clicked, then call 'autoPlayToggle' function (loop playlist)
volumeIcon.addEventListener("click", muteSound); // listen for a click event on the Volume Speaker Icon button, if clicked, then call 'muteSound' function
volumeSlider.addEventListener("change", changeVolume); // listen for a change event (range slider) on the Volume bar slider, if changed, then call 'changeVolume' function
timeSlider.addEventListener("change", changeDuration); // listen for a change event (range slider) on the Volume bar slider, if changed, then call 'changeVolume' function
song.addEventListener("timeupdate", updateSongTime);
playlistBars.addEventListener("click", showPlaylist); // show and hide playlist via
playlistClose.addEventListener("click", hidePlaylist); // bars icon and 'X' icon click

// Load Track Function
function loadTrack(indexTrack) { // load first song in array
    clearInterval(timer);
    song.src = trackList[indexTrack].path; // get 'path' property, aka folder where song is kept, of the tracklist object (array from the music.js script)
    trackImage.src = trackList[indexTrack].img; // get 'img' property of the tracklist object (array from the music.js script)
    title.innerHTML = trackList[indexTrack].name; // get 'name' property of the tracklist object (array from the music.js script)
    artist.innerHTML = trackList[indexTrack].singer; // get 'singer' property of the tracklist object (array from the music.js script)
    song.load(); // load the actual mp3 song

    timer = setInterval(updateTimeSlider, 1000); // update every second, aka 1000 msec, so slider gets updated as song plays
    resetTimeSlider(); // if you skip to next song, we want to clear the time slider

    
    // Update the initial time display to '00:00', to help avoid NaN:NaN, these will then be updated by our updateSongTime() method
    trackCurrentTime.innerHTML = '00:00';
    trackDuration.innerHTML = '00:00';
}

// when the page loads up, we also want to load an .mp3 up, so its ready to play, so lets call it right away
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
    volumeSlider.value = song.volume * 100; // set volume slider to current song volume
    showVolume.innerHTML = volumeSlider.value; // showcase that on the showVolume value
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


// Volume Functionality: Mute and Current Update Volume Slider
function muteSound() {
    if (soundMutedClick == 0) {
        volumeIcon.classList.remove('fa-volume-up'); // remove volume up icon incase its active
        volumeIcon.classList.add('fa-volume-off'); // set mute speaker
        prevVolume = song.volume; // store what volume level was (number from 0-1 representing 0-100% volume)
        song.volume = 0; // set volume level to 0
        showVolume.innerHTML = 0; // set number to show '0' level volume
        volumeSlider.value = 0; // set slider to 0
        soundMuted = true;
        soundMutedClick++;
    }
    else if (soundMutedClick == 1) { // meaning mute button was clicked again: aka UNMUTE
        volumeIcon.classList.remove('fa-volume-off'); // remove mute speaker
        volumeIcon.classList.add('fa-volume-up'); // set volume up speaker
        song.volume = prevVolume; // number from 0 to 1
        showVolume.innerHTML = Math.round(prevVolume * 100); // set number to show '0' level volume
        volumeSlider.value = song.volume * 100; // set slider to 0 to 100
        soundMutedClick = 0;
        soundMuted = false;
    }
}


function changeVolume() {
    showVolume.innerHTML = volumeSlider.value; // set number to show '#' level volume, where '#' is whatever slider is on
    song.volume = volumeSlider.value / 100; // set the actual volume: divide by 100 becasue we no longer want a % value, but instead a value form 0 -> 1
}

// Time Duration Change / Update Functionality
function changeDuration() {
    let sliderPosition = song.duration * (timeSlider.value/100); // .duration is a method availble to be called on audio files, lets multiply that by whatever we click to on our slider
    song.currentTime = sliderPosition; // update the current time
}

// Auto Play Function
function autoPlayToggle() {
    if (autoplay == 0) {
        autoplay = 1; // set to 1
        autoPlayBtn.style.background = "#6B7280"; // dark grey = #6B7280, dark orange = #9c5f0f
    }
    else {
        autoplay = 0; // set back to 0
        autoPlayBtn.style.background = "#dcd9d9"; // change it back to --light
    }
}

// Reset time slider
function resetTimeSlider() {
    timeSlider.value = 0;
}

// Update time slider
function updateTimeSlider() { // this function will be called every second via setInterval calling this method every 1000 msecs
    let position = 0; // create a position variable for time slider
    if (!isNaN(trackDuration.duration)) { // lets use isNaN (Not a Number), to check if trackDuration.duration is a number
        position = (song.currentTime / trackDuration.duration) * (100); // we want a % value, so lets multiply it by 100, and then divide by the .duration of the song in seconds
        timeSlider.value = position; // update the time slider (timeSlider = duration-slider = input range slider) every second to position
    }

    if (song.ended) { // if the end of the song has been reached
        play.innerHTML = '<i class="fa fa fa-play"></i>'; // lets changed the play buttons fa icon from showing pause (if song still running) to pause (when song ended)
        // if autoplay button (loop songs) is on, then loop through them
        if (autoplay == 1 && indexTrack < trackList.length-1) { // if autoplay button is on, then we want to loop they playlist (iterate, after last song finished, loop back to first song)
            indexTrack++;
            loadTrack(indexTrack);
            playSong();
        }
        else if (autoplay == 1 && indexTrack == trackList.length-1) {
            indexTrack = 0; // set index back to first song
            loadTrack(indexTrack);
            playSong();
        }
    }
}

// Append a '0' infront of single digit values: we will use this method on our seconds and minute variables
function appendLeadingZero(number) {
    return String(number).padStart(2, '0'); 
  }

// update current song time
function updateSongTime() {

    // Check if song.duration is a valid number, we load 00:00 in our loadTrack() method
    if (isNaN(song.duration) || !isFinite(song.duration)) {
        // Set default time as "00:00"
        trackCurrentTime.innerHTML = "00:00";
        trackDuration.innerHTML = "00:00";
        return; // Exit the function to prevent further execution
    }

    // lets make parse variables for mins, secs

    // Current song min and secs (Time shown on LHS)
    let curMins = Math.floor(song.currentTime / 60); // total seconds / 60 sec = current minutes
    let curSecs = Math.floor(song.currentTime % 60); // seconds = remainder after minute multiples which was gotten above
    
    // Duration of song (Time shown on RHS)
    let durMins = Math.floor(song.duration / 60); // total seconds / 60 sec = current minutes
    let durSecs = Math.floor(song.duration % 60); // seconds = remainder after minute multiples which was gotten above

    // variable above but with any neccesary appending
    let formattedCurMins = appendLeadingZero(curMins);
    let formattedCurSecs = appendLeadingZero(curSecs);
    let formattedDurMins = appendLeadingZero(durMins);
    let formattedDurSecs = appendLeadingZero(durSecs);

    trackCurrentTime.innerHTML = formattedCurMins + ":" + formattedCurSecs;
    trackDuration.innerHTML = formattedDurMins + ":" + formattedDurSecs;
}


// Show Playlist: reference .css script element: .music-playlist adjust translateX value to show or hide playlist
function showPlaylist() {
    musicPlaylist.style.transform = "translateX(0)";
}

// Hide Playlist:
function hidePlaylist() {
    musicPlaylist.style.transform = "translateX(-200%)";
}

// Display Tracks: now lets display trackList[] array titles into playlist
let counter = 1; // song 1, then 2, 3, 4, etc
function displayTracks() {
    for (let i = 0; i < trackList.length; i++) {
        console.log(trackList[i].name);
        let div = document.createElement("div"); // creating a div element
        div.classList.add("playlist"); // lets create the playlist div in .js instead of .html
        div.innerHTML = `
        <span class="song-index">${counter++})</span>
        <p class="single-track">${trackList[i].name}</p>
        `;
        playlistQue.appendChild(div); // append the div we just created above, aka actual song index and title, to our playlistQue element (aka the playlist)
    }
}

displayTracks();