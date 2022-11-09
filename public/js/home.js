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
  const timePerTurn = document.querySelector('#turnTime').value;
  // make a call to create a game object in the api
  // to do post request needs to send back confirmation all went well to start game and validation for user inputs required. 
  let player1Score = 0;
  let player2Score = 0;
  const response = await fetch(`/api/questions/rand-cat/`, {
    method: 'GET',
  });
  if (response.ok) {
    const categories = await response.json();
    const quesArr = [];
    const quesResp1 = await fetch(`/api/questions/rand-quest/${categories[0].category}`, {
      method: 'GET',
    });
    const quesData1 = await quesResp1.json();
    quesArr.push(...quesData1);
    const quesResp2 = await fetch(`/api/questions/rand-quest/${categories[1].category}`, {
      method: 'GET',
    });
    const quesData2 = await quesResp2.json();
    quesArr.push(...quesData2);
    const quesResp3 = await fetch(`/api/questions/rand-quest/${categories[2].category}`, {
      method: 'GET',
    });
    const quesData3 = await quesResp3.json();
    quesArr.push(...quesData3);
    const quesResp4 = await fetch(`/api/questions/rand-quest/${categories[3].category}`, {
      method: 'GET',
    });
    const quesData4 = await quesResp4.json();
    quesArr.push(...quesData4);
    const quesResp5 = await fetch(`/api/questions/rand-quest/${categories[4].category}`, {
      method: 'GET',
    });
    const quesData5 = await quesResp5.json();
    quesArr.push(...quesData5);
    const quesIDs = quesArr.map((ques) => ({question_id: ques.id}))
    const gameStateResponse = await fetch('/api/gameStates/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quesIDs),
      //headers: { 'Content-Type': 'application/json' },
    });
    const newGame = await fetch('/api/games/', {
      method: 'POST',
    });
    //newGame.render('game');
  }else{
    alert('Failed to create game')
  }


  // if (response.ok) {
  //     res.status(200).render('game', newGame);
  // } else {
  //     alert(`Failed to create game`)
  // }
}

// select the button and create the event listener, which calls joinGameFn
document.querySelector('#joinGame').addEventListener('click', joinGameFn);
document.querySelector('#createGame').addEventListener('click', createGameFn);


