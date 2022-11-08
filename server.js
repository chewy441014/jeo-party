const express = require('express');
const http = require('http');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');
const exphbs = require('express-handlebars');
const socketio = require('socket.io');
const helpers = require('./utils/gameHelpers');

const sequelize = require('./config/connection');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const pubDirectPath = path.join(__dirname, './public');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    // dies after 24 hours
    maxAge: 24 * 60 * 60 * 1000,

  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(pubDirectPath));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

io.on('connection', (socket) => {

  socket.on('game_id', request => {
    const { game_id, username } = request;

    io.in(game_id).clients((error, clients) => {
      const numOfClients = clients.length;

      socket.emit('host', (numOfClients === 0));

      socket.join(game_id)

      io.sockets.in(game_id).emit('nPlayers', numOfClients + 1)
    });
  });
  socket.on("answerText", (data)=>{
    io.to(data.substring(0, 5)).emit("answerText", data.substring(5, data.length));
  });

    socket.on('buzzed', request => {
      const game_id = Object.keys(socket.game_ids)[1];

      // Emit to all sockets in room
      io.sockets.in(game_id).emit('buzzed', request);
    });
  });
  io.on('disconnect', function() {
    console.log('user disconnected');
  });


sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});
