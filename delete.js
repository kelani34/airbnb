import React, { useState, useEffect } from "react";
import "./App.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import _ from "lodash";

let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates = [];
let color = [
  "#FF0000",
  "#4286f4",
  "#ffff00",
  "#ff00b2",
  "#bb00ff",
  "#00ffff",
  "#26ff00",
  "#00ff87",
];

const App = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    _initMap();
  }, []);

  const _initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -6.226996, lng: 106.819894 },
      zoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER,
      },
      scrollwheel: false,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: "roadmap",
    });
  };

  const _handleSearch = (query) => {
    if (!query) {
      return;
    }
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`
      )
        .then((resp) => resp.json())
        .then((data) => {
          let filterGeoJsonType = data.filter(function (data) {
            return (
              data.geojson.type === "MultiPolygon" ||
              data.geojson.type === "Polygon"
            );
          });
          setOptions(filterGeoJsonType);
        });
    }, 1000);
  };

  const renderCoordinate = (paths) => {
    coordinates = [];
    let position = 0;
    paths.map((location) => {
      if (position % 10 === 0) {
        coordinates.push({ lat: location[1], lng: location[0] });
        bounds.extend({ lat: location[1], lng: location[0] });
      }
      position++;
      return true;
    });
  };

  const renderToMaps = (selectedOptions) => {
    selectedOptions.forEach((option) => {
      if (option.geojson.type === "MultiPolygon") {
        renderCoordinate(option.geojson.coordinates[0][0]);
      } else if (option.geojson.type === "Polygon") {
        renderCoordinate(option.geojson.coordinates[0]);
      } else {
        alert("option.geojson.type: MultiPolygon & Polygon");
      }

      if (coordinates.length > 1) {
        sub_area = new window.google.maps.Polygon({
          paths: coordinates,
          strokeColor: color[1],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color[1],
          fillOpacity: 0.35,
          editable: true,
        });

        sub_area.setMap(map);
        map.setOptions({ maxZoom: 15 });
        map.fitBounds(bounds);

        coordinates = [];
      }
    });
  };

  const _handleChange = (option) => {
    _initMap();
    renderToMaps(option);
    setSelectedOptions(option);
  };

  return (
    <div className="container" style={{ height: `100%` }}>
      <div className="page-header">
        <h1>Area Geofencing on a Google Maps - React JS Example Projects</h1>
      </div>
      <p className="lead">
        Welcome to the first series React JS Example Projects. This series
        explain how to create Area Geofencing on a Google Maps with ReactJS,
        hopefully we can learn together.
        <br></br>
        To create area geofencing we must find area boundaries and draw on
        google maps as polygon. During the writing of this series, area
        boundaries feature not available in the Google Maps API. The solution is
        using OpenStreetMap API for getting area boundaries{" "}
        <a href="#">more...</a>
      </p>
      <a
        href="https://www.youtube.com/watch?v=hLaRG0uZPWc"
        className="btn btn-primary"
      >
        DEMO
      </a>{" "}
      &nbsp;
      <a
        href="https://github.com/safeimuslim/gmaps-geofence"
        className="btn btn-primary"
      >
        DOWNLOAD
      </a>{" "}
      &nbsp;
      <br></br>&nbsp;
      <AsyncTypeahead
        align="justify"
        multiple
        labelKey="display_name"
        onSearch={_handleSearch}
        onChange={_handleChange}
        options={options}
        placeholder="Search city, ex: tomang or jakarta selatan..."
        renderMenuItemChildren={(option, props, index) => (
          <div>
            <span>{option.display_name}</span>
          </div>
        )}
      />
      <div className="maps" id="map"></div>
      <footer className="footer">
        <p>
          developed by <a href="https://github.com/safeimuslim">@safeimuslim</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
