import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import React from "react";
import "./navigationpage.css"
import { reverseGeocode } from "../Actions/fetchMapActions";

const Navigation = () => {
    const testLongStart = 9.904940
    const testLatStart = 49.793020
    const testLongEnd = 9.907300
    const testLatEnd = 49.798420
    const [currentAdress, setCurrentAdress] = React.useState()
    const mapElem = React.useRef<HTMLDivElement>(null)
    const API_KEY = process.env.REACT_APP_TOMTOM_API as string;
    const [map, setMap] = React.useState({})
    const options = {
        searchOptions: {
          key: API_KEY,
          language: "en-GB",
          limit: 5,
        }};
     React.useEffect(() => {
        let map = tt.map({
            key: API_KEY,
            container: "map",
            stylesVisibility: {
                trafficFlow: true,
                trafficIncidents: true
            },
            center: [testLongStart, testLatStart],
            zoom: 17
        })
        setMap(map)
        map.on("load", () => {
            const elem = document.createElement("div")
            elem.id= "startMarker"
            new tt.Marker({element: elem})
            .setLngLat([testLongStart, testLatStart])
            .addTo(map)
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
            const endElem = document.createElement("div")
            endElem.id ="endMarker"
            new tt.Marker({element: endElem})
            .setLngLat([testLongEnd, testLatEnd])
            .addTo(map)
            return new Promise((resolve, reject) => {
                ttapi.services
                .calculateRoute({
                    key: API_KEY,
                    locations: `${testLongStart},${testLatStart}:${testLongEnd},${testLatEnd}`,
                })
                .then((res) => {
                    console.log("RESPONSE " , res)
                    const response = res.toGeoJson()
                    map.addLayer({
                        id:"route",
                        type:"line",
                        source:{
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: response.features[0].properties,
                                geometry: response.features[0].geometry
                            }
                        },
                        paint: {
                            "line-color": "turquoise",
                            "line-width": 5,
                          },
                    })
                })
            })
        })
        
        reverseGeocode(testLatStart, testLongStart).then((res) => setCurrentAdress(res.addresses[0].address))
    },[testLongStart, testLatStart, testLatEnd, testLongEnd])   
    console.log("DATAAAA" , currentAdress)
    return(
            <div className="container">
            <div ref={mapElem} id="map" style={{height:"100vh"}} /> 
            <div>
                Kamil
            </div>
            </div>
    )
}

export default Navigation;