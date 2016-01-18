/** App Module **/
var ticketmod = angular.module('ticketApp',['ngRoute', 'ticketingControllers','LocalStorageModule']);

var login = angular.module('login',[]);

var registration = angular.module('registration',['ui.bootstrap']);

/* Local storage Config */

ticketmod.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('ticketmodule');
});

/* Routing */
ticketmod.config(['$routeProvider' ,function($routeProvider)
{
	$routeProvider.when('/login',{
		templateUrl: 'views/login.html',
        controller: 'loginCtrl'
	})
	.when('/register',
        {	
        	templateUrl: 'views/registration.html',
            controller: 'registerCtrl',
           
        })
    .when('/viewregister',
        {
            templateUrl: 'views/viewdetails.html',
            controller: 'regdetailCtrl',
        })
    .otherwise(
    	{ redirectTo: '/',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl' 
        });
}]);


/* menu directive */
ticketmod.directive("registerTab", function() {
    return {
      restrict: "E",
      templateUrl: "menu.html",
        };
  });

/* directive for Date Formatte change */
registration.directive('datepickerPopup',function(dateFilter,$parse){
  return{
    restrict:'EAC',
    require:'?ngModel',
    link:function(scope,element,attrs,ngModel,ctrl){
      ngModel.$parsers.push(function(viewValue){
        return dateFilter(viewValue,'dd-MM-yyyy');
      });
    }
  }
});
