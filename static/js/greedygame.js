var app = angular.module("greedyadreq", ['720kb.datepicker']); 
app.controller("adRequests", ["$scope","$http" ,function($scope,$http) {
    $http.get("http://104.197.128.152/data/adrequests?from=2017-06-10&to=2017-09-13")
    .then(function(response) {
        $scope.products = response.data;
    });
}]);