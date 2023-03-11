const ul = document.createElement("ul");
const li = document.createElement("li");
const form = document.forms[0];
const rowInput = document.getElementById("row-count");
const columnInput = document.getElementById("column-count");
const startBtn = document.getElementById("start-btn");
const images = [
    "01-cat",
    "02-dog",
    "03-cow",
    "04-lion",
    "05-monkey",
    "06-horse",
    "07-tiger",
    "08-rabbit",
    "09-goat",
    "10-elephant",
    "11-zebra",
    "12-whale",
    "13-octopus",
    "14-penguin",
    "15-crocodile",
    "16-giraffe",
    "17-eagle",
    "18-bear",
    "19-squirrel",
    "20-ostrich",
    "21-reindeer",
    "22-frog",
    "23-leopard",
    "24-raccoon",
    "25-cheetah",
    "26-crab",
    "27-pig",
    "28-seal",
    "29-snake",
    "30-flamingo",
    "31-tortoise",
    "32-snail",
    "33-ant",
    "34-hummingbird",
    "35-peacock",
    "36-hamster",
    "37-panda-bear",
    "38-beetle",
    "39-turtle",
    "40-yak",
    "41-orca",
    "42-bison",
    "43-shark",
    "44-dolphin",
    "45-chameleon",
    "46-turkey",
    "47-walrus",
    "48-seahorse",
    "49-jaguar",
    "50-black-panther",
];
const endGame = document.querySelector(".endgame");
let busy;
let open;

rowInput.max = (innerHeight - form.offsetHeight - 10)/138|0;
columnInput.max = innerWidth/138|0;

form.onchange = (e) => {
    e.target.previousElementSibling.innerText = e.target.value;
};

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    buildBoard(rowInput.value, columnInput.value);
    endGame.hidden = true;
});

ul.addEventListener("click", (e) => {
    if (e.target == ul || busy || e.target.classList.contains("open")) return;

    e.target.classList.add("open");

    if (!open) {
        open = e.target;
        checkIfFinished();
    } else {
        if (open.style.backgroundImage == e.target.style.backgroundImage) {
            open = null;
            checkIfFinished();
        } else {
            busy = true;
            setTimeout(() => {
                e.target.classList.remove("open");
                open.classList.remove("open");
                busy = false;
                open = null;
            }, 2000);
        }
    }
});

function buildBoard(rowCount, columnCount) {
    ul.innerHTML = "";
    const count = rowCount * columnCount;
    const images = chooseRandomImages(count);
    for (let i = 0; i < count; i++) {
        const item = li.cloneNode();
        ul.appendChild(item);
        item.style.backgroundImage = `url(assets/png/0${images[i]}.png)`;
    }
    document.body.append(ul);
    ul.style.setProperty("--column-count", columnCount);
}

function chooseRandomImages(count) {
    const randomImages = [];
    count = Math.round(count / 2);
    while (randomImages.length < count) {
        const i = Math.floor(Math.random() * images.length);
        if (!randomImages.includes(images[i])) {
            randomImages.push(images[i]);
        }
    }
    randomImages.push(...randomImages);
    const results = [];
    while (randomImages.length) {
        const i = Math.floor(Math.random() * randomImages.length);
        results.push(...randomImages.splice(i, 1));
    }
    return results;
}

function checkIfFinished() {
    if (!document.querySelector("li:not(.open)")) {
        endGame.hidden = false;
    }
}
