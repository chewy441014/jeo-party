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
const players = [];

//From TutorialRepublic
function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return decodeURIComponent(cookieArr);
};

//Function to update the database with the local object
const updateGame = async function (activeGame) {
    const updateGameData = await fetch(`/api/games/${getCookie("userId")}`, {
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
const getGame = async function (questionNumber, questionValue) {

    const userResp = await fetch('/api/users', {
        method: 'GET',
    });
    const userId = await userResp.json();;
    console.log(userId);
    const getGameDataResp  = await fetch(`/api/games/activeGame/${userId[1]}`, {
        method: 'GET',
    });
    const getGameData = await getGameDataResp.json();
    console.log(getGameData);

    const getGameStateDataResp = await fetch(`/api/gameStates/${getGameData.game_id}`, {
        method: 'GET',
    });
    const getGameStateData = await getGameStateDataResp.json();
    const questionTextResp = await fetch(`/api/questions/${getGameStateData[questionNumber].question_id}`, {
        method: 'GET',
    });
    const questionText = await questionTextResp.json()
    console.log(questionText.question);

    const questionBox = document.getElementById('#question-text');
    questionBox.textContent.replace(questionText.question);

    document.getElementById('#submit-button').addEventListener('submit', submitAnswer(activeGame, questionText.answer, questionValue));
    return activeGame = { user_id: getGameData.user_id, points: getGameData.points, game_id: getGameData.game_id };

};


const checkAnswer = (answerInput, correctAnswer) => {
    let answerBoolean = false;
    if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
        answerBoolean = true;
    }
    return answerBoolean;
};

const submitAnswer = async function (activeGame, correctAnswer, playerScore) {
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
    else {
        alert('Answer is incorrect');
        subtractScore(activeGame.points, playerScore)
    }
    updateGame(activeGame);
};

// Function to get the selected question from the database to populate on the page
const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
    cardID = event.target.id;
    console.log(cardID);
    let questionNumber = 0;
    let questionValue = 0;
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
