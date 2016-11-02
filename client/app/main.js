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
  .controller('navController', function ($scope, $rootScope, $location) {
    $scope.user = $rootScope.userID
    $scope.logout = () => {
      $rootScope.userID = null
      $location.path('/')
    }
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
      })
  })
  .controller('PreviousVisitCtrl', function ($scope, $http, $routeParams, $rootScope) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
    $http
      .post('/api/getvisits', { userID: $rootScope.userID })
      .then(response => {
        $scope.visits = response.data.visits
      })
    $http
      .get('/api/registers')
      .then(({ data: { registers }}) => {
        $scope.registers = $rootScope.userID
      })
  })
  .controller('IndividualVisitCtrl', function ($scope, $http, $routeParams, $rootScope, $location) {
    $scope.registers = $rootScope.userID
    $http
      .get('/api/title')
      .then(({ data: { title }}) => {
        $scope.title = title
      })
    $http
      .post('/api/getindividualvisit', { id: $routeParams.id })
      .then(response => {
        $scope.visit = response.data.visit
      })
    $scope.modify = () => {
      console.log('S.P', $scope.phone)
      let visit = {
        physicianName: $scope.physicianName,
        type: $scope.type,
        contactInfo: {
          phone: $scope.phone || $scope.visit.contactInfo.phone,
          address: $scope.address || $scope.visit.contactInfo.address,
          email: $scope.email || $scope.visit.contactInfo.email,
        },
        weight: $scope.weight,
        height: {
          foot: $scope.foot || $scope.visit.height.foot,
          inches: $scope.inches || $scope.visit.height.inches,
        },
        bp: {
          systolic: $scope.systolic || $scope.visit.bp.systolic,
          diastolic: $scope.diastolic || $scope.visit.bp.diastolic,
        },
        reasonForVisit: $scope.visit.reasonForVisit,
        date: $scope.date,
        diagnosis: $scope.visit.diagnosis,
        solution: $scope.visit.solution,
        followUp: $scope.visit.followUp,
        bloodwork: $scope.bloodwork,
        medicationsPrescribed: $scope.visit.medicationsPrescribed,
        sideEffects: $scope.visit.sideEffects,
        allergies: $scope.visit.allergies,
        afterCare: $scope.visit.afterCare,
        userID: $rootScope.userID,
        id: $routeParams.id,
      }
      console.log('visit', visit)
      $http
        .post('/api/updatevisit', visit)
        .then((response) => {
          if (response.data.updatedIndividualVisit) {
            $location.path('/previousvisit')
          }
        })
        .catch(console.error)
    }
    $scope.delete = () => {
      $http
        .post('/api/deletevisit', { id: $routeParams.id })
        .then(response => {
          if (response.data.deleted) {
            $location.path('/previousvisit')
          }
      })
      .catch(console.error)
    }
  })

