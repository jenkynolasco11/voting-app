var app = angular.module('authModule',[]);

app.run(function($rootScope, $http, $location, auth){
  $rootScope.authenticated = false;
  $rootScope.user = '';
  auth.isAuthenticated = false;
  auth.user = '';

  $rootScope.signout = function(){
    $http.get('/auth/signout').then(function(res){
      if(res.status == 200){
        $rootScope.authenticated = false;
        $rootScope.user = '';
        $location.path('/');
        auth.isAuthenticated = false;
        auth.user = '';
        // console.log(auth);
      }
    });
  };
  // TODO:
  // Fix this part.
  // Instead of making requests and telling that user is logged in,
  // Make the calls JUST to make sure the user is logged in,
  // But keep the authentication true in local storage
  $http.get('/auth/isauth').then(function(res){
    if(res.status === 200){
      // console.log(res);
      if(res.data.user){
        $rootScope.user = res.data.user;
        $rootScope.authenticated = true;
        auth.isAuthenticated = true;
        auth.user = $rootScope.user;
      }
    }
  });
});

app.controller('authController',function($scope, $rootScope, $location, $http, auth){
  $scope.user = {username: '', password:'', email:''};
  $scope.error_message = '';
  // $scope.error_message = 'Hello!';

  var loginIfSuccess = function(res){
    if(res.data.status == 'success'){
      $rootScope.authenticated = true;
      $rootScope.user = res.data.user;

      auth.isAuthenticated = true;
      auth.user = res.data.user;

      $location.path('/');
    } else {
      $scope.error_message = res.data.message;
    }
  };

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).then(loginIfSuccess);
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).then(loginIfSuccess);
  };
});
