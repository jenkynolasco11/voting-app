var app = angular.module('pollsModule',[])

// app.run(function($rootScope){
//   $scope.authenticated = $rootScope.authenticated;
// });

app.controller('pollsController',function($scope, auth){
  $scope.authenticated = auth.isAuthenticated;
  // $scope.createPoll = function(){
  //
  // };
});
