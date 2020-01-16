//Keyboard random colors generator
const allKeys = [...document.querySelectorAll(".key")];
const score = document.querySelector(".score");
const rainbowBtn = document.querySelector(".rainbow__switch");
const lifes = [...document.querySelectorAll(".life")];
const playBtn = document.querySelector(".play");
const rankBtn = document.querySelector(".rank");
const menuContainerDiv = document.querySelector(".menu__container");
const containerDiv = document.querySelector(".container");
const startTimerDiv = document.querySelector(".start__timer");
const menuScore = document.querySelector(".menu__score");
const menuText = document.querySelector(".menu__text");


const Colors = {
  r: 0,
  g: 0,
  b: 0
};
let scoreHandler = 0;
let rainbowInterval;
let startTimerInterval;
let randomKeyIndex;
let timer = 2000;
let startTimer = 3;
let rainbowFlag = false;
let stopRandIndexFlag = false;
let lives = [1,1,1];


const timerIntervalFnc = () => {
  startTimerInterval = setInterval(() => {
    startTimerDiv.style.opacity = 1;
    if (startTimer === 0) {
      clearInterval(startTimerInterval);
      startTimerDiv.style.opacity = 0;
      setTimeout(() => {
        stopRandIndexFlag = true;
        randKeyIndexFnc();
      }, 500);
    }
  startTimerDiv.textContent = startTimer--;
  }, 1000);
}
const startGame = () => {
  console.log("xd");
  menuContainerDiv.style.transform = "translate(-50%,-200%)";
  containerDiv.style.filter = "blur(0)";
  startTimer = 3;
  timer = 2000;
  lifes.forEach(life=>life.classList.remove("life--dead"))
  lives = [1,1,1];
  timerIntervalFnc()
};

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



// Random key picker

const checkTime = () => {
  if (allKeys[randomKeyIndex].classList.contains("key--active")) {
    setTimeout(() => {
      if (allKeys[randomKeyIndex].classList.contains("key--active")) {
        renderLives()
      }
    }, timer - 60);
  }
};
const checkLifes = () => {
  if (!lives.includes(1)) {
    menuContainerDiv.style.transform = "translate(-50%,-50%)";
    containerDiv.style.filter = "blur(3px)";
    menuScore.style.visibility = "visible"
    menuText.style.visibility = "visible";
    menuScore.textContent= `Score: ${scoreHandler}`
    playBtn.textContent = "PLAY AGAIN";
    rankBtn.style.display = "none";
    // menuContainerDiv.innerHTML = `

    // <div>Score: ${scoreHandler}</div>
    // `;
    stopRandIndexFlag = false;
    

  }
};

const renderLives = () => {
  lives = lives.map((e,i,a)=>{
    if(a[i+1]){
        return a[i+1]==0?0:1
    }else{
        return 0
    }
  })
  for(let i =0;i<lives.length;i++){
    if(lives[i]==0){
      lifes[i].classList.add('life--dead')
    }
  }
}
const randKeyIndexFnc = () => {
  checkLifes();
  if (stopRandIndexFlag) {
    if (scoreHandler % 5 == 0 && scoreHandler != 0) {
      timer -= 100;
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
    checkTime();

    setTimeout(randKeyIndexFnc, timer);
  }
};

const pickRandomKey = e => {
  e.preventDefault();
  console.log(`Kliknales: ${e.keyCode}`);

  const drawnKey = allKeys[randomKeyIndex].dataset.key;

  const pressedCorrectKey = document.querySelector(
    `.key[data-key="${drawnKey}"]`
  );

  const pressedWrongKey = document.querySelector(
    `.key[data-key="${e.keyCode}"]`
  );

  // Adding point to score

  if (drawnKey == e.keyCode) {
    if (!pressedCorrectKey.classList.contains("key--correct")) {
      scoreHandler++;
      score.textContent = `Your score: ${scoreHandler}`;
      pressedCorrectKey.classList.remove("key--active");
    }
  } else {
  
    // Checking number of lifes
    
    checkLifes();

    //Taking one life 

    renderLives()

    // pressedCorrectKey.classList.add("key--correct");
    
    // Removing gold border from key

    allKeys[randomKeyIndex].classList.remove("key--active");

    // Array with keys that contains red border

    const containsClassKeyWrong = allKeys.filter(key =>
      key.classList.contains("key--wrong")
    );
    
    // showing wrong clicked key with red border
    if (containsClassKeyWrong.length === 0) {
      pressedWrongKey.classList.add("key--wrong");
      setTimeout(() => pressedWrongKey.classList.remove("key--wrong"), 400);
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
playBtn.addEventListener("click", startGame);

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
