'use strict';
angular.module('MathApp', ['ui.router','Ctrls']).
config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
$urlRouterProvider.otherwise("/reg");
$stateProvider.
  state('reg', {
    url:'/reg',
    templateUrl: 'NikitaMusikhin.github.io/math/application/views/reg_view.html',
    controller: 'regCtrl'
  });
}]);
