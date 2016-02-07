angular
  .module('foursquare-example')
  .factory('GeocodingFactory', GeocodingFactory);

function GeocodingFactory($http) {
  GeocodingFactory.reverseGeocode = function(query) {
    var params = angular.extend({
      format: 'json',
      zoom: 18,
      addressdetails: 1
    }, query);

    return $http.get('http://nominatim.openstreetmap.org/reverse', {
      params: params
    });
  };

  return GeocodingFactory;
}
