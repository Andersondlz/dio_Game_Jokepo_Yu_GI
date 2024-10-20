const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    actions:{
        button: document.getElementById("next-duel"),
    },
}

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
}


const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img:`${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img:`${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissord",
        img:`${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    }
]


async function getRandomIdCard(){
    const randomIdCard = Math.floor(Math.random() * cardData.length);
    return cardData[randomIdCard].id;
}


async function createCardImage(IdCard, fildSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fildSide === playerSides.player1){
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard)
        }); 

        cardImage.addEventListener("click", () => {
            setCardsFiel(cardImage.getAttribute("data-id"));
        });
    }
    return cardImage;
}

async function setCardsFiel(cardId){

    // remove todas as cartas do campo

    await removeAllCardsImages();

    let computerCardId = await getRandomIdCard();   
    state.fildCards.player.style.display = "block";
    state.fildCards.computer.style.display = "block";

    state.fildCards.player.src = cardData[cardId].img;
    state.fildCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute: " + cardData[index].type;
}



async function drawCards(cardNumber, fildSide){
    for(let i = 0; i < cardNumber; i++){
        const randomIdCard = await getRandomIdCard();
        const cardImage = await createCardImage(randomIdCard, fildSide);
        document.getElementById(fildSide).appendChild(cardImage);

    }
}  
    

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();