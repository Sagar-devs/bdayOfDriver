alert("Laptop matram baga vasthadi okay na. So try to open only in laptop")

// Select elements
const lightCandleBtn = document.getElementById('lightCandleBtn');
const cutCakeBtn = document.getElementById('cutCakeBtn');
const cakeLayers = document.querySelectorAll('.cake div');
const container = document.querySelector('.container');
const clocksDiv = document.querySelector('.clocks');
const videoContainer = document.getElementById('videoContainer');
const birthdayVideo = document.getElementById('birthdayVideo');
const surpriseOptions = document.getElementById('surpriseOptions');
const noMessage = document.getElementById('noMessage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const backgroundMusic = document.getElementById('backgroundMusic');

// New sound elements
const timeCompletedSound = document.getElementById('timeCompletedSound');
const knifeSound = document.getElementById('knifeSound');

let currentLayer = 0;
let candleLit = false;
let candleBurning = true; // Track if candle is burning
let videoPlaying = true; // Track if birthday video is playing

// Clock Elements
const daysEl = document.getElementById('days');
const hourEl = document.getElementById('hour');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const ampmEl = document.getElementById('ampm');

// Countdown target time: September 09, 2024 02:52:00
const targetDate = new Date('September 10, 2024 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const ampm = hours >= 12 ? 'PM' : 'AM';

        daysEl.textContent = days < 10 ? '0' + days : days;
        hourEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        ampmEl.textContent = ampm;

        setTimeout(updateCountdown, 1000);
    } else {
        // Play the time completed sound
        timeCompletedSound.play();

        // Time is up! Hide clocks and show the birthday content
        clocksDiv.style.display = 'none';
        container.style.display = 'block';
    }
}

lightCandleBtn.addEventListener('click', () => {
    candleLit = true;
    candleBurning = true;
    videoPlaying = true; // Video is now playing

    backgroundMusic.play();
    cutCakeBtn.disabled = true; // Keep cutCakeBtn disabled until video finishes

    videoContainer.style.display = 'block';
    birthdayVideo.play();

    // Video ends after 11 seconds and hides
    setTimeout(() => {
        videoContainer.style.display = 'none';
        birthdayVideo.pause();
        birthdayVideo.currentTime = 0;
        videoPlaying = false; // Video is finished
        cutCakeBtn.disabled = false; // Enable the button once the video is done
    }, 12000);

    // Candle will go off after 15 seconds
    setTimeout(() => {
        candleBurning = false; // Candle is now off
    }, 12000);
});

cutCakeBtn.addEventListener('click', () => {
    // Check if video is still playing
    if (videoPlaying) {
        alert('Candle ipoyantha varaku undu ra swamy yalla suger!!');
        return;
    }

    // Check if the candle is still burning
    if (candleBurning) {
        alert('Candle ipoyantha varaku undu ra swamy yalla suger!!');
        return;
    }

    // Play knife sound when the user clicks "Cut Cake"
    knifeSound.play();

    if (currentLayer < cakeLayers.length) {
        cakeLayers[currentLayer].style.animation = 'moveLeft 2s forwards';
        currentLayer++;
    } else {
        surpriseOptions.style.display = 'block';
    }
});

yesBtn.addEventListener('click', () => {
    alert("First party ee malli surprise adugu")
});

noBtn.addEventListener('click', () => {
    alert("surprise avasaram ledu anavadiki ika em pani ekada po ra rey")

});

updateCountdown();

(function() {
    // Prevent common shortcuts like F12, Ctrl+Shift+I, Ctrl+Shift+C, and Ctrl+U
    document.addEventListener('keydown', function(event) {
        if (
            event.key === 'F12' || // F12 key
            (event.ctrlKey && event.shiftKey && event.key === 'I') || // Ctrl+Shift+I
            (event.ctrlKey && event.shiftKey && event.key === 'C') || // Ctrl+Shift+C
            (event.ctrlKey && event.key === 'U') // Ctrl+U (View Source)
        ) {
            event.preventDefault();
            alert("Viewing the source or inspecting is not allowed!");
        }
    });

    // Disable right-click to prevent "View Page Source" and other options
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        alert("Right-click is disabled!");
    });

    // Detect if the console is opened
    function detectDevTools() {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                alert("Inspecting is not allowed!");
            }
        });
        console.log(element);
    }

    detectDevTools();
    setInterval(detectDevTools, 1000); // Continuously check for dev tools every second

    // Warn when user tries to leave the page (prevents some actions)
    window.onbeforeunload = function() {
        return "Are you sure you want to leave? Viewing source is not allowed.";
    };

    // Try to block Ctrl+U and Ctrl+Shift+I via the unload event as well
    document.addEventListener('keyup', function(event) {
        if (event.ctrlKey && event.key === 'u') {
            alert("Viewing the source is not allowed!");
            event.preventDefault();
            return false;
        }
    });

    // Continuously check for the console being opened (as a fallback)
    setInterval(function() {
        if (window.console && window.console.firebug) {
            alert("Console is open! Inspecting is not allowed.");
        }
    }, 1000);

})();