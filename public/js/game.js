// Append questions to each value box in the page
// add buzzer function to listen for the first users input with a "buzzedIn" boolean in the cookie
// add button click functionality to populate each question into the given field
// add logic to check answers that are given by the users
//      add a message telling the user whether their score was correct or incorrect

const { Game } = require("../../models");

// add logic to update scores based on a correct/incorrect answer
const socket = io("http://localhost:3001");
//let {Game} = require('../../models')

// Function to pull down game data into a local object in the scripts
const getGame = async function () {
const getGameDataResp  = await fetch(`/api/games/${req.session.username}`, {
    method: 'GET',
    body: ({user_id, points, game_id})
});
const getGameData = await getGameDataResp.json();
const getGameStateDataResp = await fetch(`/api/gameStates/${getGameData.game_id}`, {
    method: 'GET',
    body: ({question_id})
});
const getGameStateData = await getGameStateDataResp.json();
return activeGame = {user_id: getGameData.user_id, points: getGameData.points, game_id: getGameData.game_id};
};
//Function to update the database with the local object
const updateGame = async function () {
const updateGameData = await fetch(`/api/games/${req.session.username}`, {
    method: 'POST',
    body: JSON.stringify(activeGame),
})
};

const checkAnswer = (answerInput, correctAnswer) => {
    let answerBoolean = false;
    if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
        answerBoolean = true;
    }
    return answerBoolean;
};

const submitAnswer = async function (correctAnswer, playerScore) {
    // Need API route to get correct answer
    if (checkAnswer(document.getElementById('#answerText').value, correctAnswer)) {
        document.getElementById('#answerText').reset();
        addScore(activeGame.points, playerScore);
            if (req.session.myTurn) {
                req.session.myTurn = false;
            }
            else {
                req.session.myTurn = true;
            }
    }
    else{
        alert('Answer is incorrect');
        subtractScore(activeGame.points, playerScore)
    }
    updateGame();
};

// Function to get the selected question from the database to populate on the page
const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
    cardID = event.target.id;
    console.log(cardID);
    let questionNumber = 0;
    let questionValue = 0;
    switch(cardID){
        case 'r1c1':
            questionNumber = 0;
            questionValue = 200;
        break
        case 'r2c1':
            questionNumber = 1;
            questionValue = 400;
        break
        case 'r3c1':
            questionNumber = 2;
            questionValue = 600;
        break
        case 'r4c1':
            questionNumber = 3;
            questionValue = 800;
        break
        case 'r1c2':
            questionNumber = 4;
            questionValue = 200;
        break
        case 'r2c2':
            questionNumber = 5;
            questionValue = 400;
        break
        case 'r3c2':
            questionNumber = 6;
            questionValue = 600;
        break
        case 'r4c2':
            questionNumber = 7;
            questionValue = 800;
        break
        case 'r1c3':
            questionNumber = 8;
            questionValue = 200;
        break
        case 'r2c3':
            questionNumber = 9;
            questionValue = 400;
        break
        case 'r3c3':
            questionNumber = 10;
            questionValue = 600;
        break
        case 'r4c3':
            questionNumber = 11;
            questionValue = 800;
        break
        case 'r1c4':
            questionNumber = 12;
            questionValue = 200;
        break
        case 'r2c4':
            questionNumber = 13;
            questionValue = 400;
        break
        case 'r3c4':
            questionNumber = 14;
            questionValue = 600;
        break
        case 'r4c4':
            questionNumber = 15;
            questionValue = 800;
        break
        case 'r1c5':
            questionNumber = 16;
            quesitonValue = 200;
        break
        case 'r2c5':
            questionNumber = 17;
            questionValue = 400;
        break
        case 'r3c5':
            questionNumber = 18;
            questionValue = 600;
        break
        case 'r4c5':
            questionNumber = 19;
            questionValue = 800;
        break
    };
    getGame();
    const getGameStateDataResp = await fetch(`/api/gameStates/${activeGame.game_id}`, {
        method: 'GET',
        body: ({question_id})
    });
    const getGameStateData = await getGameStateDataResp.json();
    const questionTextResp = await fetch(`/api/questions/${getGameStateData[questionNumber]}`, {
        method: 'GET',
    });
    const questionText = await questionTextResp.json()
    console.log(questionText.question);

    const questionBox = document.getElementById('#question-text');
    questionBox.textContent.replace(questionText.question);

    document.getElementById('#submit-button').addEventListener('submit', submitAnswer(questionText.answer, questionValue));

    console.log('clicked');
    console.log(questionNumber);
};

    // Show results
    //req.session.save(() => {
        //req.session.myTurn = true;
    //})
    //if (myTurn) {
       // window.alert('Pick a question!');
        // handle button presses from the game view
        //curTurn = true
        // if it's not your turn, the buttons should not be clickable
        // setup the button clicks for the questions
        // rows correspond to equal values
        // columns correspond to a single category
        // use the value and category to retrieve the corresponding question text from the database
        //if (curTurn) {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 5; j++) {
                    document.querySelector(`#r${i}c${j}`).addEventListener('click', questionClickHandler);
                };
            };
        //};
    //};


    
//TODO:alter question box once chosen

        // remove div once clicked????
    //can take out for loop from if stmt to run on load
    
// var style = document.createElement('style');
//     style.innerHTML =
//             '.question {' +
//             'color: black;' +
//             '}';

//  var ref = document.querySelector('script');            