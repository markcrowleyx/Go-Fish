let allFish = [
    "/assets/images/albacore-tuna.png",
    "/assets/images/bass.png",
    "/assets/images/blue-shark.png",
    "/assets/images/bluefin-tuna.png",
    "/assets/images/bream.png",
    "/assets/images/brill.png",
    "/assets/images/coalfish.png",
    "/assets/images/cod.png",
    "/assets/images/conger-eel.png",
    "/assets/images/dogfish.png",
    "/assets/images/flounder.png",
    "/assets/images/garfish.png",
    "/assets/images/haddock.png",
    "/assets/images/hake.png",
    "/assets/images/herring.png",
    "/assets/images/john-dory.png",
    "/assets/images/ling.png",
    "/assets/images/mackerel.png",
    "/assets/images/monkfish.png",
    "/assets/images/mullet.png",
    "/assets/images/octopus.png",
    "/assets/images/plaice.png",
    "/assets/images/pollock.png",
    "/assets/images/porbeagle-shark.png",
    "/assets/images/red-gurnard.png",
    "/assets/images/red-mullet.png",
    "/assets/images/skate.png",
    "/assets/images/sprat.png",
    "/assets/images/squid.png",
    "/assets/images/thornback-ray.png",
    "/assets/images/turbot.png",
    "/assets/images/wrasse.png",
];

//Select 8 random images from allFish.
let someFish = allFish.sort(() =>0.5 - Math.random()).slice(0, 9);//This is the Fisher Yates algorithm.
let poolFish = someFish.concat(someFish).sort(() => 0.5 - Math.random());

// convert the array of URL's into an array of images

// Display images from allFish array in fish-pool area
function dealCards() {
    let fishPool = document.getElementsByClassName("fish-pool")[0];
    for (let fish of poolFish){
        const fishCardElement = document.createElement("div");
        fishCardElement.classList.add("fish-card");
        fishCardElement.innerHTML = `
        <div class= "front">
        <img class = "fish-image" src="${fish}"/>
        </div>
        <div class="back"></div>
        `;
        fishPool.appendChild(fishCardElement);
    }
}
dealCards();




// Function to flip each fishCard on clicking it
