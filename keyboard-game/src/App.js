//Keyboard random colors generator
const allKeys = [...document.querySelectorAll(".key")];
const score = document.querySelector(".score");
const rainbowBtn = document.querySelector("button");
const Colors = {
  r: 0,
  g: 0,
  b: 0
};
let scoreHandler = 0;
let rainbowInterval;
let randomKeyIndex;
let timer = 2000;
let flag = false;
const doRainbowInterval = () => {
  rainbowInterval = setInterval(() => {
    Colors.r = Math.floor(Math.random() * 254);
    Colors.g = Math.floor(Math.random() * 254);
    Colors.b = Math.floor(Math.random() * 254);

    allKeys.forEach(key => {
      key.style.background = `rgb(${Colors.r},${Colors.g},${Colors.b})`;
    });
  }, 2000);
};

// Turning On/Off rainbow keyboard colors
const rainbowStop = () => {
  rainbowBtn.textContent = "ON";
  rainbowBtn.classList.remove("button--active");
  clearInterval(rainbowInterval);

  allKeys.forEach(key => {
    key.style.background = `rgb(${0},${0},${0})`;
  });
  flag = false;
};
rainbowBtn.addEventListener("click", () => {
  if (!flag) {
    rainbowBtn.textContent = "OFF";
    rainbowBtn.classList.add("button--active");
    doRainbowInterval();
    flag = true;
  } else {
    rainbowStop();
  }
});

// Random key picker
randomKeyIndex = Math.floor(Math.random() * allKeys.length);
const randKeyIndexInterval = setInterval(() => {
  console.log(timer);

  randomKeyIndex = Math.floor(Math.random() * allKeys.length);
  allKeys[randomKeyIndex].classList.add("key--active");
  setTimeout(() => {
    allKeys[randomKeyIndex].classList.remove("key--active");
  }, timer - 10);
}, timer);

const pickRandomKey = e => {
  console.log(`Kliknales: ${e.keyCode}`);
  const pressedCorrectKey = document.querySelector(
    `.key[data-key="${allKeys[randomKeyIndex].dataset.key}"]`
  );
  const pressedWrongKey = document.querySelector(
    `.key[data-key="${e.keyCode}"]`
  );

  if (allKeys[randomKeyIndex].dataset.key == e.keyCode) {
    scoreHandler++;
    pressedCorrectKey.classList.remove("key--active");

    score.textContent = `Your score: ${scoreHandler}`;
    console.log("xd");
    // timer = 1990;
    // randomKeyIndex = Math.floor(Math.random() * (keys.length + 1));
  } else {
    pressedWrongKey.classList.add("key--wrong");
    pressedCorrectKey.classList.add("key--correct");
    clearInterval(randKeyIndexInterval);
    rainbowStop();
  }
  // return;

  console.log(`Miales kliknac: ${allKeys[randomKeyIndex].dataset.key}`);
  console.log(
    "---------------------------------------------------------------------------------------"
  );
};
window.addEventListener("keydown", pickRandomKey);
