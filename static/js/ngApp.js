var app = angular.module('voting-app', ['routingModule','authModule','pollsModule']);

app.service('auth', function(){
  return {
    isAuthenticated : false,
    user : '',
  };
});
