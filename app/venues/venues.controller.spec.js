describe('venues controller:', function() {
  var venuesController, FourSquareFactory, GeocodingFactory;

  var mockReverseGeocode = {
    data: {
      address: {
        road: 'Ansajuonto',
        city: 'Oulu'
      }
    }
  };

  var mockVenues = {
    data: {
      response: {
        venues: [1, 2, 3, 4]
      }
    }
  };

  beforeEach(angular.mock.module('foursquare-example'));

  beforeEach(inject(function($controller, _FourSquareFactory_, _GeocodingFactory_) {
    FourSquareFactory = _FourSquareFactory_;
    GeocodingFactory = _GeocodingFactory_;
    venuesController = $controller('VenuesController');
  }));

  it('message should be set', function() {
    expect(venuesController.message).toEqual({
      msg: 'Waiting for location...',
      type: 'warning'
    });
  });

  describe('reverseGeocode', function() {
    it('should return address', inject(function($rootScope, $q) {
      var dataDeferred = $q.defer();
      dataDeferred.resolve(mockReverseGeocode);
      spyOn(GeocodingFactory, 'reverseGeocode').and.returnValue(dataDeferred.promise);

      venuesController.coords = { latitude: 65, longitude: 25 };
      venuesController.reverseGeocode(65, 25);

      $rootScope.$apply();

      expect(venuesController.location).toEqual({ address: {
        road: 'Ansajuonto',
        city: 'Oulu'
      }});
    }));
  });

  describe('search', function() {
    it('should return 4 venues', inject(function($rootScope, $q) {
      var dataDeferred = $q.defer();
      dataDeferred.resolve(mockVenues);
      spyOn(FourSquareFactory, 'getVenues').and.returnValue(dataDeferred.promise);

      venuesController.coords = { latitude: 65, longitude: 25 };
      venuesController.search('test');

      $rootScope.$apply();

      expect(venuesController.venues.length).toEqual(4);
    }));

    it('should fail and warning message be set correctly', inject(function($rootScope, $q) {
      var dataDeferred = $q.defer();
      dataDeferred.reject(mockVenues);
      spyOn(FourSquareFactory, 'getVenues').and.returnValue(dataDeferred.promise);

      venuesController.coords = { latitude: 65, longitude: 25 };
      venuesController.search('test');

      $rootScope.$apply();

      expect(venuesController.venues.length).toEqual(0);
      expect(venuesController.message).toEqual({
        msg: 'Failed to get results from foursquare.',
        type: 'danger'
      });
    }));
  });
});
