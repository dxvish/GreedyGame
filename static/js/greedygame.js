//Dependencies : Datepicker 
var app = angular.module("greedyadreq", ['720kb.datepicker']); 
//Service for fetching the API Data
app.factory('getAdService', function($http) {
    var getAdService = {
        fetch: function(fromDate,toDate) {
//            service returns a promise
            var promise = $http.get("http://104.197.128.152/data/adrequests?from="+fromDate+"&to="+toDate).then(function (response) {
                return response;
            },function(error){
                return error;
            });
            return promise;
        }
    };
    return getAdService;
});
//controller that handles the user requests
app.controller("adRequests", ["$scope","$http","getAdService" ,function($scope,$http,getAdService) {
$scope.toggleView = true;//Toggle between different views
$scope.invalid = false;//Validation Flag
    //Method is called when user request for data
    $scope.fetchData = function(){
//        validating if the entered From Date is less than To Date
        if(new Date($scope.fromDate) < new Date($scope.toDate))
        {
//            call the services fetchmethod with the from and to date
            getAdService.fetch($scope.fromDate,$scope.toDate).then(function(response) {
//                checking the status of the requests response
                if(response.status == 200){
//                    setting the validation flag to false 
                    $scope.invalid = false;
//                    Setting the ADrequest data
                    $scope.gameData = response.data.data; 
                    //Validation message
                    $scope.validation = "";
                    //Plotting graph for the requested data
                    trend_plot($scope.gameData);
                }else if(response.status == -1){
                    $scope.invalid = true;//If request fails, invalid flag is enabled
                    $scope.gameData = ""; //Data is reset
                    //Validation message to be displayed
                    $scope.validation = "Something went wrong while fetching the data. Please try after sometime.";
                }
            });
        }else{
            //Called when To date is less than From date
            $scope.invalid = true;//Setting the invalid flag and validation message
            $scope.validation = "From Date should be greater that To Date";
        }

    }
}]);
