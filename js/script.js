const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video');
const sounds = document.querySelectorAll('.sound__picker button');
const timeDisplay = document.querySelector('.time__display');
const outlineLength = outline.getTotalLength();
const timeSelect = document.querySelectorAll('.time__select button');
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

//Sound-picker function
sounds.forEach(sound => {
  sound.addEventListener('click', function() {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

//Check playing function
const checkPlaying = ((song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = './assets/svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './assets/svg/play.svg';
  };
});

//Play sound function
play.addEventListener('click', function() {
  checkPlaying(song);
});

//Replay function
const restartSong = (song) => {
  let currentTime = song.currentTime;
  song.currentTime = 0;
};

replay.addEventListener('click', function() {
  restartSong(song);
  console.log('restart');
});

//Time-select function
timeSelect.forEach(option => {
  option.addEventListener('click', function() {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${addZero(Math.floor(fakeDuration / 60))}:${addZero(Math.floor(fakeDuration % 60))}`;
  });
});

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  
  timeDisplay.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
  if (currentTime >= fakeDuration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = './assets/svg/play.svg';
  };
};
