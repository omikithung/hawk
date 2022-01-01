
//MODULE DEPENDENCIES
const express = require('express')
  , routes = require('./routes') //or routes = require('./routes/index')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bodyParser=require("body-parser")
  , dns = require('dns')
  , os = require('os')
  , session = require('express-session')
  , db = require('./routes/dbconn')      //instantiates the dbconn module
  , MySQLStore = require('express-mysql-session')(session)
  , webSocket = require('ws');

var app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port);

dns.lookup(os.hostname(), (err, add, fam)=> {
  console.log(`Server Listening at: http://${add}:${port}`);
})
 
//middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'curiousTag')));
app.use(session({
  secret: 'ktwbuihffsts',
  resave: false,
  saveUninitialized: true,
  cookie: {  
    maxAge: 1000 * 60 * 60,   //maxAge = 60min * 60sec * 1000milisec = 60 * 1 * 1 = 60min  = 1hr
  },
  store: new MySQLStore( {
    host: 'localhost',
    user: 'root',
    password: 'kyongjoel1995',
    database: 'dragon',
  },db),
}));

app.get('/validUser/roomInfo', user.validRoomInfo);
app.post('/test', user.test);

app.get('/', routes.index); //call for main home page. by means of calling index object 
app.get('/signin', routes.signin);//call for login page
app.get('/signup', routes.signup);//call for signup page
app.get('/contributors', routes.contributors);
app.get('/signout',routes.signout);
app.post('/signin', routes.signin);//call for signin post
app.post('/signup', routes.signup);//call for signup post
app.get('/verifyE', routes.verifyE); //once email is verified,enter datails to db

app.get('/u', user.vhome);//call for verified user home page after login
app.get('/u/devices', user.devices);//call for devices page after login


const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
})
app.get('/profile', user.profileSetUp);
app.post('/profile', upload.single('image'), user.profile);
app.use(express.static(path.join(__dirname, 'uploads')));
app.get('/profileTest/:id', user.profileTest);
app.get('/roomInfo', user.test);

//WEBSOCKET SERVER
const websocket = new webSocket.Server({server});
websocket.on('connection', (ws)=> {
  console.log('websocket connected!');
  ws.on('message', (data)=> {
    websocket.clients.forEach(client => {
      if(client !== websocket && client.readyState === webSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on('close', ()=>{
    console.log('websocket disconnected!');
  }) 
});

//other than specified URL, it gives below result
app.get('*', function(req, res){  
  res.status(404).end('The specified URL is not found!');
});