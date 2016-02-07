angular
  .module('foursquare-example')
  .factory('FourSquareFactory', FourSquareFactory);

function FourSquareFactory($http, foursquareConfig) {
  FourSquareFactory.getVenues = function(query) {
    var params = angular.extend({
      action: 'explore',
      client_id: foursquareConfig.clientId,
      client_secret: foursquareConfig.clientSecret,
      v: '20131230'
    }, query);

    return $http.get('https://api.foursquare.com/v2/venues/search', {
      params: params
    });
  };

  return FourSquareFactory;
}
