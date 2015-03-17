/**
 * Created by a3logics on 13/3/15.
 */

userTimeSheet.service('service1', ['$http',function($http){
    var serviceObj = {};
    serviceObj.getindexpage=function(){

        $http.get('/')
            .success(function(data) {

                console.log("i m in get service : ", data);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    return serviceObj;
}]);


userTimeSheet.service('service2', ['$http',function($http){
    var serviceObj = {};

    serviceObj.getUsers = function getUsers(){

        return $http.get('/api/users').success(function(data) {

            return data; // clear the form so our user is ready to enter another
        })
            .error(function(error) {
                console.log('Error: ', error);
            });
    }

    return serviceObj;
}]);

userTimeSheet.service('service3', ['$http',function($http){
    var serviceObj = {};

    serviceObj.createTimeSheet = function createTimeSheet(timesheet){
       alert("in service"+timesheet.date) ;
        return $http.post('/api/timesheetInsert',timesheet).success(function(data) {

            return data;


        })
            .error(function(error) {
                console.log('Error: ', error);
            });

    };



    return serviceObj;
}]);


userTimeSheet.service('service4', ['$http',function($http){
    var serviceObj = {};

    serviceObj.deleteUsers = function getUsers(formData){

        return $http.delete('/api/users/' + id).success(function(data) {

            return data;
        })
            .error(function(error) {
                console.log('Error: ', error);
            });
    }

    return serviceObj;
}]);



userTimeSheet.service('service5', ['$http',function($http){
    var serviceObj = {};

    serviceObj.getUserWithId = function getUsers(userId){
     alert("service5="+userId);
        return $http.get('/api/users/' + userId).success(function(data) {

            return data;
        })
            .error(function(error) {
                console.log('Error: ', error);
            });
    }

    return serviceObj;
}]);

userTimeSheet.service('service6', ['$http',function($http){
    var serviceObj = {};

    serviceObj.deleteTimesheetEntry = function getUsers(timesheetId,userId){
        alert("service6="+timesheetId);
        alert("service6="+userId);

        return $http.delete('/api/users/'+userId +'/'+ timesheetId).success(function(data) {

            return data;
        })
            .error(function(error) {
                console.log('Error: ', error);
            });
    }

    return serviceObj;
}]);















