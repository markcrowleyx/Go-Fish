let allFish = [
    "../images/albacore-tuna.png",
    "../images/bass.png",
    "../images/blue-shark.png",
    "../images/bluefin-tuna.png",
    "../images/bream.png",
    "../images/brill.png",
    "../images/coalfish.png",
    "../images/cod.png",
    "../images/conger-eel.png",
    "../images/dogfish.png",
    "../images/flounder.png",
    "../images/garfish.png",
    "../images/haddock.png",
    "../images/hake.png",
    "../images/herring.png",
    "../images/john-dory.png",
    "../images/ling.png",
    "../images/mackerel.png",
    "../images/monkfish.png",
    "../images/mullet.png",
    "../images/octopus.png",
    "../images/plaice.png",
    "../images/pollock.png",
    "../images/porbeagle-shark.png",
    "../images/red-gurnard.png",
    "../images/red-mullet.png",
    "../images/skate.png",
    "../images/sprat.png",
    "../images/squid.png",
    "../images/thornback-ray.png",
    "../images/turbot.png",
    "../images/wrasse.png",
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
