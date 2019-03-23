const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AccountModel = require('./models/account');
const session = require('express-session');

//connect to db 
mongoose.connect('mongodb://localhost:27017/login_test', {useNewUrlParser: true}, function(error){
    if(error){
        console.log(error);
        console.log('mongodb go wrong');
    }else{
        console.log("mongodb ready to run!");
    }
})

app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/register', function(req,res){
    res.sendFile(__dirname + '/public/html/register.html');
});

app.post('/login', async function(req,res){
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    // read data
    accountValid = await AccountModel.findOne({username: username}).exec();
    if(accountValid){
        if(accountValid.password == password){
            // _id là id trong mongo
            req.session.authUser = {
                id: accountValid._id,
                username: accountValid.username,
            };
            req.session.save();
            console.log(req.session.authUser);
            // log out destroy
            // req.session.destroy();
            // console.log(req.session);
            res.json({
                success: true,
                message:'login successful',
            });
        }else{
            res.json({
                message: 'password wrong'
            })
        }
    }else{
        res.json({
            message: 'username not found'
        })
    }

    
    
});

app.post('/createAccount', async function(req,res){
    // await async giải quyết bất đồng bộ trong quá trình đọc db
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    // create new data
    newUser = await AccountModel.create({username: username, password: password});
    res.json({
        success: true,
    })
});

// await AccountModel.findOneAndUpdate({_id: voteID}, {username: new_username, password: new_password}, {new: true, useFindAndModify: false});
// await AccountModel.findByIdAndDelete({_id= accountID})


app.listen( 9999, function(error){
    if(error){
        console.log(error);
    }else{
        console.log("server start successful");
    }
});