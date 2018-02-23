angular.module('MainModule').controller('MainController', ['$scope', '$http', function ($scope, $http) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get("/admin/list")
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data);
                $scope.userAccounts = response.data.data;
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.assign = function (pidmParam, userParam) {
        $http.post(
            "../js/ajax/php/assignUser.php", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).success(function (data) {
            $scope.getProspects();
        });
    };

    //This was the first function I wrote that interfaced with the database. It just grabs a title databas
    $scope.getTitle = function () {
        $http.get("../js/ajax/php/getTitle.php")
            .then(function (response) {
                $scope.title = response.data;
                $scope.title = $scope.title[0].TestTextData;
            });
    };

    $scope.getUsers = function () {
        $http({

            method: 'GET',
            url: '../js/ajax/php/getUserAccounts.php'

        }).then(function (response) {
            console.log(response);
            // on success
            $scope.users = response.data;

        }, function (response) {
            console.log(response);
            // on error
            console.log(response.data, response.status);

        });
    };

    // $scope.getUsers = function () {
    //     $http.get("../js/ajax/php/getUserAccounts.php")
    //         .then(function (response) {
    //             console.log(response);

    //             $scope.users = response.data;
    //         });
    // };

    $scope.getProspects = function () {
        $http.get("/admin/list")
            .then(function (response) {
                // console.log(response);
                $scope.prospects = response.data;
            });
    };

    $scope.setPage = function (page) {
        $scope.activePage = "/build/" + page;
    };


    //******************************************* THE FOLLOWING ARE EXAMPLES FROM LAB 8 FOR IN TEXT REFERENCE *******************************************

    $scope.plusOne = function (id, likes, dislikes) {
        //Increment the likes value
        $scope.likes = Number(likes) + 1;
        $http.post(
            "ajax/updateLikesDislikes.php", {
                'id': id,
                'likes': $scope.likes,
                'dislikes': dislikes
            }
        ).success(function (data) {
            //reset likes property back to 0
            $scope.likes = 0;
            //This will refresh the page by 
            //calling the show_data function, 
            //which displays all books.
            $scope.show_data();
        });
    };


    //Retrieves all books from database and displays
    $scope.show_data = function () {
        $http.get("ajax/getBooks.php")
            .then(function (response) {
                $scope.products = response.data;
            });
    };



    $scope.minusOne = function (id, likes, dislikes) {
        //Increment the likes value
        $scope.dislikes = Number(dislikes) + 1;
        $http.post(
            "ajax/updateLikesDislikes.php", {
                'id': id,
                'likes': likes,
                'dislikes': $scope.dislikes
            }
        ).success(function (data) {
            //reset likes property back to 0
            $scope.dislikes = 0;
            //This will refresh the page by 
            //calling the show_data function, 
            //which displays all books.
            $scope.show_data();
        });
    };

    //******************************************* END LAB 8 EXAMPLES *******************************************

}]);

