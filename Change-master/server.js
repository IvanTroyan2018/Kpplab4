const express = require('express');


const cookieParser = require('cookie-parser');
const session = require('./middleware/session');
const flash = require('./middleware/flash');
const auth = require('./middleware/auth');
const user = require('./middleware/user');
const SuggestionController = require('./controllers/suggestion');
const MainController = require('./controllers/main');
const server = express();




server.set('view engine', 'pug');

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(session);


//cookies
server.use(user);
//flash
server.use(flash);
//Вход
server.get('/', MainController.showMain);
//Дані Входу
server.post('/', MainController.login);
//block
server.use(auth);



// Показать список
server.get('/suggestions', SuggestionController.showSuggestions);
//Создать предложеник
server.post('/suggestions', SuggestionController.createSuggestion);
//Покозать 1 предложеник
server.get('/suggestions/:id', SuggestionController.showSuggestion);
//Vote
server.post('/suggestions/:id', SuggestionController.toggVote);


server.listen(3000, 'localhost', () => console.log('Server start on 3000'));
