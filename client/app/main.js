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
      .when('/previousvisit/:id', {
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
  .controller('LoginCtrl', function ($scope, $http, $location, $rootScope) {

    $scope.loginUser = () => {
      const userLogin = {
        email: $scope.email,
        password: $scope.password
      }

    $http
      .post('/api/login', userLogin)
      .then((response) => {
        console.log('rdr', response.data.user);
        if (response.data.user) {
          $rootScope.userID = response.data.user.email
          $location.path('/newvisit')
        } else {
          $scope.statusMessage = response.data.message
        }
      })
      .catch(console.error)
    }

    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('RegisterCtrl', function ($scope, $http, $location) {
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
        .then((register) => {
          if (register) {
            $scope.registers.push(register)
            $location.path('/login')
          }
        })
        .catch(console.error)
    }

    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('NewVisitCtrl', function ($scope, $http, $rootScope) {
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
        userID: $rootScope.userID,
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

    $http
      .get('/api/registers')
      .then(({ data: { registers }}) => {
        $scope.registers = $rootScope.userID
        console.log($rootScope)
      })
  })
  .controller('PreviousVisitCtrl', function ($scope, $http, $routeParams, $rootScope) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
    // $http
    //   .get('/api/visits')
    //   .then(({ data: { visits }}) =>
    //     $scope.visits = visits
    //   )
    $http
      .post('/api/getvisits', { userID: $rootScope.userID })
      .then(response => {
        $scope.visits = response.data.visits
        console.log('response', response)
      })
    $http
      .get('/api/registers')
      .then(({ data: { registers }}) => {
        $scope.registers = $rootScope.userID
        console.log($rootScope)
      })
  })
  .controller('IndividualVisitCtrl', function ($scope, $http, $routeParams, $rootScope) {
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
    $http
      .get('/api/registers')
      .then(({ data: { registers }}) => {
        $scope.registers = $rootScope.userID
        console.log($rootScope)
      })
  })

