//Hi, its Simon Kuforiji


//start the game by pressing a key
let started = false;
let level = 0;
$(document).keypress(function (e) { 
    if(!started){
        started = true;
        console.log("keypress detected. Game started");
        gamePlay();
    }
});

let userSequence = [];  //initialize user array to empty wrong place!!!!!!!
//listen for clicks
$(".btn").click(function (e) { 
    let btnId = e.target.id;
    pressedBtn(btnId);
    btnSound(btnId);
    console.log("user clicked- " + btnId);
    userSequence.push(btnId);   //push clicked color to user sequence
    console.log("userSequence= [ " + userSequence + " ]");

    //compare the just pressed value to value at corresponding index at game sequence
    compareSequence(userSequence.length-1);
});

function compareSequence(currentIndex){
    if(userSequence[currentIndex] === gameSequence[currentIndex]){
        if(userSequence.length === gameSequence.length){
            //wait for some time, grow game sequence and continue
            setTimeout(gamePlay(), 1000);
            console.log("Next");
        }
    }
    else{
        $("#level-title").html("Game Over");
        gameOver();
        console.log("Game over");
        setTimeout(function(){
            $("#level-title").html("Press A Key to Start");
        }, 500);
    }
}

let gameSequence = []   //initialize game sequence as empty array
// play the game
function gamePlay(){
    console.log("Level " + (gameSequence.length + 1));
    level = gameSequence.length + 1;
    $("#level-title").html("Level " + level);

    if((level % 3) === 0){
        motivation();
    }

    userSequence = [];  //reset userSequence
    //generate a random color and push to game sequence
    //generate a random no btwn 0 and 3
    let randomNumber = Math.floor(Math.random() * 4); 
    let button = ["red", "green", "yellow", "blue"];
    gameSequence.push(button[randomNumber]);    //push the corresponding color

    //call the function that outputs the sequence
    playSequence();
    console.log("gameSequence= [ " + gameSequence + " ]");
}

function motivation(){
    let randomNumber2 = Math.floor(Math.random() * 4); 
    let motivationText = ["You're on FIRE!", "What a Memory!", "Genius!", "Excellent Memory!"];

    $("#level-title").html(motivationText[randomNumber2]);
    setTimeout(function(){
        $("#level-title").html("Level " + level);   //reset the default text
    }, 1000);
}

function playSequence(){
    console.log("gameSequence is Playing");
    let cnt = 0;
    let callInterval = setInterval(function(){
        pressedBtn(gameSequence[cnt]); 
        btnSound(gameSequence[cnt]);
        cnt++;
        if(cnt >= gameSequence.length) {
            clearInterval(callInterval);
        }
    }, 1000);
}

//function to activate pressed class for a class
function pressedBtn(b){
    $("#" + b).addClass("pressed");
    setTimeout(() => $("#" + b).removeClass("pressed"), 100);
    console.log(b + " button pressed");
}

//function to play button sound
function btnSound(s){
    var audio = new Audio("sounds/" + s + ".mp3");
    audio.play();
    console.log(s + ".mp3 played");
}

function gameOver(){
    $("body").addClass("game-over");
    btnSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    gameSequence = [];
    started = false;
}