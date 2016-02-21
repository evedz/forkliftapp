var forkApp = angular.module('forkApp', []);

angular.module('forkApp').controller('tableCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.model = $http({
        method: 'GET',
        url: '/api/cars'
    }).then(function successCallback(response) {
        $scope.cars = response.data.rows;
    }, function errorCallback(response) {
        console.log('error' + response);
    });
    $scope.deleteCar = function(whichCar) {
        $http({
            method: 'DELETE',
            url: '/api/cars/' + whichCar
        }).then(function successCallback(response) {
            window.location=location;
        }, function errorCallback(response) {
            console.error('Something went wrong...');
        });
    };
    $scope.updateCar = function(whichCar) {
        $http({
            method: 'POST',
            url: '/api/cars/update/' + whichCar
        });
    };
    $scope.itemInfo = function(id,name,capacity){
        $('#editCarName').val(name);
        $('#editCarCapacity').val(capacity);
        $('#editSaveChanges').attr({"ng-click": "updateCar("+id+")"});
        $('#js-editSubmitId').attr({"action": "api/cars/update/"+id});
    };
}]);