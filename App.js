//Keyboard random colors generator
const allKeys = [...document.querySelectorAll(".key")];
const score = document.querySelector(".score");
const rainbowBtn = document.querySelector("button");
const lifes = [...document.querySelectorAll(".life")];
const Colors = {
  r: 0,
  g: 0,
  b: 0
};
let scoreHandler = 0;
let rainbowInterval;
let randomKeyIndex;
let timer = 2000;
let rainbowFlag = false;
let stopRandIndexFlag = true;
// lifes.forEach(life => lifesContainer.appendChild(life));
const doRainbowInterval = () => {
  if (rainbowFlag) {
    Colors.r = Math.floor(Math.random() * 254);
    Colors.g = Math.floor(Math.random() * 254);
    Colors.b = Math.floor(Math.random() * 254);

    allKeys.forEach(key => {
      key.style.background = `rgb(${Colors.r},${Colors.g},${Colors.b})`;
    });
    setTimeout(doRainbowInterval, 1000);
  }
};

// Turning On/Off rainbow keyboard colors
const rainbowStop = () => {
  rainbowBtn.textContent = "ON";
  rainbowBtn.classList.remove("button--active");
  allKeys.forEach(key => {
    key.style.background = `rgb(${0},${0},${0})`;
  });
  rainbowFlag = false;
};

rainbowBtn.addEventListener("click", () => {
  if (rainbowFlag) {
    rainbowStop();
    return;
  }
  rainbowBtn.textContent = "OFF";
  rainbowBtn.classList.add("button--active");
  rainbowFlag = true;
  doRainbowInterval();
});

// Random key picker

const checkTime = () => {
  console.log(allKeys[randomKeyIndex].classList.contains("key--active"));
  if (allKeys[randomKeyIndex].classList.contains("key--active")) {
    setTimeout(() => {
      // lifes[lifes.length - 1].classList.remove("life");
      // lifes.splice(lifes.length - 1);
    }, timer);
  }
};
const randKeyIndexFnc = () => {
  if (stopRandIndexFlag) {
    if (scoreHandler % 5 == 0 && scoreHandler != 0) {
      timer -= 50;
      if (timer === 250) {
        timer = 250;
      }
    }
    console.log(`Czas: ${timer}`);

    randomKeyIndex = Math.floor(Math.random() * allKeys.length);
    console.log(randomKeyIndex);
    allKeys[randomKeyIndex].classList.add("key--active");
    setTimeout(() => {
      allKeys[randomKeyIndex].classList.remove("key--active");
    }, timer - 50);
    setTimeout(randKeyIndexFnc, timer);
    checkTime();
    if (lifes.length == 0) {
      console.log("LOSE");
      return;
    }
  }
};

randKeyIndexFnc();

const pickRandomKey = e => {
  console.log(`Kliknales: ${e.keyCode}`);
  const drawnKey = allKeys[randomKeyIndex].dataset.key;
  const pressedCorrectKey = document.querySelector(
    `.key[data-key="${drawnKey}"]`
  );
  const pressedWrongKey = document.querySelector(
    `.key[data-key="${e.keyCode}"]`
  );
  if (drawnKey == e.keyCode) {
    if (!pressedCorrectKey.classList.contains("key--correct")) {
      scoreHandler++;
      score.textContent = `Your score: ${scoreHandler}`;
      pressedCorrectKey.classList.remove("key--active");
    }
  } else {
    lifes[lifes.length - 1].classList.remove("life");
    pressedCorrectKey.classList.add("key--correct");
    stopRandIndexFlag = false;
    const containsClassKeyWrong = allKeys.filter(key =>
      key.classList.contains("key--wrong")
    );
    if (containsClassKeyWrong.length === 0) {
      pressedWrongKey.classList.add("key--wrong");
    }
    // rainbowBtn.disabled = true;
    // rainbowStop();
  }

  console.log(`Miales kliknac: ${allKeys[randomKeyIndex].dataset.key}`);
  console.log(
    "---------------------------------------------------------------------------------------"
  );
};
window.addEventListener("keydown", pickRandomKey);
