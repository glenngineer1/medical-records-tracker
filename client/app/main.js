'use strict';

var app = angular.module('MedicalRecordsTrackerApp', ['ngRoute'])

app.config(function($routeProvider) {

  $routeProvider.
    when('/', {
      templateUrl: 'client/partials/main.html',
      controller: 'mainCtrl'
    })
    .when('/login', {
      templateUrl: 'client/partials/login.html',
      controller: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: 'client/partials/register.html',
      controller: 'registerCtrl'
    })
    .when('/welcome', {
      templateUrl: 'client/partials/welcome.html',
      controller: 'welcomeCtrl'
    })
    .when('/newVisit', {
      templateUrl: 'client/partials/newVisit.html',
      controller: 'newVisitCtrl'
    })
    .when('/previousVisit', {
      templateUrl: 'client/partials/previousVisit.html',
      controller: 'previousVisitCtrl'
    })
    .when('/individualVisit/:itemId', {
      templateUrl: 'client/partials/individualVisit.html',
      controller: 'individualCtrl'
    })
});
