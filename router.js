/**
 * Created by a3logics on 9/3/15.
 */

var express =require('express');

var router=express.Router();




router.get("/",function(rea,res){

    //res.write("This is fromm express");
    //res.end();

    res.render('index');

});
router.post('/add',function(req,res){

    res.redirect("/");
});

module.exports=router;
