
const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const server = app.listen(3000,()=>{
  console.log("listening to port 3000");
})
const socket = require('socket.io');
const bodyParser = require('body-parser'); // Middleware
const User = require('./user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let user;
let present;


var items = [];

mongoose.connect('mongodb://localhost:27017/registration',{
  useNewUrlParser: true,useUnifiedTopology: true
})
.then(()=>{
  console.log("connection successful")
})
.catch(err =>{
  console.log("error connecting to db")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views','views')
app.use(express.json())

// Route to Homepage
app.get('/', (req, res) => {
  res.render('Homepage');
});
// Route to main page
app.get('/main',(req, res) => {
  res.render('main');
});
// Route to Login Page
app.get('/login', (req, res) => {
  res.render('login1');
});
// Route to signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/genderpage', (req, res)=>{
  res.render('genderpage',{user})
})
// Route to contact us page
app.get('/contactus',(req, res) => {
  res.render('contactus');
});
app.get('/ourteam',(req, res) => {
  res.render('ourteam');
});
app.post('/main',async (req, res) => {
  const {uid,eid,pwd,gwd,dwd,iid} = req.body;
  if(eid!="" && uid!="" && pwd!="" && gwd!="" && dwd!="" && iid){
     present = await User.findOne({eid});
    if(!present){
      const hash = await bcrypt.hash(pwd,12);
       user=new User({
        uid,eid,pwd:hash,gwd,dwd,iid
      })
      await user.save();
      res.redirect('/main')
    }else{
      res.send("ACCOUNT ALREADY EXISTS")
    }
  }
})
app.get('/onclicklogin',(req,res) => {
  res.render('genderpage');
});
app.get('/dob', (req,res) => {
  res.render('dob');
})

app.get('/interestpage',(req, res)=>{
  res.render('interestpage');
})
// app.post('/interestpage',async (req,res)=>{
//   const {iid}=req.body;
//   user = await User.updateOne({iid:iid});
//   await user.save();
//   res.redirect('/main');
// })
app.post('/login', async (req, res) => {
  const {eid,pwd}=req.body;
  // console.log(req.body);
  if(eid !="" && pwd !=""){
    user = await User.findOne({eid});
    // console.log(user);
      if(user){
        const valid = await bcrypt.compare(pwd,user.pwd);
        if(valid){
          //res.render('main',{user})
          res.render('chat');
        }
        else{
          res.send("wrong id or pwd")
        }
      }else{
        res.send('no account found')
      }
  }
});

app.get("/anime", function(req, res){
  res.render("anime_0");
});

app.get("/anime_1", function(req, res){
  res.render("anime_1");
});
app.get("/games", function(req, res){
  res.render("games");
});

app.get("/feedback", function(req, res){
  res.render("feedback");
});
const io = socket(server);
const users = {}


app.get("/list", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});


app.post("/list", function(req, res) {

  let item = req.body.newItem;

    items.push(item);
    console.log(items);
    res.redirect("/list");
});




io.on('connection', socket => {
  socket.on('new-user', name => {

    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})



//const port = 3000
//app.listen(port, () => console.log(`This app is listening on port ${port}`));
