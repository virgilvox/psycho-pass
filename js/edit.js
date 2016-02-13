
var app = angular.module('MyApp',['ngMaterial','schemaForm']);

app.controller('AppCtrl', function($scope, $http) {

  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
    if (query[i] === "")
    continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  var username = GET.username;
  var password = GET.password;

      //var body = "username=" + username + "&password=" + password;
      var body = {"username": username, "password": password};
      var req = {
        method: 'POST',
        url: 'http://fracture.cc:8072/login-user',
        headers: {'Content-Type': 'application/json'},
        data: body
      };

      $http(req).then(function successCallback(response) {
        if(response.data.psychopass != null || response.data.psychopass != undefined || response.data.psychopass != {}){
          $scope.model = response.data.psychopass;
        }else{
          $scope.model = {
            profileImg: 'img/profile.png',
            firstName: 'Test',
            lastName: 'Test',
            group: 'PT',
            mentalColor: 'navy',
            mentalColorName: 'NAVY',
            mainNumber: 86.3,
            mainCf: 7,
            secondColor: 'ready',
            secondColorName: 'RED',
            secondNumber: 75.2,
            secondCf: 4,
            thirdColor: 'yellow',
            thirdColorName: 'YELLOW',
            thirdNumber: 72.3,
            thirdCf: 2
          };
  }
        console.log($scope.model);
      }, function errorCallback(response) {
        console.log('err', response);
      });

  $scope.schema = {
    type: "object",
    properties: {
      profileImg: {
        type: "string"
      },
      firstName: {
        type: "string"
      },
      lastName: {
        type: "string"
      },
      group: {
        type: "string"
      },
      mentalColor: {
        type: "string"
      },
      mentalColorName: {
        type: "string"
      },
      mainNumber: {
        type: "number"
      },
      mainCf: {
        type: "number"
      },
      secondColor: {
        type: "string"
      },
      secondColorName: {
        type: "string"
      },
      secondNumber: {
        type: "number"
      },
      secondCf: {
        type: "number"
      },
      thirdColor: {
        type: "string"
      },
      thirdColorName: {
        type: "string"
      },
      thirdNumber: {
        type: "number"
      },
      thirdCf: {
        type: "number"
      }
    }};

    $scope.form = ["*"];

    $scope.view = function(){
      window.location = "./profile.html?user=" + username;
    };

    $scope.save = function(){
      console.log($scope.model);
      $scope.modelString = JSON.stringify($scope.model);
      //var body = "username=" + username + "&password=" + password + "&resume=" + $scope.modelString;
      var body = {"username": username, "password": password, "psychopass": $scope.model};
      var req = {
        method: 'POST',
        url: 'http://fracture.cc:8072/update',
        headers: {'Content-Type': 'application/json'},
        data: body
      };

      $http(req).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log('err', response);
      });
    };


  });
