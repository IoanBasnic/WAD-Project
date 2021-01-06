const express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , glob = require( 'glob' );


//var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var language_dict = {};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;



//Create connection



const session = require('express-session');
const mysql      = require('mysql');
let bodyParser=require("body-parser");
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'testsql'
});

connection.connect();

global.db = connection;


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.set('view engine', 'view');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))

// development only

app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
//app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/logout', user.logout);//call for logout
app.post('/logout', user.logout);//call for logout


app.get('/buyproduct', user.logout);//call for delete product
app.get('/addproduct', user.addproduct);
//app.post('/addproduct', user.addproduct);


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const multer = require('multer')
const parse = require("url").parse;
const {getUser} = require("./routes/user");

let getNameFile;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        if (path.extname(file.originalname) != 'png') {
            getNameFile = file.originalname;
            cb(null, path.basename(file.originalname, '.png') + path.extname(file.originalname));
        }
        else
        {
            getNameFile = file.originalname;
            cb(null, path.basename(file.originalname, '.jpg') + path.extname(file.originalname));
        }

    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/addproduct', upload.single('img'), (req, res, next) => {
    try {

        message = '';
        if(req.method == "POST"){
            var post = req.body;
           // var img  = getNameFile;
            var name= post.pname;
            var desc= post.desc;
            var price= post.price;
            var user_name = req.session.user_name;
            var category = post.category;

            console.log(post);
            // var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
            var sql ="INSERT INTO `products`(`img`,`pname`, `desc`, `price`, `user`, `category`) VALUES ('" + getNameFile + "','" + name + "','" + desc + "','" + price + "','" + user_name + "','" + category + "')";
            var query = db.query(sql, function(err, result) {

                message = "Your product has been addded to the website!";
                console.log(sql);

               // var sql2 ="INSERT INTO `product_categories`(`category`) VALUES ('"+category+ "')";

              //  var query1 = db.query(sql2, function(err, result) {


              //  });
                res.redirect('/market.html');
            });

        } else {
            //res.render('/');
            res.redirect('/market.html');
        }
    } catch (error) {
        console.error(error);
    }
});


app.get('/functions.js', function(req, res, next) {

    res.writeHead(200, {"Content-Type": "text/javascript"});
    fs.createReadStream("./functions.js").pipe(res);
});


app.get('/uploads/', function(req, res, next) {

    res.writeHead(200, {"Content-Type": "image"});
    //fs.createReadStream(".\\uploads\\").pipe(res);
});

app.get('/products', function(req, res, next) {



    res.statusCode == 200;
    res.setHeader('Content-Type', 'application/json');


    var sql='SELECT * FROM products';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
      //  console.log(data);
      //  res.render('/public/market.html', { contacts: result });
        var product = JSON.stringify(data);
        res.end(product);
    });
});

app.get('/getCurrentUser', function(req, res, next) {



    res.statusCode == 200;
    res.setHeader('Content-Type', 'application/json');


        var product = JSON.stringify(req.session);
        res.end(product);
});

app.get('/getCategories', function(req, res, next) {



    res.statusCode == 200;
    res.setHeader('Content-Type', 'application/json');
    var sql='SELECT * FROM product_categories';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        //  console.log(data);
        //  res.render('/public/market.html', { contacts: result });
        var categories = JSON.stringify(data);
        res.end(categories);
    });
});

app.post('/AdminAddCategory', function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){

        var post  = req.body;
        var name= post.category;

        var sql ="INSERT INTO `product_categories`(`category`) VALUES ('"+name+ "')";
        db.query(sql, function(err, results){


            res.redirect('/market.html');


        });
    }
});

app.post('/AdminDeleteCategory', function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){

        var post  = req.body;
        var name= post.category;


        var sql ="DELETE FROM `product_categories` WHERE `category`='"+name+"' ";
        db.query(sql, function(err, results){


            res.redirect('/market.html');


        });
    }
});

app.post('/AdminEditCategory', function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){

        var post  = req.body;
        var name= post.category;
        var name_new= post.category_new;
        //var sql ="INSERT INTO `product_categories`(`category`) VALUES ('"+name+ "')";

        var sql ="DELETE FROM `product_categories` WHERE `category`='"+name+"' ";
        db.query(sql, function(err, results){

            var sql2 ="INSERT INTO `product_categories`(`category`) VALUES ('"+name_new+ "')";
            db.query(sql2, function(err, results){

            });
            res.redirect('/market.html');


        });
    }
});
app.post('/delete', function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){
        var post  = req.body;
        var name= post.uname;
        var pass= post.psw;

        var p = JSON.stringify(req.body);
        var getID = p.replace(/\D/g, "");

        //   var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";
       var sql ="DELETE FROM `products` WHERE `id`='"+getID+"' ";
        db.query(sql, function(err, results){


                res.redirect('/market.html');


        });
    } else {
        //res.render('index.html',{message: message});
        res.redirect('/market.html');
    }

});


app.post('/buyproduct', function(req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.uname;
        var pass = post.psw;

        var p = JSON.stringify(req.body);
        var getID = p.replace(/\D/g, "");

        console.log(getID + "------------" + p);
        //   var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";
        var sql = "DELETE FROM `products` WHERE `id`='" + getID + "' ";

        db.query(sql, function (err, results) {


            res.redirect('/market.html');


        });
    } else {
        //res.render('index.html',{message: message});
        res.redirect('/market.html');
    }
});

app.post('/editproduct', upload.single('img'), (req, res, next) => {
    try {

        message = '';
        if(req.method == "POST"){
            var post = req.body;
             var img  = getNameFile;
            var name= post.pname;
            var desc= post.desc;
            var price= post.price;
            var user_name = req.session.user_name;
            var user_category = post.category;
            var getID = "";


            console.log( JSON.stringify(req.body));
            Object.entries(post).forEach(
                ([key, value]) =>  { if(value == "") getID = key; }




            );


            // var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
           // var sql ='UPDATE `products` SET `img`="' + getNameFile + '",pname="' + name + '", desc="' + desc + '",price="' + price + '",user="' + req.session.user_name + '" WHERE user="'+  req.session.user_name +'"';
            var sql ="DELETE FROM `products` WHERE `id`='"+getID+"' ";

            var query = db.query(sql, function(err, result) {

                message = "Your product has been addded to the website!";

                sql ="INSERT INTO `products`(`img`,`pname`, `desc`, `price`, `user`, `category`) VALUES ('" + getNameFile + "','" + name + "','" + desc + "','" + price + "','" + req.session.user_name +  "','" + user_category +"')";


                query = db.query(sql, function(err, result) {});

                    console.log(sql);
                var sql2 ="INSERT INTO `product_categories`(`category`) VALUES ('"+user_category+ "')";

                var query1 = db.query(sql2, function(err, result) {


                });


                res.redirect('/market.html');
            });

        } else {
            //res.render('/');
            res.redirect('/market.html');
        }
    } catch (error) {
        console.error(error);
    }
});

glob.sync( './language/*.json' ).forEach( function( file ) {
    let dash = file.split("/");
    if(dash.length == 3) {
        let dot = dash[2].split(".");
        if(dot.length == 2) {
            let lang = dot[0];
            fs.readFile(file, function(err, data) {
                language_dict[lang] = JSON.parse(data.toString());
            });
        }
    }
});


app.use(function (req, res) {
    var q = parse(req.url, true);
    var lang = 'en';
    let dash = q.pathname.split("/");
    if(dash.length >= 2) {
        let code = dash[1];
        if(code !== '' && language_dict.hasOwnProperty(code)) {
            lang = code;
        }
    }

    fs.readFile('public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        let data_string = data.toString()
        for (var key of Object.keys(language_dict[lang])) {
            let pattern = new RegExp("{{" + key + "}}", "g");
            data_string = data_string.replace(pattern, language_dict[lang][key]);
        }
        res.write(data_string);
        return res.end();
    });

    
});


app.get('/:category', function (req, res) {


});