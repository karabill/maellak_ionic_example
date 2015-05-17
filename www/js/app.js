// Ionic Starter App

var module = angular.module('starter', ['ionic']);

module.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

module.controller("MyController",function($scope, $http, $timeout) {
  $scope.myMessage = {
    text : ""
  };
  $scope.messages = [];
  $scope.downloadMessages = function() {
    $http.get('http://chat-ioamaellak.rhcloud.com/getJson.php')
    .success(function(data, status, headers, config) {
        $scope.messages = data;
        $timeout($scope.downloadMessages, 0);
    }).error(function(data, status, headers, config) {
          $timeout($scope.downloadMessages, 0);
    });
  }
  $timeout($scope.downloadMessages, 0);
  $scope.sendMessage = function() {
    $http.get('http://chat-ioamaellak.rhcloud.com/insert.php?msg=' +
    $scope.myMessage.text)
    .success(function(data, status, headers, config) {
        $scope.myMessage.text = "";
    }).error(function(data, status, headers, config) {
    });
  }
});
