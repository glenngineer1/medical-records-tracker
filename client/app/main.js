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
      .when('/register', {
        controller: 'RegisterCtrl',
        templateUrl: 'partials/register.html',
      })
      .when('/welcome', {
        controller: 'WelcomeCtrl',
        templateUrl: 'partials/welcome.html',
      })
      .when('/newvisit', {
        controller: 'NewVisitCtrl',
        templateUrl: 'partials/newVisit.html',
      })
      .when('/previousvisit', {
        controller: 'PreviousVisitCtrl',
        templateUrl: 'partials/previousVisit.html',
      })
      .when('/individualvisit', {
        controller: 'IndividualVisitCtrl',
        templateUrl: 'partials/individualVisit.html',
      })
  )
  .controller('SplashCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('LoginCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('RegisterCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('WelcomeCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('NewVisitCtrl', function ($scope, $http) {
    $scope.sendNewVisit = () => {
      const visit = {
        doctorName: $scope.physicianName,
        type: $scope.type,
      }

      $http
        .post('/api/visits', visit)
        .then(() => $scope.visits.push(visit))
        .catch(console.error)
    }

    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('PreviousVisitCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('IndividualVisitCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })

