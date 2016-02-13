
var app = angular.module('MyApp',['ngMaterial', 'nvd3']);

app.controller('AppCtrl', function($scope) {

  // initialize with at least something
  $scope.displayText = "Hello World";
  $scope.profileImg = "img/profile.png";

  $scope.psychoPass = psychoPass;

  $scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 280,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
        }
    }
};

$scope.data = [{
    key: "Cumulative Return",
    values: [
        { "label" : "A" , "value" : -29.765957771107 },
        { "label" : "B" , "value" : 0 },
        { "label" : "C" , "value" : 32.807804682612 },
        { "label" : "D" , "value" : 196.45946739256 },
        { "label" : "E" , "value" : 0.19434030906893 },
        { "label" : "F" , "value" : -98.079782601442 },
        { "label" : "G" , "value" : -13.925743130903 },
        { "label" : "H" , "value" : -5.1387322875705 }
    ]
}];


  var MESSAGE_SCHEMA = {
    "type": 'object',
    "properties": {
      "text": {
        "type": "string"
      }
    }
  };

  $scope.payload = function(data){
    $scope.displayText = data.payload.text;
    $scope.$apply()
  }

  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
    if (query[i] === "")
    continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  var conn = meshblu.createConnection({
    "uuid": GET.uuid,
    "token": GET.token
  });

  conn.on('ready', function(data){
    console.log('UUID AUTHENTICATED!');
    console.log(data);
    conn.update({
      "uuid": GET.uuid,
      "messageSchema": MESSAGE_SCHEMA
    });

    conn.on('message', function(data){
      $scope.payload(data);
    });

    $scope.sendMessage = function(){
      console.log('sending message!');
      var message = {
        "devices": "*",
        "payload": {
          "ngclickEvent": true
        }
      };
      conn.message(message);
    }


  });

});
