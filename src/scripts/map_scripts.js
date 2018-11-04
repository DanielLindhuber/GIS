const htlCoord = {
  lat: 48.243084,
  lng: 13.027800999999954
};

export function loadRoute(platform, map, coordinates) {
  var ownMarker = new window.H.map.Marker({
    lat: coordinates.lat,
    lng: coordinates.lng
  });
  map.addObject(ownMarker);
  calculateRouteFromAtoB(platform);

  function calculateRouteFromAtoB(platform) {
    var router = platform.getRoutingService(),
      routeRequestParams = {
        mode: "fastest;car",
        representation: "display",
        routeattributes: "waypoints,summary,shape,legs",
        maneuverattributes: "direction,action",
        waypoint0: `${coordinates.lat},${coordinates.lng}`,
        waypoint1: `${htlCoord.lat},${htlCoord.lng}`
      };
    router.calculateRoute(routeRequestParams, onSuccess, onError);
  }

  function onSuccess(result) {
    var route = result.response.route[0];
    addRouteShapeToMap(route);
  }

  function onError(error) {
    console.log(error);
  }

  function addRouteShapeToMap(route) {
    var lineString = new window.H.geo.LineString(),
      routeShape = route.shape,
      polyline;

    routeShape.forEach(function(point) {
      var parts = point.split(",");
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new window.H.map.Polyline(lineString, {
      style: {
        lineWidth: 4,
        strokeColor: "rgba(0, 128, 255, 0.7)"
      }
    });

    map.addObject(polyline);
    map.setViewBounds(polyline.getBounds(), true);
  }
}

export function loadIncidents(map, defaultLayers) {
  map.setBaseLayer(defaultLayers.normal.traffic);
  map.addLayer(defaultLayers.incidents);
}
