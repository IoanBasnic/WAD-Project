//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
        var post  = req.body;
        var name= post.uname;
        var pass= post.psw;
        var fname= post.first_name;
        var lname= post.last_name;
        var mob= post.phone;

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

        var query = db.query(sql, function(err, result) {

            message = "Succesfully! Your account has been created.";
           // res.render('/');
            res.redirect('/index.html');
        });

    } else {
        //res.render('/');
        res.redirect('/index.html');
    }
};



//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){
        var post  = req.body;
        var name= post.uname;
        var pass= post.psw;

        var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";
        db.query(sql, function(err, results){
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user_name = results[0].user_name;
                console.log(results[0].user_name);


                res.redirect('/mainpage.html');
            }
            else{
                message = 'Wrong Credentials.';
               // res.render('index.html',{message: message});
                res.redirect('/index.html');
            }

        });
    } else {
        //res.render('index.html',{message: message});
        res.redirect('/index.html');
    }

};

//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
    req.session.destroy(function(err) {
        res.redirect("/index.html");
    })
};

//------------------------------------Add product functionality----------------------------------------------

var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');

exports.addproduct=function(req,res){
    /*
    message = '';
    if(req.method == "POST"){
        var post = req.body;
        var image  = post.img;
        var name= post.pname;
        var desc= post.desc;
        var price= post.price;

        getUser = 'abc';
       // var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
        var sql ="INSERT INTO `products`(`img`,`pname`, `desc`, `price`, `user`) VALUES ('" + image + "','" + name + "','" + desc + "','" + price + "','" + getUser + "')";
        var query = db.query(sql, function(err, result) {

            message = "Your product has been addded to the website!";
            console.alert(message);



            res.redirect('/market.html');
        });

    } else {
        //res.render('/');
        res.redirect('/market.html');
    } */
};
//------------------------------------Delete product functionality----------------------------------------------
exports.delete = function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){
        var post  = req.body;
        var name= post.uname;
        var pass= post.psw;

     //   var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";
        var sql ="DELETE FROM `products` WHERE user`='"+results[0].user_name+"' ";
        db.query(sql, function(err, results){
            if(results.length){

                res.redirect('/market.html');
            }
            else{

                res.redirect('/market.html');
            }

        });
    } else {
        //res.render('index.html',{message: message});
        res.redirect('/market.html');
    }

};
//------------------------------------Edit product functionality------------------------------------------------

//------------------------------------Buy product functionality-------------------------------------------------

exports.buyproduct = function(req, res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){
        var post  = req.body;
        var name= post.uname;
        var pass= post.psw;

        //   var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";
        var sql ="DELETE FROM `products` WHERE user`='"+results[0].user_name+"' ";
        db.query(sql, function(err, results){
            if(results.length){

                res.redirect('/market.html');
            }
            else{

                res.redirect('/market.html');
            }

        });
    } else {
        //res.render('index.html',{message: message});
        res.redirect('/market.html');
    }

};