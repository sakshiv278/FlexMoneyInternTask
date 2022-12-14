const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const DB = "mongodb+srv://sakshee:saksheev@cluster0.hzacknf.mongodb.net/formdata?retryWrites=true&w=majority"
const hostname = 'localhost';
const port = process.env.PORT||3001;
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
//db connection

mongoose.connect(DB, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/user', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var batch = req.body.batch;
    var Schema = mongoose.Schema;
    var formSchema = new Schema({
        name: String,
        email: String,
        age: Number,
        batch: String
    });
    let User
    try {
        User = mongoose.model('User');
    } catch (error) {
        User = mongoose.model('User', formSchema, 'users');
    }
    var User1 = new User({
        name: name,
        email: email,
        age: age,
        batch: batch
    });

    User1.save(function (err, data) {
        if (err) {
            res.send({ status: 0, result: err });
        }
        else {
            res.send({ status: 1, result: data });
        }
    });

})
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
