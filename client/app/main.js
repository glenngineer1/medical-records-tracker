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
    $scope.registers = []
    $scope.sendRegister = () => {
      const register = {
        name: {
          first: $scope.first,
          middle: $scope.middle,
          last: $scope.last,
        },
        dob: $scope.dob,
        gender: $scope.gender,
        weight: $scope.weight,
        height: {
          foot: $scope.foot,
          inches: $scope.inches,
        },
        bp: {
          systolic: $scope.systolic,
          diastolic: $scope.diastolic,
        },
        bloodType: $scope.bloodType,
        medicalAllergies: $scope.medicalAllergies,
        currentMedications: $scope.currentMedications,
        currentIllnesses: $scope.currentIllnesses,
        previousIllnesses: $scope.previousIllnesses,
        familyHistory: $scope.familyHistory,
        registrationDate: $scope.registrationDate,
        pharmacy: {
          name: $scope.name,
          address: $scope.address,
          pharmacyPhone: $scope.pharmacyPhone,
        },
        email: $scope.email,
        password: $scope.password,
        phone: $scope.phone,
      }

      $http
        .post('/api/registers', register)
        .then(() => $scope.registers.push(register))
        .catch(console.error)
    }

    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('NewVisitCtrl', function ($scope, $http) {
    $scope.visits = []
    $scope.sendNewVisit = () => {
      const visit = {
        physicianName: $scope.physicianName,
        type: $scope.type,
        contactInfo: {
          phone: $scope.phone,
          address: $scope.address,
          email: $scope.email,
        },
        weight: $scope.weight,
        height: {
          foot: $scope.foot,
          inches: $scope.inches,
        },
        bp: {
          systolic: $scope.systolic,
          diastolic: $scope.diastolic,
        },
        reasonForVisit: $scope.reasonForVisit,
        date: $scope.date,
        diagnosis: $scope.diagnosis,
        solution: $scope.solution,
        followUp: $scope.followUp,
        bloodwork: $scope.bloodwork,
        medicationsPrescribed: $scope.medicationsPrescribed,
        sideEffects: $scope.sideEffects,
        allergies: $scope.allergies,
        afterCare: $scope.afterCare,
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
  .controller('PreviousVisitCtrl', function ($scope, $http, $routeParams) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
    $http
      .get('/api/visits')
      .then(({ data: { visits }}) =>
        $scope.visits = visits
      )
  })
  .controller('IndividualVisitCtrl', function ($scope, $http, $routeParams) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
    $http
      .get('/api/visits')
      .then(({ data: { visits }}) =>
        $scope.visits = visits
      )
  })

