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

    this.map.setBaseLayer(this.defaultLayers.normal.traffic);
    this.map.addLayer(this.defaultLayers.incidents);

    this.group = new window.H.map.Group();
    this.markerGroup = new window.H.map.Group();
  }

  componentWillReceiveProps(nextProps) {
    // declarations
    this.userCoords = nextProps.data.user.location.coordinates;

    var userMarker = new window.H.map.Marker({
      lat: this.userCoords.lat,
      lng: this.userCoords.lng
    });
    this.map.addObject(userMarker);

    if (!nextProps.data.target.coordinates) {
      var initialMarker = new window.H.map.Marker({
        lat: htlCoord.lat,
        lng: htlCoord.lng
      });
      this.markerGroup.addObject(initialMarker);

      this.map.addObject(this.markerGroup);
      this.calculateRouteFromAtoB(this.platform, this.userCoords, htlCoord);
    } else {
      this.group.removeAll();
      this.markerGroup.removeAll();

      // declarations
      this.targetCoords = nextProps.data.target.location.coordinates;

      var ownMarker = new window.H.map.Marker({
        lat: this.targetCoords.lat,
        lng: this.targetCoords.lng
      });
      this.markerGroup.addObject(ownMarker);
      this.map.addObject(this.markerGroup);
      this.calculateRouteFromAtoB(
        this.platform,
        this.userCoords,
        this.targetCoords
      );
    }
  }

  // <-- methods -->

  calculateRouteFromAtoB = (platform, userCoords, targetCoords) => {
    var router = platform.getRoutingService(),
      routeRequestParams = {
        mode: "fastest;car",
        representation: "display",
        routeattributes: "waypoints,summary,shape,legs",
        maneuverattributes: "direction,action",
        waypoint0: `${userCoords.lat},${userCoords.lng}`,
        waypoint1: `${targetCoords.lat},${targetCoords.lng}`
      };
    router.calculateRoute(routeRequestParams, this.onSuccess, this.onError);
  };

  onSuccess = result => {
    var route = result.response.route[0];
    this.addRouteShapeToMap(route);
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
