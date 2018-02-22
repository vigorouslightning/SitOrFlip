// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })
    .when('/items', {
        templateUrl: 'views/item.html',
        controller: 'ItemController'
    });

    $locationProvider.html5Mode(true);

}]);
