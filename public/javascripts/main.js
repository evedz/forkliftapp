var forkApp = angular.module('forkApp', []).run(['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.getData = (function getData(){
        $http({
            method: 'GET',
            url: '/api/cars'
        }).then(function successCallback(response) {
            $rootScope.cars = response.data.rows;
        }, function errorCallback(response) {
            console.log('error' + response);
        });
    })();
}]);

angular.module('forkApp').controller('tableCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.postCar = function (car) {
        $http({
            method: 'POST',
            url: '/api/cars/',
            data: {
                name: car.name,
                capacity: car.capacity
            }
        }).then(function successCallback(response) {
            $scope.updated = response.config.data;
            $rootScope.cars = $rootScope.cars.concat($scope.updated);
        }, function errorCallback(response) {
            console.error('Something went wrong...');
        });
    };
    $scope.deleteCar = function (whichCar) {
        $http({
            method: 'DELETE',
            url: '/api/cars/' + whichCar
        }).then(function successCallback(response) {
            window.location = location;
        }, function errorCallback(response) {
            console.error('Something went wrong...');
        });
    };
    $scope.updateCar = function (whichCar) {
        $http({
            method: 'POST',
            url: '/api/cars/update/' + whichCar
        });
    };
    $scope.itemInfo = function (id, name, capacity) {
        $('#editCarName').val(name);
        $('#editCarCapacity').val(capacity);
        $('#editSaveChanges').attr({"ng-click": "updateCar(" + id + ")"});
        $('#js-editSubmitId').attr({"action": "api/cars/update/" + id});
    };
}]);