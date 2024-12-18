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
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX : document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX : document.querySelector("#computer-cards"),
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
        name: "Tristate of Paper",
        type: "Paper",
        img:`${pathImages}papelk.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Golias of Rock",
        type: "Rock",
        img:`${pathImages}pedrak.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id:2,
        name: "Yume-Girl Scissord",
        type: "Scissord",
        img:`${pathImages}tesourak.png`,
        WinOf: [0],
        LoseOf: [1],
    }
]


async function getRandomIdCard(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
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
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }
    return cardImage;
}

async function setCardsField(cardId){
    // remove todas as cartas do campo
    await removeAllCardsImages();
    let computerCardId = await getRandomIdCard();   

    await showHiddenCardsFieldsImagens(true);
    await hiddenCardsDetails();

    await drawCardsInFilds(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

}

async function drawCardsInFilds(cardId, computerCardId){
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}
async function showHiddenCardsFieldsImagens(value){
    if(value === true){
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }

    if(value === false){
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardsDetails(){
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";  
    state.cardSprites.type.innerText = "";
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win : ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButton(text){

    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Empate"
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)){
        duelResults = "Ganhou";
        await playAudio("win");
        state.score.playerScore++;
    }

    if (playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Perdeu";
        await playAudio("lose");
        state.score.computerScore++;
    }
    return duelResults;
}


async function removeAllCardsImages(){
    let {computerBOX, player1BOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
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

async function resetDuel(){
    state.cardSprites.avatar.scr = ""
    state.actions.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init(); 
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);	
    audio.play();
    
}

function init(){
    showHiddenCardsFieldsImagens(false);
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();