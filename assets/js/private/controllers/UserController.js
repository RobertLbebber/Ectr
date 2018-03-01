angular.module('UserModule').controller('UserController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.getMe = function (callback) {
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
                    console.log("Error in User Controller #0000", response.data, response.status);
                }


                // This Could be a Vulnerablity Vul#001
                eval("var runnable = function(){ $scope." + callback + "; }; runnable()");
            }, function (response) {
                // on error
                $window.location.href = '/build/signin.html';
                console.log("Error in User Controller #0001", response.data, response.status);

            });
        }
    };

    $scope.getEmails = function (category) {
        console.log("This is in the getEmailDetails", category);
        if (!$scope.user) {
            console.log("Failed No Scope User", $scope.user);
            return;
        } else {
            $http({
                method: 'GET',
                url: '/User/getEmails',
                params: { email_category: category }
            }).then(function (response) {
                // on success
                $scope.email.activeEmails = response.data.emailDetail;
                $scope.email.activeEmail = response.data.emailDetail[0];
                console.log("This looks promising   ", $scope.email.activeEmails);
                if (!$scope.user) {
                    // $window.location.href = '/build/signin.html';
                    console.log("Error in User Controller #0002", response.data, response.status);
                }
            }, function (response) {
                // on error
                console.log("This looks promising   ", response);
                // $window.location.href = '/build/signin.html';
                console.log("Error in User Controller #0003", response.data, response.status);
            });
        }
    };

    $scope.getEmailDetails = function (email) {
        $scope.email.activeEmail = email;
    };

    $scope.emailReply = function () {
        $scope.email.showMessage = !$scope.email.showMessage;
        $scope.email.autofill = true;
    };

    $scope.initEmailPage = function () {
        $scope.email = new Object();
        $scope.email.showMessage = true;
        $scope.email.rightpanels = ["./email-message.html", "./compose.html"]

        $scope.email.activeCategory = "inbox";
        $scope.email.autofill = false;
        $scope.getEmails($scope.email.activeCategory);
    };

    $scope.setActiveCategory = function (category) {
        $scope.email.activeCategory = category;
        $scope.getEmails($scope.email.activeCategory);
    };

    $scope.showRightPanel = function () {
        if ($scope.email.showMessage) {
            return $scope.email.rightpanels[0];
        } else {
            return $scope.email.rightpanels[1];
        }
    }

    $scope.toggleRightPanel = function () {
        $scope.email.showMessage = !$scope.email.showMessage;
        if ($scope.email.autofill) {
            $scope.email.autofill = false
        };
    };

}]);


// for (var key in $scope.user.email.category) {
//     if ($scope.user.email.category[key].name === $scope.email.activeCategory) {
//         $scope.email.activeEmails = $scope.user.email.category[key].mail;
//     }
// }