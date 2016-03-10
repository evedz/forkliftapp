var forkApp = angular.module('forkApp', []);

forkApp.factory('carsFactory', function ($rootScope, $http) {
    return {
        getCars: function () {
            return $http.get('/api/cars').then (function successCallback(response) {
                $rootScope.cars = response.data.rows;
                toastr.success('New data has been fetched successfully!');
            }, function errorCallback(response) {
                toastr.error('Error happened. Visit console for details.');
                console.error(response);
            });
        }
    }
});

forkApp.controller('tableCtrl', ['$scope', '$rootScope', '$http', 'carsFactory', function ($scope, $rootScope, $http, carsFactory) {

    carsFactory.getCars();

    $scope.postCar = function (car) {
        $http({
            method: 'POST',
            url: '/api/cars/',
            data: {
                name: car.name,
                capacity: car.capacity
            }
        }).then(function successCallback(response) {
            toastr.info("Posted '" + response.data[0] + "' with capacity " + response.data[1]);
            carsFactory.getCars();
        }, function errorCallback(response) {
            toastr.error(response);
        });
    };

    $scope.deleteCar = function (whichCar) {
        $http({
            method: 'DELETE',
            url: '/api/cars/' + whichCar
        }).then(function successCallback(response) {
            toastr.warning('deleted ' + response.config.url);
            carsFactory.getCars();
        }, function errorCallback(response) {
            toastr.error(response);
        });
    };

    $scope.setItemInfo = function (id, name, capacity) {

        $scope.editCar = {};

        $scope.editCar.id = id;
        $scope.editCar.name = name;
        $scope.editCar.capacity = capacity;

        $scope.updateCar = function () {

            $http({
                method: 'PUT',
                url: '/api/cars/' + $scope.editCar.id,
                data: {
                    name: $scope.editCar.name,
                    capacity: $scope.editCar.capacity
                }
            }).then(function successCallback(response) {
                $('#js-edit-modal').modal('hide');
                toastr.success('SUCCESS');
                carsFactory.getCars();
            }, function errorCallback(response) {
                console.error('Something went wrong...');
            });

        };
    };
}]);
