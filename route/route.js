/**
 * Created by a3logics on 9/3/15.
 */

var express =require('express');
var timesheetModule=require('../model/timeSheet');
var router=express.Router();
var Db=require('mongodb').Db,
    Connection=require('mongodb').Connection,
    Server=require('mongodb').Server
var ObjectId = require("mongodb").ObjectID;
var host='localhost';
var port=Connection.DEFAULT_PORT;

var db= new Db('TimeSheetManagement_dbNew1',new Server(host,port,{auto_reconnect:true,poolSize:20}),{w:1});;

// application -------------------------------------------------------------
router.get('/', function(req, res) {
    console.log("in /");
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

router.get('/index', function(req, res) {
    console.log("in /index");

    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// api ---------------------------------------------------------------------
// get all users
router.get('/api/users', function(req, res) {
    console.log("in app users");
    // use mongoose to get all users in the database

    db.collection("users",function(err,col){
        if(err){

            callback(true);
            return;

        }else
        {

            col.find().toArray(function(err,users){
                 console.log(users);
                res.json(users);
            });

        }



    });

});

// create timesheet and send back all timesheet Data for Particuler users after creation
router.post('/api/timesheetInsert', function(req, res) {
    console.log("in post");
     console.log("date data="+req.body.date);

    var timesheet=timesheetModule.create_timesheet(req.body.date,req.body.task,req.body.subTask,req.body.assignedBy,req.body.effortHour,req.body.startDate,req.body.endDate,req.body.userId);


    db.collection("TimesheetData",function(err,col){
        if(err){

            callback(true);
            return;

        }else
        {

            col.insert(timesheet,function(err,timesheet){
                   console.log(timesheet);
                    if(err){
                        callback(true);
                        return;
                    }else
                    {
                        col.find({userId:req.body.userId}).toArray(function(err,TimesheetData){
                            console.log(TimesheetData);
                            res.json(TimesheetData);
                        });

                    }


            });

        }


    });




});

router.get('/api/users/:user_id', function(req, res) {
    // get and return all the timesheet Data after you select user another

     db.collection("TimesheetData", function (err, col) {
        if (err) {

            callback(true);
            return;

        } else {
             col.find({userId:req.params.user_id}).toArray(function (err, TimesheetData) {
                        console.log("FindData="+TimesheetData.toString());
                        res.json(TimesheetData);
                    });
        }
    });
});

// delete a timesheetData

router.delete('/api/users/:userId/:timesheetId', function(req, res) {


    db.collection("TimesheetData", function (err, col) {
        if (err) {

            callback(true);
            return;

        } else {
            col.remove({_id:ObjectId(req.params.timesheetId)},function (err, TimesheetData) {
               if(err){
                   callback(true);
                   return;
               }else {
                   col.find({userId: req.params.userId}).toArray(function (err, TimesheetData) {
                       console.log("FindData=" + TimesheetData.toString());
                       res.json(TimesheetData);
                   });
               }
            });
        }
    });



});



module.exports=router;