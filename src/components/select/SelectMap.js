import React, { Component } from "react";

const htlCoord = {
  lat: 48.243084,
  lng: 13.027800999999954
};

class SelectMap extends Component {
  // <-- lifecycle -->
  componentDidMount() {
    this.platform = new window.H.service.Platform({
      app_id: "FNWch6Lh7ZVz5UZAmhCH",
      app_code: "924WDQuFvEz_H8x5pGYCDA",
      useHTTPS: true
    });
    this.defaultLayers = this.platform.createDefaultLayers();
    this.map = new window.H.Map(
      this.refs.selectmap,
      this.defaultLayers.normal.map,
      {
        zoom: 11,
        center: { lat: 48.25573, lng: 13.0443 }
      }
    );
    this.behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(this.map)
    );
    this.ui = window.H.ui.UI.createDefault(this.map, this.defaultLayers);
    var htlMarker = new window.H.map.Marker({
      lat: 48.243084,
      lng: 13.027800999999954
    });
    this.map.addObject(htlMarker);

    this.map.setBaseLayer(this.defaultLayers.normal.traffic);
    this.map.addLayer(this.defaultLayers.incidents);
    this.group = new window.H.map.Group();
    this.markerGroup = new window.H.map.Group();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.location) {
    } else {
      this.group.removeAll();
      this.markerGroup.removeAll();
      this.coordinates = nextProps.data.location.coordinates;
      var ownMarker = new window.H.map.Marker({
        lat: this.coordinates.lat,
        lng: this.coordinates.lng
      });
      this.markerGroup.addObject(ownMarker);
      this.map.addObject(this.markerGroup);
      this.calculateRouteFromAtoB(this.platform);
    }
  }

  // <-- methods -->

  calculateRouteFromAtoB = platform => {
    var router = platform.getRoutingService(),
      routeRequestParams = {
        mode: "fastest;car",
        representation: "display",
        routeattributes: "waypoints,summary,shape,legs",
        maneuverattributes: "direction,action",
        waypoint0: `${this.coordinates.lat},${this.coordinates.lng}`,
        waypoint1: `${htlCoord.lat},${htlCoord.lng}`
      };
    router.calculateRoute(routeRequestParams, this.onSuccess, this.onError);
  };

  onSuccess = result => {
    var route = result.response.route[0];
    this.addRouteShapeToMap(route);
    alert(
      `Weg: ${Math.round(
        result.response.route[0].summary.distance * 0.001
      )}km, Zeit: ${Math.round(
        result.response.route[0].summary.trafficTime / 60
      )}min`
    );
  };

  onError = error => {
    console.log(error);
  };

  addRouteShapeToMap = route => {
    var lineString = new window.H.geo.LineString(),
      routeShape = route.shape;

    routeShape.forEach(function(point) {
      var parts = point.split(",");
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    this.group.addObject(
      new window.H.map.Polyline(lineString, {
        style: { lineWidth: 4, strokeColor: "rgba(0, 128, 255, 0.7)" }
      })
    );

    this.map.addObject(this.group);
    this.map.setViewBounds(this.group.getBounds(), true);
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div style={{ width: "100%", height: 650 }} ref="selectmap" />;
  }
}

export default SelectMap;
