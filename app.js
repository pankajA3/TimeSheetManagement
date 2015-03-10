/**
 * Created by a3logics on 5/3/15.
 */

var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');

var app=(express());

// configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// use middleware
 app.use(bodyParser());
 app.use(express.static(path.join(__dirname,"bootstrapComponent")));

//define route

app.use(require('./router'));



app.listen(8000,function(){


    console.log("server strated");

});





