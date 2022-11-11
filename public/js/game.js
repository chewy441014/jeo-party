
const socket = io("https://jeo-party-parody.herokuapp.com/");

let answer;
let questionValue;
const players = [];
let turn = 0;
let playerTurn = true;
let player1score = 0;
let player2score = 0;
let turnNumber = 0;




const onLoad = async function () {
    const response = await fetch('/api/users', {
        method: 'GET'
    });
    const userdata = await response.json();
    socket.emit('player joining', `${userdata[0]}`) //on load emit 'username joined game'
    socket.on('player joined', (data) => {
        console.log('Both players present, begin game.')
        // make player 1 buttons clickable
        players.push(userdata[0]);
        players.push(data);
        socket.emit('send users', players);
        // function to start the game for player 1
        renderCategories();
        setupAllButtons();
        alert(`It's your turn, pick a question`);
    });
    socket.on('send users', (data) => {
        if (players.length !== data.length) {
            players.push(...data)
        }
    });
    socket.on('turn start', (data) => {
        alert(`It's your turn, pick a question`);
        getAllQuestions();
        document.querySelector('#submit-button').addEventListener('click', submitAnswer);

    })
}

const getAllQuestions = async function () {
    const getQuestions = await fetch(`/api/gameStates/activeGame/${(document.location.pathname).split('/')[2]}`, {
        method: 'GET',
    });
    const getQuestionsResp = await getQuestions.json();
    getQuestionsResp.forEach(element => {
        if (element.was_answered) {
            document.querySelector(`#q${element.id % 20}`).style.backgroundColor = 'black';
        }
        else {
            document.querySelector(`#q${element.id % 20}`).addEventListener('click', questionClickHandler);
        }
    });
}

const setupAllButtons = async function () {
    for (var i = 0; i < 20; i++) {

        document.querySelector(`#q${i}`).addEventListener('click', questionClickHandler);
    };
    document.querySelector('#submit-button').addEventListener('click', submitAnswer);
}

const removeAllButtons = async function () {
    for (var i = 0; i < 20; i++) {
        document.querySelector(`#q${i}`).removeEventListener('click', questionClickHandler);
    };
    document.querySelector('#submit-button').removeEventListener('click', submitAnswer);
}

const renderCategories = async function () {
    console.log('Render categories to do. ')
}

// Function to pull down game data into a local object in the scripts
const getGame = async function (questionNumber) {
    // update gamestate was_answered for question Number
    const userResp = await fetch('/api/users', {
        method: 'GET',
    });
    const userId = await userResp.json();
    const getGameDataResp = await fetch(`/api/games/activeGame/${userId[1]}`, {
        method: 'GET',
    });
    const getGameData = await getGameDataResp.json();

    const getGameStateDataResp = await fetch(`/api/gameStates/activeGame/${getGameData[0].game_id}`, {
        method: 'GET',
    });
    const getGameStateData = await getGameStateDataResp.json();
    const questionTextResp = await fetch(`/api/questions/${getGameStateData[questionNumber].question_id}`, {
        method: 'GET',
        where: {
            was_answered: false,
        }
    });
    const questionText = await questionTextResp.json()
    answer = questionText.answer;
    getGameStateData[questionNumber].was_answered = true;
    const updateQuestionAnswered = await fetch(`/api/gameStates/${getGameStateData[questionNumber].id}`, {
        method: 'PUT',
        body: JSON.stringify(getGameStateData[questionNumber]),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(updateQuestionAnswered)

    document.getElementById('question-text').innerHTML = questionText.question;
    return;
};


function addScore(value, currentScore) {
    currentScore = value + currentScore;
    return currentScore;
};

function subtractScore(value, currentScore) {
    currentScore = currentScore - value;
    return currentScore;
};

function checkAnswer(answerInput, correctAnswer) {
    let answerBoolean = false;
    if (answerInput === correctAnswer) {
        answerBoolean = true;
    }
    return answerBoolean;
};

const submitAnswer = async function(event) {
    
    if (checkAnswer(document.getElementById('answerText').value, answer)) {
        turnNumber++;
        document.getElementById('answerText').value = "";
        //addScore(points, playerScore);
        if (playerTurn) {
            player1score = addScore(player1score, questionValue);
            document.getElementById('p1score').innerHTML = player1score;
            playerTurn = false;

        }
        else {
            player2score = addScore(player2score, questionValue)
            document.getElementById('p2score').innerHTML = player2score;
            playerTurn = true;
        }
    }
    else {
        alert('Answer is incorrect');
        if (playerTurn) {
            player1score = subtractScore(player1score, questionValue);
            document.getElementById('p1score').innerHTML = player1score;
            playerTurn = false;
        }
        else {
            player2score = subtractScore(player2score, questionValue)
            document.getElementById('p2score').innerHTML = player2score;
            playerTurn = true;
        }
        //ends the game
        if(turnNumber === 20){
            alert('GameOver!');
        }
    }
    // update turn with socket.io
    socket.emit('turn end', turn);
    removeAllButtons();
    // remove all event listeners
};

// Function to get the selected question from the database to populate on the page
const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
    cardID = event.target.getAttribute("id");
    console.log(cardID);
    event.currentTarget.style.backgroundColor = "black";
    let questionNumber;
    switch (cardID) {
        case 'q0':
            questionNumber = 0;
            questionValue = 200;
            break
        case 'q1':
            questionNumber = 1;
            questionValue = 400;
            break
        case 'q2':
            questionNumber = 2;
            questionValue = 600;
            break
        case 'q3':
            questionNumber = 3;
            questionValue = 800;
            break
        case 'q4':
            questionNumber = 4;
            questionValue = 200;
            break
        case 'q5':
            questionNumber = 5;
            questionValue = 400;
            break
        case 'q6':
            questionNumber = 6;
            questionValue = 600;
            break
        case 'q7':
            questionNumber = 7;
            questionValue = 800;
            break
        case 'q8':
            questionNumber = 8;
            questionValue = 200;
            break
        case 'q9':
            questionNumber = 9;
            questionValue = 400;
            break
        case 'q10':
            questionNumber = 10;
            questionValue = 600;
            break
        case 'q11':
            questionNumber = 11;
            questionValue = 800;
            break
        case 'q12':
            questionNumber = 12;
            questionValue = 200;
            break
        case 'q13':
            questionNumber = 13;
            questionValue = 400;
            break
        case 'q14':
            questionNumber = 14;
            questionValue = 600;
            break
        case 'q15':
            questionNumber = 15;
            questionValue = 800;
            break
        case 'q16':
            questionNumber = 16;
            quesitonValue = 200;
            break
        case 'q17':
            questionNumber = 17;
            questionValue = 400;
            break
        case 'q18':
            questionNumber = 18;
            questionValue = 600;
            break
        case 'q19':
            questionNumber = 19;
            questionValue = 800;
            break
    };
    getGame(questionNumber, questionValue);

};

onLoad();
