
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl:'login.html'})
	.when('/dashboard', {resolve: {"check" : function($location, $rootScope){
				if(!$rootScope.loggedIn) {
					$location.path('/');
				} 
			}
		},
		templateUrl: 'dashboard.html'
	})
	.otherwise({ redirectTo: '/'});
});

app.controller('loginController', function($scope, $location, $rootScope){
	$scope.submit = function(){
		var name = $scope.username;  //$rootscope
		var pass = $scope.password;
		
		if(name =='idev' && pass == 'password'){
			$rootScope.loggedIn = true;
			$location.path('/dashboard');
		} 
		else if(name == null || pass == null) 
		{
			alert('Username or password cannot be blank.');	
		}
		else
		{
			alert('Invalid username and password. Please try again!');
		}
	};
});

app.controller('CalCtrl', function($scope) {
    $scope.output = "0";
    $scope.curIndex = 0;
    $scope.result = 0;
    
    $scope.checkInput = function(num) {
        var tmp = true;
        if($scope.result != 0) {
            $scope.result = 0;
            $scope.output = "0";
            tmp = true;
        }
        if(angular.equals('+', num) || 
            angular.equals('-', num) ||
            angular.equals('*', num) || 
            angular.equals('/', num)) {
            var index = "+|-|*|/".indexOf($scope.output.charAt($scope.output.length - 1));
            if(index >= 0) {
                tmp = false;
                $scope.msg = "You only can do 1 formula per 1 time.";
            }
            $scope.curIndex = $scope.output.length + 1;
        } else {
            tmp = true;
            if($scope.output.substring($scope.curIndex).length < 10) {
                if(angular.equals(num, ".")) {
                    var k = 0;
                    for(var j = 0; j < $scope.output.substring($scope.curIndex).length; j++){
                        if(angular.equals(".", $scope.output.substring($scope.curIndex).charAt(j))) {
                            k = k + 1;
                        }
                    }
                    if(k >= 1){
                        $scope.msg = "You can't add '.' 2 times per series of numbers!";
                        tmp = false;
                    }
                } else {
                    tmp = true;
                }
            } else {
                $scope.msg = "You can't input more than 10 number per series of numbers!";
                tmp = false;
            }
        }
        return tmp;
    }
    
    $scope.operate = function(op) {
        if($scope.checkInput(op)) {
            $scope.output = $scope.output + op;
        }
    }
    
    
    $scope.press = function(num) {
        if($scope.checkInput(num)) {
            if(angular.equals(num, 'x')){
                $scope.output = $scope.output.slice(0 , $scope.output.length - 1);    
            } else {
                if (angular.equals($scope.output, "0")) {
                    $scope.output = "";
                    $scope.msg = "";
                    $scope.output += num;
                } else if (angular.equals(".", $scope.output)){
                    $scope.msg = "";
                    $scope.output = "0.";
                    $scope.output += num;
                } else {
                    $scope.msg = "";
                    $scope.output += num;
                }
            }
        } else {
            if(angular.equals(num, 'x')){
                $scope.msg = "";
                $scope.output = $scope.output.slice(0 , $scope.output.length - 1);    
            }
        }
    }
    
    $scope.equal = function() {
        var isOpEnd = "+|-|*|/".indexOf($scope.output.charAt($scope.output.length - 1));
        if(isOpEnd >= 0) {
            $scope.msg = "You must complete the formula first!";
        } else if(eval($scope.output) == 0){
            $scope.output = "0";
        } else {
            $scope.msg = "";
            $scope.result = eval($scope.output);
            $scope.output = $scope.result;
        }
    }
});
