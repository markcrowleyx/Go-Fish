let allFish = [
    "/assets/images/albacore-tuna.png",
    "/assets/images/bass.png",
    "/assets/images/blue-shark.png",
    "/assets/images/bluefin-tuna.png",
    "/assets/images/bream.png",
    "/assets/images/brill.png",
    "/assets/images/coalfish.png",
    "/assets/images/cod.png"
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