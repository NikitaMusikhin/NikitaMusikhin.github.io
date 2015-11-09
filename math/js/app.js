'use strict';
angular.module('MathApp', ['ui.router','User'])
.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
$urlRouterProvider.otherwise("/login");
$stateProvider
    .state('reg', {
        url:'/reg',
        templateUrl: '/application/views/reg_view.html',
        controller: 'regCtrl'
    })
    .state('login', {
        url:'/login',
        templateUrl: '/application/views/login_view.html',
        controller: 'loginCtrl'
    })
    .state('dashboard',{
        url:'/dashboard',
        templateUrl: '/application/views/dashboard_view.html',
        controller: 'profCtrl'
    });
}]);
