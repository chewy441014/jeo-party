// Append questions to each value box in the page
// add buzzer function to listen for the first users input with a "buzzedIn" boolean in the cookie
// add button click functionality to populate each question into the given field
// add logic to check answers that are given by the users
//      add a message telling the user whether their score was correct or incorrect

//const { Game } = require("../../models");

// add logic to update scores based on a correct/incorrect answer
const socket = io("http://localhost:3001");
//let {Game} = require('../../models')

let activeGame;
let answer;
let questionValue;
const players = [];



//Function to update the database with the local object
const updateGame = async function (activeGame) {
    const updateGameData = await fetch(`/api/games/${activeGame.user_id}`, {
        method: 'PUT',
        body: JSON.stringify(activeGame),
    })
};

const onLoad = async function () {
    const response = await fetch('/api/users', {
        method: 'GET'
    });
    const userdata = await response.json();
    socket.emit('player joining', `${userdata[0]}`) //on load emit 'username joined game'
    socket.on('player joined', (data) => {
        console.log('Both players present, begin game.')
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 5; j++) {
            document.querySelector(`#r${i}c${j}`).addEventListener('click', questionClickHandler);
        };
    };
        // make player 1 buttons clickable
        players.push(userdata[0]);
        players.push(data);
        socket.emit('send users', players);
    });
    socket.on('send users', (data) => {
        if (players.length !== data.length) {
            players.push(...data)
}
    })
}

// Function to pull down game data into a local object in the scripts
const getGame = async function (questionNumber) {

    const userResp = await fetch('/api/users', {
        method: 'GET',
    });
    const userId = await userResp.json();;
    console.log(userId);
    const getGameDataResp  = await fetch(`/api/games/activeGame/${userId[1]}`, {
        method: 'GET',
    });
    console.log(getGameDataResp);
    const getGameData = await getGameDataResp.json();
    console.log(getGameData[0].game_id);

    const getGameStateDataResp = await fetch(`/api/gameStates/activeGame/${getGameData[0].game_id}`, {
        method: 'GET',
    });
    const getGameStateData = await getGameStateDataResp.json();
    console.log(getGameStateDataResp);
    const questionTextResp = await fetch(`/api/questions/${getGameStateData[questionNumber].question_id}`, {
        method: 'GET',
    });
    const questionText = await questionTextResp.json()
    console.log(questionText.question);
    answer = questionText.answer;
    console.log(answer);

    document.getElementById('question-text').innerHTML = questionText.question;
    const userAnswer = document.getElementById('answerText').value;
    // Some logic to wait for the user to answer the question and hit the button, inside submitAsnwer is where we will switch turns
    if (!(userAnswer === "")){
        document.getElementById('submit-button').addEventListener('click', submitAnswer(userAnswer, getGameData[0].points, answer, questionValue));
        console.log(userAnswer);
    };
    return activeGame = { user_id: userId[1], points: getGameData[0].points, game_id: getGameData[0].game_id };
    

};
 

function addScore(value, currentScore){
    currentScore = value + currentScore;
    return currentScore;
};

function subtractScore(value, currentScore){
    currentScore = currentScore - value;
    return currentScore;
};

function checkAnswer(answerInput, correctAnswer){
    let answerBoolean = false;
    if (answerInput === correctAnswer) {
        answerBoolean = true;
    }
    return answerBoolean;
};

function submitAnswer(userAnswer, points, correctAnswer, playerScore) {
    // Need API route to get correct answer
    if (checkAnswer(userAnswer, correctAnswer)) {
        document.getElementById('answerText').reset();
        addScore(points, playerScore);
        if (req.session.myTurn) {
            req.session.myTurn = false;
        }
        else {
            req.session.myTurn = true;
        }
    }
    else {
        alert('Answer is incorrect');
        subtractScore(points, playerScore)
    }
    updateGame(points);
};

// Function to get the selected question from the database to populate on the page
const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
    cardID = event.target.id;
    console.log(cardID);
    event.currentTarget.style.backgroundColor= "black";
    // event.target.style.display= "none";
    let questionNumber = 0;
    switch (cardID) {
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
    getGame(questionNumber, questionValue);

    console.log('clicked');
    console.log(questionNumber);
};

onLoad();
