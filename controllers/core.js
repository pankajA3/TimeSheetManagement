/**
 * Created by a3logics on 13/3/15.
 */
// public/core.js

var userTimeSheet = angular.module('userTimeSheet', []);


userTimeSheet.controller('mainController',['$scope','service1','service2','service3','service4','service5','service6','service7','service8',function($scope,service1,service2,service3,service4,service5,service6,service7,service8){
    $scope.date = '19/03/2013';
    //get call for index.html
    service1.getindexpage();
    $scope.formData={};
    $scope.editFormData={};
    /*console.log( $scope.formData );*/

    service2.getUsers().then(function (response){
        //console.log("user :::", response);
        $scope.users = response.data;
        $scope.userModel = $scope.users; //Initializing the user dropdown with the first user in the array.
        }, function(error) {
        console.log("error :::", error);
    });



    $scope.createTodo = function(){

   //creating timesheet obj
        //$scope.formData={};
        var timesheet={};
        timesheet.date=$scope.formData.Date;
        timesheet.task=$scope.formData.task;
        timesheet.subTask=$scope.formData.subTask;
        timesheet.assignedBy=$scope.formData.assignedBy;
        timesheet.effortHour=$scope.formData.effortHour;
        timesheet.startDate=$scope.formData.startDate;
        timesheet.endDate=$scope.formData.endDate;
        timesheet.userId=$scope.userModel._id
        if(timesheet.userId === undefined){
            alert("Please choose a user");
            return;
        } else if(timesheet.date === undefined || timesheet.startDate === undefined || timesheet.endDate === undefined){
            alert("Please insert date");
            return;
        }






        service3.createTimeSheet(timesheet).then(function(response){
            $scope.timesheetRes = response.data;
            $scope.formData={};
        });


    };

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

    };


    $scope.editTimeSheetEntry=function(timesheet,userId){


        $scope.editFormData.Date=timesheet.Date;
        $scope.editFormData.task=timesheet.ProjectName;
        $scope.editFormData.subTask=timesheet.Feature;
        $scope.editFormData.assignedBy=timesheet.Assigned_By;
        $scope.editFormData.effortHour=timesheet.Effort;
        $scope.editFormData.startDate=timesheet.Start_Date;
        $scope.editFormData.endDate=timesheet.End_Date;
        $scope.editTimesheetId=timesheet._id;

    };



    $scope.updateTimeSheetEntry=function(editTimeSheetId){
        var timesheet={};
        timesheet.date=$scope.editFormData.Date;
        timesheet.task=$scope.editFormData.task;
        timesheet.subTask=$scope.editFormData.subTask;
        timesheet.assignedBy=$scope.editFormData.assignedBy;
        timesheet.effortHour=$scope.editFormData.effortHour;
        timesheet.startDate=$scope.editFormData.startDate;
        timesheet.endDate=$scope.editFormData.endDate;
        timesheet.userId=$scope.userModel._id;
        timesheet.timesheetId=editTimeSheetId;


        if(timesheet.userId === undefined){
            alert("Please choose a user");
            return;
        } else if(timesheet.date === undefined || timesheet.startDate === undefined || timesheet.endDate === undefined){
            alert("Please insert date");
            return;
        }


        service7.updateTimesheetEntry(timesheet).then(function (response){
            $scope.timesheetRes = response.data;
            $('#myModal').modal('toggle');
        }, function(error) {
            console.log("error :::", error);
        });

    };

    $scope.resetForm = function resetFormData(){
        $scope.formData = "";
    }

    $scope.exportTimeSheet=function exportTimeSheet(user_Id){

        if(user_Id===undefined){

            alert("please Select User");
        }else {
            service8.expotTimesheet(user_Id).then(function (response){
               // $scope.timesheetRes = response.data;
                $scope.fileDownload=response;

                $('#fileDownloadDiv').html(response.data);
               $('#fileDownloadModal').modal('toggle');
                console.log(response);


            }, function(error) {
                console.log("error :::", error);
            });


                        }
    }

}]);


userTimeSheet.directive('datepicker1', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $('#datePickerTextBox').datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});
userTimeSheet.directive('datepicker2', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $('#startdatePickerTextBox').datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

userTimeSheet.directive('datepicker3', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $('#enddatePickerTextBox').datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

userTimeSheet.directive('datepicker4', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $('#editDatePickerTextBox').datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});
userTimeSheet.directive('datepicker5', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $('#editStartdatePickerTextBox').datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

userTimeSheet.directive('datepicker6', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $('#editEnddatePickerTextBox').datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});







