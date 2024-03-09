let fishPerDeal = 9
// Timeout in milliseconds while we check for pair
const checkPairTimeout = 500
let poolFish = [];
let fishNames = [];
let cards;
let firstPick, secondPick;
//let firstFish, secondFish;
let matchingPairs = [];
let catchCount = 0;
let dealCount = 0;
//let someFish = [];
let total = 27;
let fishSet = [
    { "image": "assets/images/albacore-tuna.png", "name": "Alabcore-Tuna", "alt": "Albacore-Tuna"},
    { "image": "assets/images/bass.png", "name": "Bass", "alt": "Bass" },
    { "image": "assets/images/blue-shark.png", "name": "Blue-Shark", "alt": "Blue-Shark" },
    { "image": "assets/images/bluefin-tuna.png", "name": "Bluefin-Tuna", "alt": "Bluefin-Tuna" },
    { "image": "assets/images/bream.png", "name": "Bream", "alt": "Bream" },
    { "image": "assets/images/brill.png", "name": "Brill", "alt": "Brill" },
    { "image": "assets/images/coalfish.png", "name": "Coalfish", "alt": "Coalfish" },
    { "image": "assets/images/cod.png", "name": "Cod", "alt": "Cod" },
    { "image": "assets/images/conger-eel.png", "name": "Conger-Eel", "alt": "Conger-Eel" },
    { "image": "assets/images/dogfish.png", "name": "Dogfish", "alt": "Dogfish" },

    { "image": "assets/images/garfish.png", "name": "Garfish", "alt": "Garfish" },
    { "image": "assets/images/haddock.png", "name": "Haddock", "alt": "Haddock" },


    { "image": "assets/images/john-dory.png", "name": "John-Dory", "alt": "John-Dory" },

    { "image": "assets/images/mackerel.png", "name": "Mackerel", "alt": "Mackerel" },
    { "image": "assets/images/monkfish.png", "name": "Monkfish", "alt": "Monkfish" },
    { "image": "assets/images/mullet.png", "name": "Mullet", "alt": "Mullet" },
    { "image": "assets/images/octopus.png", "name": "Octopus", "alt": "Octopus" },
    { "image": "assets/images/plaice.png", "name": "Plaice", "alt": "Plaice" },

    { "image": "assets/images/porbeagle-shark.png", "name": "Porbeagle-Shark", "alt": "Porbeagle-Shark" },
    { "image": "assets/images/red-gurnard.png", "name": "Red-Gurnard", "alt": "Red-Gurnard" },
    { "image": "assets/images/red-mullet.png", "name": "Red-Mullet", "alt": "Red-Mullet" },
    { "image": "assets/images/skate.png", "name": "Skate", "alt": "Skate" },
    { "image": "assets/images/sprat.png", "name": "Sprat", "alt": "Sprat" },
    { "image": "assets/images/squid.png", "name": "Squid", "alt": "Squid" },
    { "image": "assets/images/thornback-ray.png", "name": "Thornback-Ray", "alt": "Thornback-Ray" },
    { "image": "assets/images/turbot.png", "name": "Turbot", "alt": "Turbot" },
    { "image": "assets/images/wrasse.png", "name": "Wrasse", "alt": "Wrasse" }
];
let allFish = [...fishSet];
let playerName = document.getElementById("username").value;


//Select random images from allFish.
function getCards() {    
    let someFish = allFish.sort(() => 0.5 - Math.random()).splice(0, fishPerDeal);//This is the Fisher Yates algorithm.
    // Duplicate each image and then shuffle again.
    poolFish = someFish.concat(someFish).sort(() => 0.5 - Math.random());
}

/*const fishCardTemplate = `
        <div class ="fish-card-content" >
        <div class= "face front" >
        <img class = "fish-image" src="${fish.image}" alt="${fish.alt}" data-name="${fish.name}"/>
        </div>
        <div class="face back"></div>
        </div>
        `;*/

/**
 *  Display images from fish list in fish-pool area
 */
function dealCards() {
    getCards();
    let fishPool = document.getElementsByClassName("fish-pool")[0];
    for (let fish of poolFish) {
        let fishCardElement = document.createElement("div");
        fishCardElement.classList.add("fish-card");
        fishCardElement.innerHTML = `
        <div class ="fish-card-content" >
        <div class= "face front" >
        <img class = "fish-image" src="${fish.image}" alt="${fish.alt}" data-name="${fish.name}"/>
        </div>
        <div class="face back"></div>
        </div>
        `;
        fishPool.appendChild(fishCardElement);      
    }

    // Remove existing event listeners
    if (cards) {
        Array.from(cards).forEach(card => {
            card.removeEventListener("click", flipCard);
        });
    }

    // Add event listener for click function to all the fish-card-content divs
    cards = document.getElementsByClassName("fish-card-content");
    Array.from(cards).forEach(card => {
        card.addEventListener("click", flipCard)
    });
    dealCount += 1;
}

//dealCards();



function clearDeck() {
    document.getElementsByClassName("fish-pool")[0].innerHTML = "";
}

// Function to flip each fishCard on clicking it
function flipCard() {
    // If timer is not running, do not allow user to play the game
    if (!interval) return;

    // In case user clicks on same fish, return
    if (this === firstPick) return;

    //Prevent any new selection if two cards have already been selected,
    //and we are waiting for timeout
    if (firstPick && secondPick) return;

    this.classList.add("open");
    if (!firstPick) {
        firstPick = this;
        let cardId = this.querySelector(".fish-image").getAttribute("data-name");
        if (fishNames.length === 0) {
            fishNames.push(cardId);
            console.log("ID 1" + cardId);
            console.log("fishNames 0 " + fishNames[0]);
        }
        return;
    }
    secondPick = this;
    let cardId = this.querySelector(".fish-image").getAttribute("data-name");
    if (fishNames.length === 1) {
        fishNames.push(cardId);
        console.log("ID 2 " + cardId);
        console.log("fishNames 1 " + fishNames[1]);
    }
    setTimeout(checkIfPair,checkPairTimeout);
    checkIfPair();    
}

// Function to display the image of the matched pair in the catch-box div    
let matchedFishImage = document.createElement("img");
let caption = document.getElementById("caption");
let picture = document.getElementById("picture");
function displayMatchingPair() {    
    picture.innerHTML = "";
    //matchedFishImage.remove();
    let lastMatchedFish = fishNames[1];
    let matchedFish = poolFish.find(f => f.name === lastMatchedFish);
    matchedFishImage.src = matchedFish.image;
    matchedFishImage.alt = matchedFish.alt;
    picture.appendChild(matchedFishImage);
    caption.innerText = matchedFish.name;
}

//Function to check if the cards match
function checkIfPair() {
    if (fishNames.length === 2 && fishNames[0] !== fishNames[1]) {
        closeCards();
        fishNames = [];
    } else if (fishNames.length === 2 && fishNames[0] === fishNames[1]) {
        catchCount += 1;
        console.log("catchcount " + catchCount);
        displayMatchingPair();
        addToMatchingPairs();
        console.log("FishperDeal " + fishPerDeal)
        console.log("MP " + matchingPairs.length);
        console.log("Deal count " + dealCount);
        console.log("allFish length = " + allFish.length);
        fishNames = [];
        freezeCards();
        resetCards();
        reviewProgress();

        //Check for game over condition
        if (catchCount === total) {
            pauseTimer(); //Stop the timer
            caption.style.display = "none";
            /*let playerName = document.getElementById("username").value;*/
            let gameTime = timer.textContent;
            gameOver(gameTime);
        }
    }

    if (catchCount % fishPerDeal === 0 && matchingPairs.length > 0 && catchCount / dealCount === fishPerDeal) {
        clearDeck();
        dealCards();
    }


}

// Function to remove event listeners from matched pair.
function freezeCards() {
    firstPick.removeEventListener("click", flipCard);
    secondPick.removeEventListener("click", flipCard);
}

//Function to close the cards again
function closeCards() {
    setTimeout(() => {
        firstPick.classList.remove("open");
        secondPick.classList.remove("open");
        resetCards();
    }, 1000
    );
}

// Add matched pair name to the matchingPairs array if it is not already there
function addToMatchingPairs() {
    let alreadyMatched = matchingPairs.includes(fishNames[0]);
    if (!alreadyMatched) {
        matchingPairs.push(fishNames[0]);      
        displayMatchingPair();
    }
    reviewProgress();
}
 
// Function to reset the cards
function resetCards() {
    firstPick = null;
    secondPick = null;
}

//Function for Game Over
function gameOver(gameTime) {
    //Display game over message wityh player name and time
    /*let gameTime = timer.textContent;*/
    //Retrieve the player name from the input field
    let playerName = document.getElementById("username").value;
    console.log("Game over function being called");
    console.log("Picture element: ", picture);
    console.log("Player name: ", playerName);
    // Add the game-over class to the picture div
    picture.classList.add("game-over");
    picture.innerHTML = `<h2>Game Over</h2>
    <p>Congratulations, ${playerName}! You completed the game in ${gameTime}.</p>`;
}

// Function to start a new game
function startGame() {
    //Reset all game variables and elements
    console.log("starting new game.....");
    resetTimer();
    catchCount = 0;
    dealCount = 0;
    matchingPairs = [];
    fishNames = [];
    allFish = [...fishSet]; // Resets the allFish array.
    console.log("allFish reset to initial state: ", allFish);
    clearDeck();
    progressBar.style.width = "0%";
    progressText.textContent = "0/27";
    tally.textContent = "0";
    picture.innerHTML = "";
    caption.innerText = "";
    //Remove the game-over class from the picture div
    picture.classList.remove("game-over");
    //Start the timer and deal new cards
    startTimer();
    dealCards();
}

// Progress bar
let progressBar = document.getElementById("progress");
let progressText = document.getElementById("progress-text");
let tally = document.getElementsByClassName("tallyBoard")[0];


function reviewProgress() {
    let percentage = (catchCount/ total) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${catchCount}/${fishSet.length}`;
    tally.textContent = `${catchCount}`;
}

// Timer section
let timer = document.getElementById("timer");
let time = 0;
let interval;

function startTimer() {
    if (interval) return;
    interval = setInterval(function () {
        time++;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        timer.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    time = 0;
}

function resumeTimer() {
    startTimer();
}

// Add event listeners to the buttons
document.addEventListener("DOMContentLoaded", () => {
    playButton = document.getElementById("start");
    playButton.addEventListener("click", startGame);
    pauseButton = document.getElementById("pause");
    pauseButton.addEventListener("click", pauseTimer);
    resumeButton = document.getElementById("resume");
    resumeButton.addEventListener("click", resumeTimer);
})