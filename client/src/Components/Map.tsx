import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import SearchBox, * as ttsearch from "@tomtom-international/web-sdk-plugin-searchbox";
import Routing from "./Routing";
import * as api from "../Actions/fetchMap";
import { setZoom, calculateKm } from "../Actions/helpers";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Button,
  MenuItem,
} from "@mui/material";

const Map = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const API_KEY = process.env.REACT_APP_TOMTOM_API as string;
  const [driveTo, setDriveTo] = useState("");
  const [driveFrom, setDriveFrom] = useState("");
  const [travelTime, setTravelTime] = useState<ttapi.RouteSummary>()
  const reference = useRef(null);
  const [map, setMap] = useState({});
  const [distance, setDistance] = useState(0);
  const [startLat, setStartLat] = useState<number>(49.79302);
  const [startLon, setStartLon] = useState<number>(9.90494);
  const [endLat, setEndLat] = useState();
  const [endLon, setEndLon] = useState();
  const km = calculateKm(distance);
  const options = {
    searchOptions: {
      key: API_KEY,
      language: "en-GB",
      limit: 5,
    },
    autocompleteOptions: {
      key: API_KEY,
      language: "en-GB",
    },
  };
  function autoCompleteFunction(data: string) {
    let shape;
    fetch(
      "https://api.tomtom.com/search/2/autocomplete/" +
        data +
        ".json?key=" +
        API_KEY +
        "&language=en-US"
    )
      .then((res) => res.json())
      .then((res) => {
        shape = res;
        console.log(res);
      });
    return shape;
  }

  function fromWhereToWhere(e: any) {
    //   console.log(e)
    fetch(
      `https://api.tomtom.com/search/2/geocode/${driveTo}.json?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let lon = res.results[0].position.lon;
        let lat = res.results[0].position.lat;
        setEndLon(lon);
        setEndLat(lat);
      });
  }

  useEffect(() => {
    let map = tt.map({
      key: API_KEY,
      container: "map",
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [startLon, startLat],
      zoom: setZoom(distance),
    });
    setMap(map);
    map.on("load", () => {
      const successCallback = (position: any) => {
        setStartLat(position.coords.latitude);
        setStartLon(position.coords.longitude);

        console.log(startLat, startLon);
      };

      const errorCallback = (error: any) => {
        console.log(error);
      };
      //   get current position from browser
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      //   adding zoom control
      map.addControl(new tt.NavigationControl(), "top-left");
      //   adding a new custom marker for starting position to the map
      const elem = document.createElement("div");
      elem.id = "startMarker";
      new tt.Marker({ element: elem })
        .setLngLat([startLon, startLat])
        .addTo(map);

      if (endLon && endLat !== undefined) {
        const element = document.createElement("div");
        element.id = "endMarker";
        new tt.Marker({ element: element })
          .setLngLat([endLon, endLat])
          .addTo(map);
        return new Promise((resolve, reject) => {
          // calculating route
          ttapi.services
            .calculateRoute({
              key: API_KEY,
              locations: `${startLon},${startLat}:${endLon},${endLat}`,
            })
            .then((res) => {
              // get some important data from response like meters and arrival time
              setDistance(res.routes[0].summary.lengthInMeters);
              console.log("DISTANCEEE ", distance)
              setTravelTime(res.routes[0].summary)
              const response = res.toGeoJson();
              map.addLayer({
                id: "route",
                type: "line",
                source: {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    properties: response.features[0].properties,
                    geometry: response.features[0].geometry,
                  },
                },
                paint: {
                  "line-color": "turquoise",
                  "line-width": 5,
                },
              });
            });
        });
      }
    });
    
  }, [endLat, endLon, distance]);
  return (
    <div>
      <FormControl onSubmit={(e) => fromWhereToWhere(e)}>
        <TextField
          id="from"
          label="From"
          variant="outlined"
          onChange={(e) => setDriveFrom(e.target.value)}
        />
        <TextField
          id="to"
          label="To"
          onChange={(e) => setDriveTo(e.target.value)}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="outlined"
          onClick={(e) => fromWhereToWhere(e)}
        >
          Find Route
        </Button>
      </FormControl>
      <div ref={mapElement} id="map" style={{ height: "350px" }}>
      </div >
      <span></span>
      <Routing travelTime={travelTime}/>
    </div>
  );
};
export default Map;
