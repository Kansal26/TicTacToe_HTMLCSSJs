let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset_btn");
let turn = true; 
let chance = 0;
let winner = document.getElementById("winner");
let choice = 0;
let twoPlayer = document.getElementById("twoPlayer");
let onePlayer = document.getElementById("onePlayer");
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
for(box of boxes) {
    box.disabled = true;
}
reset.disabled = true;
twoPlayer.onclick = () => {
    choice = 0;
    twoPlayer.style.background = "white";
    twoPlayer.style.color = "#ffbf69"
    onePlayer.style.background = "";
    onePlayer.disable = true;
    for(box of boxes) {
        box.disabled = false;
    }
    reset.disabled = false;
}
onePlayer.onclick = () => {
    choice = 1;
    onePlayer.style.background = "white";
    onePlayer.style.color = "#ffbf69";
    twoPlayer.style.background = "";
    for(box of boxes) {
        box.disabled = false;
    }
    twoPlayer.disabled = true;
    reset.disabled = false;
}
const checkWinner = () => {
    for(pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 !="" && pos2 != "" && pos3 != "") {
            if((pos1==="O" && pos2==="O" && pos3==="O") || (pos1==="X" && pos2==="X" && pos3==="X")) {
                for(let box of boxes) {
                    box.disabled = true;
                }
                winner.innerText = `Winner is ${pos1}`;
                chance=1;
            }
        }
    }
}

const computer = () => {
    let r;
    do {
    r = Math.floor(Math.random() * 9);
    }
    while(boxes[r].disabled != false);
    if(turn) {
        boxes[r].innerText = 'O';
        turn = false;
    }
    else {
        boxes[r].innerText = 'X';
        turn = true;
    }
    boxes[r].disabled = true;
    checkWinner();
}

boxes.forEach((box) => {
       
    box.addEventListener('click', () => {
            
        if(turn) {
            box.innerText='O';
            turn=false;
        }
        else {
            box.innerText='X';
            turn=true;
        }
        box.disabled=true;
        checkWinner();
        if(chance==0 && choice==0) {
            computer();
        }
    })
    
})

reset.onclick = () => {
    for(box of boxes){
        box.innerText = "";
        box.disabled = true;
        chance = 0;
        winner.innerText = "";
        choice = 0;
        onePlayer.style.background = "";
        twoPlayer.style.background = "";
        twoPlayer.style.color = "white";
        onePlayer.style.color = "white";
        onePlayer.disabled = false;
        twoPlayer.disabled = false;
    }
}

