var questionArr = [ "What was the name of Ned Stark's sword?",
"How did Daenerys Targaryan acquire three dragon eggs?",
"How many times has Beric Dondarrion been brought back to life by Thoros of Myr?",
"What can kill a White Walker besides dragonglass?",
"What is the only thing that can put out Wildfire?",
"What does the phrase 'Valar Morghulis' mean?",
"How many direwolves were in House Stark?",
"What was Arya's punishment for stealing from the Many-Faced God?",
"How did King Joffrey finally meet his end?",
"What was the name of Lady Lyanna Stark's child?",
"How did Bran lose the use of his legs?",
"Why does Tyrion's family hate him so much?"];

var answerArr = [["Blackfyre", "Ice", "Oathkeeper", "Heartsbane", "Lightbringer"],
["Found them buried in Essos", "Stolen from the Dothraki", "A gift at her wedding",
"Found in the basement of House Targaryan", "She inherited them from her brother Viserys"],
["4 times", "5 times", "6 times", "7 times", "Too many to count"],
["Weirwood", "Wildfire", "Valyrian Steel", "Fire", "Water"],
["Water", "Sand", "Sunlight", "Dragon blood", "Snow"],
["All men must die", "All men must serve", "All men must live", "All men must kneel", "All men must drink"],
["3 wolves", "4 wolves", "5 wolves", "6 wolves", "7 wolves"],
["Death", "Memory loss", "Blindness", "Poverty", "Starvation"],
["Stabbed", "Hung", "Flayed", "Poisoned", "Drowned"],
["Rickon", "Salladhor", "Illyrio", "Gendry", "Jon"],
["Fell out of a tree", "Pushed out a tower window", "Cut down with a sword", "Born that way", "Fell off a horse"],
["He is next in line for the throne", "He has a successful business", "He is serving in the Kingsguard",
"His mother died during his birth", "He is the richest man in Westeros"]];

var imageArr = ["<img class='center-block image' src='assets/images/nedstark.png'>",
"<img class='center-block image' src='assets/images/Daeneryseggs.png'>",
"<img class='center-block image' src='assets/images/beric.png'>",
"<img class='center-block image' src='assets/images/whitewalker.png'>",
"<img class='center-block image' src='assets/images/wildfire.png'>",
"<img class='center-block image' src='assets/images/valar.png'>",
"<img class='center-block image' src='assets/images/direwolves.png'>",
"<img class='center-block image' src='assets/images/arya.png'>",
"<img class='center-block image' src='assets/images/joffrey.png'>",
"<img class='center-block image' src='assets/images/jonsnow.png'>",
"<img class='center-block image' src='assets/images/bran.png'>",
"<img class='center-block image' src='assets/images/tyrion.png'>"];

var rightAnswer = [" Ice", " A gift at her wedding", " 6 times", " Valyrian Steel", " Sand", " All men must die",
" 6 wolves", " Blindness", " Poisoned", " Jon", " Pushed out a tower window", " His mother died during his birth"];

var questions = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var counter = 30;




$(document).ready(function() {
// Create a function that creates the button and main screen

(function startPage() {
    mainScreen = "<p class='text-center main-button-container'><a class='btn btn-default btn-lg start-button' role='button'>Shall we begin?</a></p>";
    $(".mainArea").html(mainScreen);
// Music plays in background
        var audio = new Audio("assets/audio/GoT.mp3");
        audio.volume = 0.06;
        audio.play();
//immediately call the function
})();

// start button click activates the gameScreen & timerCount functions: HTML with question, answers in button, and timer pauses.
$("body").on("click", ".start-button", function(event){
    gameScreen();
    timerCount();
});

//answer buttons on click function for user to select an answer.
$("body").on("click", ".answer", function(event){
//var selectedAnswer to hold clicked answer
    selectedAnswer = $(this).text();
//if correct answer is chosen ( which is in the rightAnswer array)- generateWin function runs; timer pauses
    if(selectedAnswer === rightAnswer[questions]) {
        //alert("correct");
        clearInterval(timer);
        WinScreen();
    }
//if incorrect answer chosen- Lossscreen function runs. timer is stopped from continuing countdown
    else {
        //alert("wrong answer!");
        clearInterval(timer);
        LossScreen();
    }
});

//Ending game reset button runs reset function
$("body").on("click", ".reset-button", function(event){
    resetGame();
});
});

//function to create the HTML with timer, question, and answer buttons.
function gameScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" +
    questionArr[questions] + "</p><p class='firstanswer answer'> " +
    answerArr[questions][0] + "</p><p class='answer'> "+
    answerArr[questions][1]+"</p><p class='answer'> "+
    answerArr[questions][2]+"</p><p class='answer'> "+
    answerArr[questions][3]+"</p><p class='answer'> "+
    answerArr[questions][4]+"</p>";
    $(".mainArea").html(gameHTML);
}

//function to advance to next question (there are 12 q total, so less than 12 and then advance to final screen function.
//timer countdown from 30 sec
function wait() {
    if (questions < 11) {
    questions++;
    gameScreen();
    counter = 30;
    timerCount();
    }
    else {
    finalScreen();
    }
}

//function for timer, interval set at 30 seconds. Counter is set on div "timer" in html
//when 30 = 0: timer pauses, timeoutLoss function runs, if timer is larger than 0, it goes down by 1 until it reaches 0
function timerCount() {
    timer = setInterval(thirtySec, 1000);
    function thirtySec() {
        if (counter === 0) {
            clearInterval(timer);
            timeOutScreen();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

//var to hold timeout html change (so I dont have to type it out every time below)
var timeHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>";

//when user select correct answer button, correct count goes up by 1; screen displays answer, image and "you are correct"
function WinScreen() {
    correct++;
    gameHTML = timeHTML + counter
    + "</span></p>" + "<p class='text-center'>You are correct! "
    + rightAnswer[questions] + " is the right answer!" + "</p>" + imageArr[questions];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 5000);
}

//when user selects incorrect answer button, incorrect count goes up by 1; screen displays correct answer, image and text.
function LossScreen() {
    incorrect++;
    gameHTML = timeHTML +
    counter + "</span></p>" + "<p class='text-center'> That is incorrect!  The correct answer is:  "+
    rightAnswer[questions] + "</p>" + imageArr[questions];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 5000);
}

//when user timer runs down, unanswered count goes up by 1; screen displays answer, image, and "time is up" text
function timeOutScreen() {
    unanswered++;
    gameHTML = timeHTML + counter
    + "</span></p>" + "<p class='text-center'>Time is up!  The correct answer is:  "
    + rightAnswer[questions] + "</p>" + imageArr[questions];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 5000);
}

//final screen function displays final count of correct/incorrect/unanswered questions, and reset button
function finalScreen() {
    gameHTML = timeHTML + counter
    + "</span></p>" + "<p class='text-center'>If you think this has a happy ending, you haven't been paying attention.</p>"
    + "<p class='summary-correct'>Correct Answers: " + correct + "</p>"
    + "<p class='text-center'>Wrong Answers: " + incorrect + "</p>"
    + "<p class='text-center'>Unanswered: " + unanswered + "</p>"
    + "<p class='text-center reset-button-container'><a class='btn btn-default btn-lg reset-button' role='button'>Valar Dohaeris! Play again?</a></p>";
    $(".mainArea").html(gameHTML);
}
//reset function clears counts, sets timer back to 30.
function resetGame() {
    questions = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    counter = 30;
    gameScreen();
    timerCount();
}




