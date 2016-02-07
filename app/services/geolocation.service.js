angular
  .module('foursquare-example')
  .service('geolocation', geolocation);

function geolocation($q, $window) {
  this.getCurrentPosition = function() {
    var deferred = $q.defer();

    if (!$window.navigator.geolocation) {
      deferred.reject('HTML5 geolocation not supported.');
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function (position) {
          deferred.resolve(position);
        },
        function (err) {
          deferred.reject(err);
        });
    }

    return deferred.promise;
  };
}
