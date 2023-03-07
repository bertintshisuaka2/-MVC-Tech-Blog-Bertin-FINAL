//all the different imports needed for the project
const path = require('path');
const express = require('express');
//to handle any session-required 
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');

//to call in the 
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//setting up the server and port number
const app = express();
const PORT = process.env.PORT || 3001;

//connecting to the helper functions for the handlebars; formatting the date
const hbs = exphbs.create({ helpers });


//to create and store the sessions 
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//setting the specific view engine that is used in this project
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//helping for using the response data
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//setting up the routes; route here is localhost:3001
app.use(routes);

//connecting the SQL database to the server, and then running the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
