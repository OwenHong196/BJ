// Build a BlackJack Game

// variables representing two cards
let firstCard = 0
let secondCard = 0
let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("cards-el")
let cardsEl = document.getElementById("sum-el")

function getRandomCard(){
    let num = (Math.random() * 13) + 1
    num = Math.floor(num)
    if (num == 11){
        cards.push("J")
    }else if(num == 12){
        cards.push("Q")
    }else if(num == 13){
        cards.push("K")
    }else if (num == 1){
        cards.push("A")
    }else{
        cards.push(num)
    }
    if (num > 9){
        num = 10
    }
    if (num == 1){
        num = 11
    }
    return num
}

function newCard(){
    let card= getRandomCard()
    sum += card
}

function renderGame(){
    if (!hasBlackjack || isAlive){
        cardsEl.textContent = "Cards: "
        for (let i = 0; i < cards.length; i++) {
            if (cards.length > i+1){
                cardsEl.textContent+= cards[i] + ","
            }else{
                cardsEl.textContent+= cards[i]
            }
            console.log(cardsEl.textContent)
        }
        if (sum < 21){
            message = "Do you want to draw a new card? 🙂"
        }else if (sum == 21){
            message = "Wohoo! You've got Blackjack! 🥳"
            hasBlackjack = true
            document.getElementById("start").addEventListener("click",startGame)
            document.getElementById("newC").removeEventListener("click",renderGame)
            let scoreList = JSON.parse(localStorage.scores)
            scoreList.push(sum)
            if (scoreList.length > 4){
                scoreList.splice(0,1)
            }
            localStorage.setItem("scores",JSON.stringify(scoreList))
            isAlive = false
        }else {
            message = "You're out of the game! 😭"
            isAlive = false
            document.getElementById("start").addEventListener("click",startGame)
            document.getElementById("newC").removeEventListener("click",renderGame)
            let scoreList = JSON.parse(localStorage.scores)
            scoreList.push(sum)
            if (scoreList.length > 4){
                scoreList.splice(0,1)
            }
            localStorage.setItem("scores",JSON.stringify(scoreList))
        }
        messageEl.textContent = message
        sumEl.textContent = "sum: " + sum
    }
}

function startGame(){
    sum = 0
    cards = []
    isAlive = true
    document.getElementById("previous").textContent = "Previous Scores: "
    firstCard = newCard()
    secondCard = newCard()
    document.getElementById("start").removeEventListener("click",startGame)
    document.getElementById("newC").addEventListener("click",renderGame)
    if (!localStorage.haveName){
        let list = []
        localStorage.setItem("scores",JSON.stringify(list))
        localStorage.setItem("haveName",true)
        let name = prompt("Enter your name: ")
        localStorage.setItem("name", name)
        document.getElementById("name").textContent = "Welcome, " + localStorage.name
    }else{
        document.getElementById("name").textContent = "Welcome, " + localStorage.name
        let scoreList = JSON.parse(localStorage.scores)
        for(let i = 0; i < scoreList.length; i++){
            if (scoreList.length > i+1){
                document.getElementById("previous").textContent += scoreList[i] + ","
            }else{
                document.getElementById("previous").textContent += scoreList[i]
            }
        }
        scoreList.sort()
        document.getElementById("min").textContent = "Minimum Score: " + scoreList[0]
        document.getElementById("max").textContent = "Maximum Score: " + scoreList[scoreList.length-1]
        let mean = calculateMean()
        document.getElementById("mean").textContent = "Mean of Previous Scores: " + mean
    }
    renderGame()
}
function calculateMean(){
    let list = JSON.parse(localStorage.scores)
    let sum = 0
    for (let i = 0; i < list.length; i++){
        sum += list[i]
    }
    return sum / list.length
}