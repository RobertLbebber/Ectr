angular.module('UserModule').controller('UserController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.getMe = function () {
        console.log($scope.user);
        if ($scope.user) {
            console.log("User in Session");
        } else {
            $http({

                method: 'GET',
                url: '/User/getMe'

            }).then(function (response) {
                // on success
                $scope.user = response.data.user;
                if (!$scope.user) {
                    $window.location.href = '/build/signin.html';
                    console.log("Error in User Controller #0001", response.data, response.status);
                }
                console.log($scope.user);

            }, function (response) {
                $window.location.href = '/build/signin.html';
                // on error
                console.log("Error in User Controller #0001", response.data, response.status);

            });
        }
    };

    $scope.emailHandlers = function () {

    };

}]);

