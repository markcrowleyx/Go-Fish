let fishNames = [];


let matchingPairs = [];
let catchCount = [];
let allFish = [
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
    { "image": "assets/images/flounder.png", "name": "Flounder", "alt": "Flounder" },
    { "image": "assets/images/garfish.png", "name": "Garfish", "alt": "Garfish" },
    { "image": "assets/images/haddock.png", "name": "Haddock", "alt": "Haddock" },
    { "image": "assets/images/hake.png", "name": "Hake", "alt": "Hake" },
    { "image": "assets/images/herring.png", "name": "Herring", "alt": "Herring" },
    { "image": "assets/images/john-dory.png", "name": "John-Dory", "alt": "John-Dory" },
    { "image": "assets/images/ling.png", "name": "Ling", "alt": "Ling" },
    { "image": "assets/images/mackerel.png", "name": "Mackerel", "alt": "Mackerel" },
    { "image": "assets/images/monkfish.png", "name": "Monkfish", "alt": "Monkfish" },
    { "image": "assets/images/mullet.png", "name": "Mullet", "alt": "Mullet" },
    { "image": "assets/images/octopus.png", "name": "Octopus", "alt": "Octopus" },
    { "image": "assets/images/plaice.png", "name": "Plaice", "alt": "Plaice" },
    { "image": "assets/images/pollock.png", "name": "Pollock", "alt": "Pollock" },
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

//Select 8 random images from allFish.
let someFish = allFish.sort(() => 0.5 - Math.random()).slice(0, 9);//This is the Fisher Yates algorithm.

// Duplicate each image and then shuffle again.
let poolFish = someFish.concat(someFish).sort(() => 0.5 - Math.random());


// Display images from allFish array in fish-pool area
function dealCards() {
    let fishPool = document.getElementsByClassName("fish-pool")[0];
    for (let fish of poolFish) {
        const fishCardElement = document.createElement("div");
        fishCardElement.classList.add("fish-card");
        fishCardElement.innerHTML = `
        <div class ="fish-card-content" onclick = ("flipCard()") >
        <div class= "face front">
        <img class = "fish-image" src="${fish.image}" alt="${fish.alt}"/>
        </div>
        <div class="face back"></div>
        </div>
        `;
        fishPool.appendChild(fishCardElement);
        /*fishCardElement.addEventListener("click", show);*/
        /*let allCards = document.getElementsByClassName("fish-card-content");
        allCards.addEventListener("click", show)*/
        /*let fishCardContent = document.getElementsByClassName("fish-card-content");*/
        /*fishCardContent.addEventListener("click", flipCard);*/
        let fishCardContent = document.getElementsByClassName("fish-card-content");
        fishCardContent.setAttribute("data-name", `${fish.name}`);
        

    }
}

dealCards();

// Function to flip each fishCard on clicking it
function flipCard() {
    let selected = this.dataset.name;
    fishNames.push(selected);
    this.classList.add('open');
    if (fishNames.length === 2) {
        setTimeout(checkForMatch, 500);
        console.log(`You clicked : ${selected}`);
    }
    
}
