
var app = angular.module('MyApp',['ngMaterial','schemaForm']);

app.controller('AppCtrl', function($scope,$http) {

  $scope.schema = {
    type: "object",
    properties: {
      username: {
        type: "string"
      },
      password: {
        type: "string"
      },
      email: {
        type: "string"
      }
    }};

    $scope.form = ["*"];

    $scope.model = {};

    $scope.register = function(){
      var body = "username=" + $scope.model.username + "&" + "password=" + $scope.model.password + "&" + "email=" + $scope.model.email;
      var req = {
        method: 'POST',
        url: 'http://fracture.cc:8072/create',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: body
      };

      $http(req).then(function successCallback(response) {
        console.log(response);
        $scope.modelString = response.data;
        window.location = "./login.html";
      }, function errorCallback(response) {
        console.log('err', response);
        $scope.modelString = response.data;
      });
    };
  });
