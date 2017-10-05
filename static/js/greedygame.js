var app = angular.module("greedyadreq", ['720kb.datepicker']); 

app.factory('getAdService', function($http) {
    var getAdService = {
        fetch: function(fromDate,toDate) {
            var promise = $http.get("http://104s.197.128.152/data/adrequests?from="+fromDate+"&to="+toDate).then(function (response) {
                return response;
            },function(error){
                return error;
            });
            return promise;
        }
    };
    return getAdService;
});

app.controller("adRequests", ["$scope","$http","getAdService" ,function($scope,$http,getAdService) {
    $scope.toggleView = true;
$scope.invalid = false;
    $scope.fetchData = function(){
        if(new Date($scope.fromDate) <= new Date($scope.toDate))
        {
            getAdService.fetch($scope.fromDate,$scope.toDate).then(function(response) {
                if(response.status == 200){
                    $scope.invalid = false;
                    $scope.gameData = response.data.data; 
                    $scope.validation = "";
                }else if(response.status == -1){
                    $scope.invalid = true;
                    $scope.gameData = ""; 
                    $scope.validation = "Something went wrong while fetching the data. Please try after sometime.";
                }
            });
        }else{
            $scope.invalid = true;
            $scope.validation = "From Date should be greater that To Date";
        }

    }
}]);
