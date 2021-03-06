import React, { Component } from "react";

class HeatMap extends Component {
  componentDidUpdate() {
    const platform = new window.H.service.Platform({
      app_id: "FNWch6Lh7ZVz5UZAmhCH",
      app_code: "924WDQuFvEz_H8x5pGYCDA",
      useHTTPS: true
    });
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new window.H.Map(this.refs.heatmap, defaultLayers.normal.map, {
      zoom: 9,
      center: { lat: 48.25573, lng: 13.0443 }
    });

    var behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );
    var ui = window.H.ui.UI.createDefault(map, defaultLayers);

    // Create heat map provider
    var heatmapProvider = new window.H.data.heatmap.Provider({
      colors: new window.H.data.heatmap.Colors(
        {
          "0": "#0404B4",
          "0.2": "#04B4AE",
          "0.4": "#2EFE2E",
          "0.6": "#FACC2E",
          "0.8": "#FF0000"
        },
        false // needs to be changed to true
      ),
      type: "value",
      tileSize: 16,
      coarseness: 0,
      sampleDepth: 8 // needs to be changed to 4 or less
    });

    // Add the data
    heatmapProvider.addData(this.props.data);

    // Create a semi-transparent heat map layer
    var heatmapLayer = new window.H.map.layer.TileLayer(heatmapProvider, {
      opacity: 0.6
    });

    // Add the layer to the map
    map.addLayer(heatmapLayer);
  }

  render() {
    return <div style={{ width: "100%", height: 650 }} ref="heatmap" />;
  }
}

export default HeatMap;
