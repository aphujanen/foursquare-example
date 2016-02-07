describe('meters2km filter', function() {
  var values = [
    [2001, '2 km'],
    [13417, '13.4 km'],
    [465, '465 m'],
    [999, '999 m'],
    [5250, '5.3 km']
  ];

  beforeEach(module('foursquare-example'));

  values.forEach(function(value) {
    it('should convert to kilometers if exceed 999 meters', inject(function($filter) {
      var result = $filter('meters2km')(value[0]);
      expect(result).toEqual(value[1]);
    }));
  });
});
