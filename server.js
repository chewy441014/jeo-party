const express = require('express');
const http = require('http');
const path = require('path');
const routes = require('./controllers');
const socketio = require('socket.io');

const sequelize = require('./config/connection');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const pubDirectPath = path.join(__dirname, './public');


const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(pubDirectPath));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('')

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});
