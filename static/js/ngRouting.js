var app = angular.module('routingModule',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl : '/views/polls'
  })
  .when('/auth/login', {
     templateUrl : '/views/login',
     controller : 'authController'
  })
  .when('/auth/signup', {
    templateUrl : '/views/signup',
    controller : 'authController'
  })
  .when('/poll/:poll', {
    templateUrl : '/views/poll',
    controller : 'pollsController'

  });

  // $locationProvider.html5Mode(true);
});

// app.controller('test', function($scope,$location){
//   $scope.redirect = function(path){
//     $location.path(path);
//   };
// });
// )
