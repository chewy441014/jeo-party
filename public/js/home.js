// if the user click the joinGame button, then send them to the game page as a player of that game
const joinGameFn = async function (event) {
    event.preventDefault();
    const gameID = document.querySelector('#gameId').value;
    // make a call to the api and then send the user to the url /game
    // to do get request looks for a game with ID and gets the game data and sends the user to the game view
    const response = await fetch();

    if (response.ok) {
        res.status(200).render('game');
    } else {
        alert(`Failed to join game with ID: ${gameID}`)
        res.status(400);
    }
}

const createGameFn = async function (event) {
    event.preventDefault();
    const timeBtwnTurns = document.querySelector('#longTime').value;
    const timePerTurn = document.querySelector('#turnTime').value;
    // make a call to create a game object in the api
    // to do post request needs to send back confirmation all went well to start game and validation for user inputs required. 
    const response = await fetch();

    if (response.ok) {
        res.status(200).render('game');
    } else {
        alert(`Failed to create game`)
    }
}

// select the button and create the event listener, which calls joinGameFn
document.querySelector('#joinGame').addEventListener('click', joinGameFn);
document.querySelector('#createGame').addEventListener('click', createGameFn);


