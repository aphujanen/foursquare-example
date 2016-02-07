angular
  .module('foursquare-example')
  .filter('meters2km', meters2km);

function meters2km() {
  return function(meters) {
    return meters > 999 ? Math.round(meters / 100) / 10 + ' km' : meters + ' m';
  };
}
