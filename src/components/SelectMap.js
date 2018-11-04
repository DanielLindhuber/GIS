import React, { Component } from "react";
import { loadRoute, loadIncidents } from "../scripts/map_scripts";
import "./styles/SelectMap.css";

const htlCoord = {
  lat: 48.243084,
  lng: 13.027800999999954
};

class SelectMap extends Component {
  componentDidUpdate() {
    const coordinates = this.props.user.coordinates;
    const platform = new window.H.service.Platform({
      app_id: "FNWch6Lh7ZVz5UZAmhCH",
      app_code: "924WDQuFvEz_H8x5pGYCDA",
      useHTTPS: true
    });
    const defaultLayers = platform.createDefaultLayers();
    console.log("false");
    var map = new window.H.Map(this.refs.selectmap, defaultLayers.normal.map, {
      zoom: 11,
      center: { lat: 48.25573, lng: 13.0443 }
    });
    var behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );
    var ui = window.H.ui.UI.createDefault(map, defaultLayers);
    var htlMarker = new window.H.map.Marker({
      lat: 48.243084,
      lng: 13.027800999999954
    });
    map.addObject(htlMarker);
    this.setState({ rendered: true });

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

      var group = new window.H.map.Group();
      group.removeAll();
      group.addObject(
        new window.H.map.Polyline(lineString, {
          style: { lineWidth: 4, strokeColor: "rgba(0, 128, 255, 0.7)" }
        })
      );

      map.addObject(group);
      map.setViewBounds(group.getBounds(), true);
    }
    map.setBaseLayer(defaultLayers.normal.traffic);
    map.addLayer(defaultLayers.incidents);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.user == nextProps.user) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div id="selectmapObject" className="embed-responsive embed-responsive">
        <div id="selectmap" className="embed-responsive-item" ref="selectmap" />
      </div>
    );
  }
}

export default SelectMap;
