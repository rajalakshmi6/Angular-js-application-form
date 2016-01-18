/* Controllers */

 var ticketingControllers = angular.module('ticketingControllers', ['login','registration'
]);

/* Login Controller */

login.controller('loginCtrl', ['$scope','$location',function($scope,$location) { 
      $scope.loginval = false;
      $scope.usercreditials = [{username:'admin',password:'admin@123'}];
      $scope.submitlogin = function(login){
        if($scope.loginform.$valid) {
          angular.forEach($scope.usercreditials,function(user) {
            if(user.username === login.username) {
              if(user.password === login.password) {
                   $location.path("/register");
              } else {
                $scope.loginval = true;
              }
            } else {
               $scope.loginval = true;
            }
           // console.log(login.password+" "+user.password); 
          });
        }
      }
  }]);

/* Ticket Registration Controller */

registration.controller('registerCtrl', ['$scope','localStorageService','$location', function($scope,localStorageService,$location) {
    $scope.isActive = function(route) {
    return route === $location.path();
    }

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.clear = function () {
      $scope.register.traveldate = null;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];  


    $scope.submitregister = function (registerticket) {
      if(!$scope.createticket.$valid){
         $scope.submitted = true;
            //console.log($scope.createticket.$valid);
        }
        else {  

            $scope.formData  = [];
              $scope.formData = {
                  name: registerticket.name,
                  age: registerticket.age,
                  traveldate: registerticket.traveldate,
                  tickets: registerticket.tickets,
                  fromcity: registerticket.fromcity,
                  tocity: registerticket.tocity,
                  email: registerticket.email,
                  contact: registerticket.contact,
                  isvalidate : true,
              };
              localStorageService.set($scope.formData.name,$scope.formData);
              $location.path("/viewregister");
        }
    }
 
}]);  

/* Ticket Details View Controller */
registration.controller('regdetailCtrl', ['$scope','localStorageService','$location', function($scope,localStorageService,$location) {
    $scope.isActive = function(route) {
        return route === $location.path();
      }  
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.clear = function () {
      $scope.register.traveldate = null;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];  


    var keys = localStorageService.keys();
    //console.log(keys);
    var localysaved = '';
    $scope.tablevalues = [];
      angular.forEach(keys,function(key) {
      localysaved = localStorageService.get(key);
      $scope.tablevalues.push(localysaved); 
      
    });
}]);
