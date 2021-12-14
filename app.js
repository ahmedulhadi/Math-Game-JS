var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on start
document.getElementById("startreset").onclick = function() {
    if (playing == true) {
        // reload the page
        location.reload();

    } else {
        playing = true;
        //if not playing - score 0, show score- dispay time, change to reset game
        score = 0;
        document.getElementById("score-value").innerHTML = score;
        show("timeremaining");
        hide('gameover')
        document.getElementById('startreset').innerHTML = "Reset Game"
        timeremaining = 60;
        startCount();

        //generate questions
        generateQA();
    }

}

for (i = 1; i < 5; i++) {
    document.getElementById('box' + i).onclick = function() {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById('score-value').innerHTML = score

                // audio for correct ans
                var correct_audio = new Audio('/Music/correct-answer.mp3');
                correct_audio.play();

                hide('wrong')
                show('correct')
                setTimeout(function() {
                    hide('correct')
                }, 1000)
                generateQA();

            } else {

                // audio for wrong ans
                var wrong_audio = new Audio('/Music/wrong-answer.mp3');
                wrong_audio.play();

                hide('correct')
                show('wrong')
                setTimeout(function() {
                    hide('wrong')
                }, 1000)
            }
        }
    }
}
//functions
//StartCount
function startCount() {
    action = setInterval(function() {
        timeremaining -= 1;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCount();
            show('gameover');
            document.getElementById('gameover').innerHTML =
                "<p>Game Over! </p> <p>Your score is " + score + ".</p>";
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            playing = false;
            document.getElementById('startreset').innerHTML = "Start Game"
        }

    }, 1000);
}


//Stop Count
function stopCount() {
    clearInterval(action)
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";

}

function show(Id) {
    document.getElementById(Id).style.display = "block";

}

//generate qa
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById('question').innerHTML = x + 'x' + y;

    var correctPosition = x = 1 + Math.round(3 * Math.random());
    document.getElementById('box' + correctPosition).innerHTML = correctAnswer;

    for (i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = 1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random());
            }
            while (wrongAnswer == correctAnswer)
            document.getElementById('box' + i).innerHTML = wrongAnswer
        }
    }
}