window.startTest = function (done) {
  'use strict';

  var myMap = geo.map({node: '#map'});
  window.gjsmap = myMap;
  var layer2 = myMap.createLayer('feature');
  layer2.createFeature('plane')
    .origin({x: -90.0, y: -180.0})
    .upperLeft({x: 90.0, y: -180.0})
    .lowerRight({x: -90.0, y: 180.0})
    .style('image', '/data/land_shallow_topo_2048.png');
  layer2.name = 'layer2';
  myMap.center({x: -40, y: 0});
  myMap.zoom(0);

  myMap.draw();
  myMap.onIdle(function () {
    window.geoTests.loadCitiesData(function (citieslatlon) {
        var layer = myMap.createLayer('feature');
        layer.createFeature('point')
          .data(citieslatlon)
          .style('fillColor', function (d) {
            if (d.lon < -100) {
              return {r: 1.0, g: 0.0, b: 0.0};
            }
            return {r: 0.0, g: 0.0, b: 1.0};
          })
          .style('fillOpacity', function (d) {
            if (d.lon < -100) {
              return 0.5;
            } else {
              return 0.25;
            }
          })
          .position(function (d) { return {x: d.lon, y: d.lat, z: d.elev}; });
        myMap.draw();
        myMap.onIdle(done);
      });
  });
};
