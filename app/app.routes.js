angular
  .module('foursquare-example')
  .config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('venues', {
      url: '/venues',
      templateUrl: 'venues/venues.html',
      controller: 'VenuesController as vm'
    });

  $urlRouterProvider.otherwise('/venues');
}
