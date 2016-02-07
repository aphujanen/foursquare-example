angular
  .module('foursquare-example')
  .controller('VenuesController', VenuesController);

function VenuesController($http, geolocation, GeocodingFactory, FourSquareFactory) {
  var vm = this;

  vm.coords = null;
  vm.location = null;
  vm.venues = [];

  vm.reverseGeocode = reverseGeocode;
  vm.setMessage = setMessage;
  vm.search = search;

  init();

  function init() {
    setMessage('Waiting for location...', 'warning');

    geolocation.getCurrentPosition().then(function(response) {
      vm.coords = response.coords;
      setMessage(null, null);
      reverseGeocode(vm.coords.latitude, vm.coords.longitude);
    }, function(error) {
      setMessage(error, 'danger');
    });
  }

  function reverseGeocode(latitude, longitude) {
    GeocodingFactory.reverseGeocode({ lat: latitude, lon: longitude }).then(function(response) {
      vm.location = response.data;
    });
  }

  function search(query) {
    setMessage(null, null);

    FourSquareFactory
      .getVenues({ ll: vm.coords.latitude + ',' + vm.coords.longitude, query: query })
      .then(function (response) {
        vm.venues = response.data.response.venues;
      }, function () {
        setMessage('Failed to get results from foursquare.', 'danger');
      });
  }

  function setMessage(msg, type) {
    vm.message = {
      msg: msg,
      type: type
    };
  }
}
