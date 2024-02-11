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



// Display images from allFish array in fish-pool area
function dealCards() {
    let fishPool = document.getElementsByClassName("fish-pool")[0];
    allFish.forEach(image => {
        let img = document.createElement('img');
        img.src = image;
        fishPool.appendChild(img);
    })
}
dealCards();