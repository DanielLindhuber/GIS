import React, { Component } from "react";
import { loadRoute, loadIncidents } from "../scripts/map_scripts";
import "./styles/HereMap.css";

class HereMap extends Component {
  componentDidUpdate() {
    const platform = new window.H.service.Platform({
      app_id: "FNWch6Lh7ZVz5UZAmhCH",
      app_code: "924WDQuFvEz_H8x5pGYCDA",
      useHTTPS: true
    });
    const defaultLayers = platform.createDefaultLayers();
    var map = new window.H.Map(this.refs.map, defaultLayers.normal.map, {
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
    // ---------------------------------------------------------------------------------------------
    loadRoute(platform, map, this.props.user.coordinates); // { lat: 48.1983045, lng: 13.101644299999975 }
    loadIncidents(map, defaultLayers);
    // ---------------------------------------------------------------------------------------------
  }

  render() {
    return (
      <div id="heremapObject" className="embed-responsive embed-responsive">
        <div id="heremap" className="embed-responsive-item" ref="map" />
      </div>
    );
  }
}

export default HereMap;
