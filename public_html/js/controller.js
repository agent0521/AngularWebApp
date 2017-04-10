var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'login.html'})
			.when('/dashboard', {
				resolve: {
					"check" : function($location, $rootScope){
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
		
		if(name == 'idev' && pass == 'password'){
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

app.controller('calculatorCTRL', function($scope) {
    $scope.output = "0";
    $scope.currentIndex = 0;
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
                $scope.output = "Syntax Error";
            }
            $scope.currentIndex = $scope.output.length + 1;
        } 
		else {
            tmp = true;
        }
        return tmp;
    }
	
	$scope.press = function(num) {
        if($scope.checkInput(num)) {
            if(angular.equals(num, 'x')){
                $scope.output = $scope.output.slice(0 , $scope.output.length - 1);    
            } 
			else {
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
        } 
		else {
            if(angular.equals(num, 'x')){
                $scope.msg = "";
                $scope.output = $scope.output.slice(0 , $scope.output.length - 1);    
            }
        }
    }
	
    $scope.operate = function(op) {
        if($scope.checkInput(op)) {
            $scope.output = $scope.output + op;
        }
    }
    
    $scope.equal = function() {
        var endIsOperator = "+|-|*|/".indexOf($scope.output.charAt($scope.output.length - 1));
        if(endIsOperator >= 0) {
            $scope.output = "Syntax Error";
        } else if(eval($scope.output) == 0){
            $scope.output = "0";
        } else {
            $scope.msg = "";
            $scope.result = eval($scope.output);
            $scope.output = $scope.result;
        }
    }
	
	$scope.logout = function () {
		window.location = '/AngularWebApp/index.html';
	};

});
