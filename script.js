const cards = document.querySelectorAll(".card");
const move=document.querySelectorAll(".moves");;
let matched = 0;
let moves=0;
const moveLimit=15;
let cardOne, cardTwo;
let disableDeck = false;
const state={
    clickedCard:0,
    totalflips:0,

};
function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne=clickedCard
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
        state.totalflips++;
        moves++;
        updateMoves();
    }
}
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8 ) {
            setTimeout(() => {
                alert("Congrats, You Win!");
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }else{ 
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
if(moves>=moveLimit){
    setTimeout(()=>{
        alert("Try again, You Loose!");
        resetGame();
    },1000);
}
}
}
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    moves=0;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelectorAll(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
    state.totalflips=0;
    updateMoves();
}
function resetGame(){
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    shuffleCard();
    state.totalflips=0;
    updateMoves();
    
}
function updateMoves(){
    move.forEach(Element=>{
        Element.textContent=`Moves:${state.totalflips}`;
    });
}
shuffleCard();   
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});