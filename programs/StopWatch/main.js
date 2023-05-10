// now since we have the layout design done (buttons, time font, spacing, etc) lets make the actual timer work, aka code the funtionality

// variables in JS (const, let, and var)

// since we cannot change the time, lets use const. Lets pass .watch and .time as the selectors, aka the 00:00:00 time

// fetch time
var timeDisplay = document.getElementById("timeDisplay"); // '.watch .timeDisplay'
timeDisplay.textContent = "00:00:00";

// fetch buttons
const start_btn = document.getElementById("start");
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");

// now lets get our 'let' variables, aka ones that we can change:
let startTime = 0; // This variable stores the timestamp (in milliseconds) when the timer is started or resumed. When the start button is clicked, the startTime is set to the current timestamp using Date.now()
let elapsedTime = 0;
let currentTime = 0;

let paused = true;
let interval = null; // This is our timer, what ticks up every second

let hours = 0;
let mins = 0;
let seconds = 0;

// Event Listeners: 
start_btn.addEventListener("click", () => { // start button functionality, if start button is clicked
    if(paused){
        paused = false; // set paused boolean variable to 'false', since time has started
        startTime = Date.now() - elapsedTime; // calculate start time using .now() method of Date, gives the current date and time (in msecs)
        interval = setInterval(timer, 1000); // start timer by invoking our function 'timer' (with callback timer() method, every 1000 msecs, aka evedry second)  
    }
}); // end of start button event

stop_btn.addEventListener("click", () => { // stop/pause button functionality, if stop button is clicked
    if (!paused) // so if time is currently not paused
    {
        paused = true; // lets set paused to true because stop button was clicked
        elapsedTime = Date.now() - startTime;
        clearInterval(interval); // clear timer using clearInterval (built in js function)
    }

}); // end of stop button event

reset_btn.addEventListener("click", () => { // reset button functionality
    paused = true; // lets set paused to true because stop button was already clicked, and we are now reseting
    clearInterval(interval); // so clear timer
    // and reset all our time variables:
    startTime = 0; 
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    mins = 0;
    seconds = 0;
     // and reset the stopwatch display:
    timeDisplay.innerText = '00:00:00';
}); // end of restart button event

// Update the timer
function timer() { // when the timer function is run
    elapsedTime = Date.now() - startTime; // elapsed time [msecs] = whatever time it is right now - the original start time
    // the floor method truncades the number 
    seconds = Math.floor((elapsedTime / 1000) % 60); // convert from 1000 msecs to secs, then counts from 0 to 59, then gives value of 0 when 60 % 60
    mins = Math.floor((elapsedTime / (1000*60)) % 60); // 60,000 msecs to minute
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60); // 60*60 = 3600, so 3,600,0000 msecs in an hour. Note: Hours = total seconds / 3600 seconds.

    // ensuring padding of unit digits
    seconds = pad(seconds);
    mins = pad(mins);
    hours = pad(hours);

    // Display
    timeDisplay.textContent = `${hours}:${mins}:${seconds}`; // lets update our timeDisplay variable via a template literal format of hours:mins:secs

    // lets add a padding function that adds a '0' infront of any single digit numbers 
    function pad(unit){
        return (unit.toString().length < 2 ? "0" + unit : unit); // add a 0 to the front of the unit (hours, mins, seconds) we pass in, check if length (after adding a 0) is greater than 2, if so return unit
        // ':' this means else, so if length is not greater than 2, then lets add the zero infront "0"
    } // end of padding function
}

