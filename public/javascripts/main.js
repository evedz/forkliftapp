var forkApp = angular.module('forkApp', []);

angular.module('forkApp').controller('tableCtrl', ['$scope', '$http', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/cars'
    }).then(function successCallback(response) {
        $scope.cars = response.data.rows;
    }, function errorCallback(response) {
        console.log('error' + response);
    });
}]);
