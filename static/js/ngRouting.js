var app = angular.module('routingModule',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl : '/views/polls',
    controller : 'pollsController'
  })
  .when('/poll', {
    templateUrl : '/views/poll',
    controller : 'pollsController'
  })
  .when('/auth/signup', {
    templateUrl : '/views/signup',
    controller : 'authController'
  })
  .when('/auth/login', {
     templateUrl : '/views/login',
     controller : 'authController'
  });
  // $locationProvider.html5Mode(true);
});

// app.controller('test', function($scope,$location){
//   $scope.redirect = function(path){
//     $location.path(path);
//   };
// });
// )
