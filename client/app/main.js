'use strict'

angular
  .module('medicalRecordsTracker', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .when('/', {
        controller: 'SplashCtrl',
        templateUrl: 'partials/splash.html',
      })
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'partials/login.html',
      })
  )
  .controller('SplashCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('LoginCtrl', function ($scope) {})

