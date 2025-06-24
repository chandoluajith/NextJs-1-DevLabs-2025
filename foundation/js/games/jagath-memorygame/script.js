const container = document.querySelector(".container");
const cards = document.querySelectorAll(".card");
const body = document.querySelector("body");
const button = document.querySelector(".restart");
const check = [];
for (var i = 0; i < 16; ++i) {
  check.push(0);
}

const h1 = document.createElement("h1");
const h2 = document.createElement("h2");
const div = document.createElement("div");
div.className = "points";
const p1 = document.createElement("h2");
const p2 = document.createElement("h2");
var player1 = 0, player2 = 0;
var count = 0;
var img1;
var img2 = 0;
var index1 = 0;
var index2 = 0;
p1.textContent = "Player 1: 0";
p2.textContent = "Player 2: 0";
div.append(p1);
div.append(p2);
body.append(div);
body.prepend(h2);
h2.textContent = "Player 1's turn";
h1.textContent = "Memory Game";
body.prepend(h1);

function winner() {
  for (var i = 0; i < 16; ++i) {
    if (check[i] != 1) return -1;
  }
  return 1;
}

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("flipped");
    count++;
    var ind = Array.from(cards).indexOf(card);
    var bac = card.querySelector(".back");
    var img = bac.querySelector("img");
    if (count % 2 == 0) {
      img2 = img;
      index2 = ind;
      if (img1.src != img2.src && img2 != 0) {
        setTimeout(() => {
          cards[index1].classList.toggle("flipped");
          cards[index2].classList.toggle("flipped");
        }, 1500);
      } else if (img1.src == img2.src && img2 != 0) {
        check[index2]++;
        check[index1]++;
        if (count % 4) {
          player1++;
          p1.textContent = `Player 1: ${player1}`;
        } else {
          player2++;
          p2.textContent = `Player 2: ${player2}`;
        }
      }
      if (winner() == 1 && player1 < player2) {
        h2.textContent = "Player 2 WINS";
      } else if (winner() == 1 && player1 > player2) {
        h2.textContent = "Player 1 WINS";
      } else if (winner() == 1 && player1 == player2) {
        h2.textContent = "It's a TIE!";
      } else {
        if (count % 4) {
          setTimeout(() => {
            h2.textContent = "Player 2's turn";
          }, 1200);
        } else {
          setTimeout(() => {
            h2.textContent = "Player 1's turn";
          }, 1200);
        }
      }
    } else {
      img1 = img;
      index1 = ind;
    }
  });
});
button.addEventListener("click", () => {
  for (var i = 0; i < 16; ++i) {
    if (cards[i].classList.contains("flipped"))
      cards[i].classList.toggle("flipped");
  }
  img2 = 0;
  (index1 = 0), (index2 = 0), (player1 = 0), (player2 = 0);
  p1.textContent = "Player 1: 0";
  p2.textContent = "Player 2: 0";
  count = 0;
  h2.textContent = "Player 1's turn";
});

