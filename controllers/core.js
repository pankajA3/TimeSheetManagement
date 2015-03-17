/**
 * Created by a3logics on 13/3/15.
 */
// public/core.js

var userTimeSheet = angular.module('userTimeSheet', []);

userTimeSheet.controller('mainController',['$scope','service1','service2','service3','service4','service5','service6',function($scope,service1,service2,service3,service4,service5,service6){

    //get call for index.html
    service1.getindexpage();


    /*console.log( $scope.formData );*/

    service2.getUsers().then(function (response){
        //console.log("user :::", response);
        $scope.users = response.data;
        $scope.userModel = $scope.users[0]; //Initializing the user dropdown with the first user in the array.
        }, function(error) {
        console.log("error :::", error);
    });



    $scope.createTodo = function(){

   //creating timesheet obj
        //$scope.formData={};
        alert($scope.formData.Date);
        var timesheet={};
        timesheet.date=$scope.formData.Date;
        timesheet.task=$scope.formData.task;
        timesheet.subTask=$scope.formData.subTask;
        timesheet.assignedBy=$scope.formData.assignedBy;
        timesheet.effortHour=$scope.formData.effortHour;
        timesheet.startDate=$scope.formData.startDate;
        timesheet.endDate=$scope.formData.endDate;
        timesheet.userId=$scope.userModel._id


         service3.createTimeSheet(timesheet).then(function(response){
            $scope.timesheetRes = response.data;

        });




    }



    $scope.switchUser = function switchUser(userId){

        service5.getUserWithId(userId).then(function (response){
            $scope.timesheetRes = response.data;


        }, function(error) {

            console.log("error :::", error);

        });
    };


    $scope.deleteTimeSheetEntry=function(timesheetId,userId){

        service6.deleteTimesheetEntry(timesheetId,userId).then(function (response){
            $scope.timesheetRes = response.data;

          }, function(error) {
            console.log("error :::", error);
        });

    }

}]);





