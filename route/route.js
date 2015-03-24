/**
 * Created by a3logics on 9/3/15.
 */

var express =require('express');
var timesheetModule=require('../model/timeSheet');
var fs=require('fs');
var json2csv = require('json2csv');

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
    res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

router.get('/index', function(req, res) {
    console.log("in /index");

    res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
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
    console.log("in post Insert");
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

//update Time sheet Entry


router.post('/api/users/timesheetUpdate', function(req, res) {
    console.log("in post update");


   /* var timesheet=timesheetModule.create_timesheet(req.body.date,req.body.task,req.body.subTask,req.body.assignedBy,req.body.effortHour,req.body.startDate,req.body.endDate,req.body.userId);


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


    });*/



    db.collection("TimesheetData",function(err,col){
        if(err){

            callback(true);
            return;

        }else
        {

                 console.log("time sheet Id="+req.body.timesheetId);

                  col.update({_id:ObjectId(req.body.timesheetId)},{$set: {Date:req.body.date,ProjectName:req.body.task,Feature:req.body.subTask,Assigned_By:req.body.assignedBy,Effort:req.body.effortHour,Start_Date:req.body.startDate,End_Date:req.body.endDate}},function(err,TimesheetData){
                        console.log("update Time sheet="+TimesheetData);
                         if(err){

                            callback(true);
                            return;
                        }else
                        {
                            col.find({userId:req.body.userId}).toArray(function (err, TimesheetData) {
                                console.log("FindData=" + TimesheetData.toString());
                                res.json(TimesheetData);
                            });

                        }



                    });;




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
            col.find({userId:req.params.user_id}).toArray(function (err, TimesheetData) {
                console.log("FindData="+TimesheetData.toString());
                res.json(TimesheetData);
            });
        }
    });



});


router.get('/api/users/timesheetexport/:user_id', function(req, res) {

    var ws = fs.createWriteStream('sample.csv');
    var file;
    db.collection("TimesheetData", function (err, col) {
        if (err) {

            callback(true);
            return;

        } else {

                   col.find({userId: req.params.user_id}).toArray(function (err, TimesheetData) {

                       if(err){

                           callback(true);
                           return;
                       }else {


                           console.log("FindData=" + TimesheetData.toString());
                           json2csv({data: TimesheetData, fields: ['Date','ProjectName','Feature','Assigned_By','Effort','Start_Date','End_Date']}, function(err, csv) {
                               if (err) console.log(err);
                               fs.writeFile( __dirname+'/'+req.params.user_id+'.csv', csv, function(err) {
                                   if (err) throw err;
                                   console.log('file saved');


                               });
                           });
                         console.log( __dirname+'/'+req.params.user_id+'.csv');

                           res.send('<ul>'
                           + "<li>Download <a href=/file/"+req.params.user_id+">Click here To download file</a>.</li>"

                           + '</ul>');


                           /*res.download( __dirname+'/file.csv','file.csv',function(err){
                               if (err) {
                                   console.log("file  get error");

                                   // Handle error, but keep in mind the response may be partially-sent
                                   // so check res.headersSent
                               } else {
                                   console.log("file get");
                                   // decrement a download credit, etc.
                               }
                           });
*/

                       }

                     });
               }
    });



});


router.get('/file/:user_id', function(req, res) {
  console.log("in file csv");
    console.log(req.params.user_id+'.csv');
    var path = __dirname +'/'  + req.params.user_id+'.csv';

    res.download(path);


});


module.exports=router;