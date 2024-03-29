import * as ttapi from "@tomtom-international/web-sdk-services";

export function setZoom(distance: number) {
  if (distance > 17000 && distance < 100000) {
    return 10;
  } else if (distance > 100001 && distance < 450000) {
    return 8;
  } else if (distance < 17000 && distance > 5000) {
    return 13;
  } else if (distance < 4999) {
    return 15;
  } else return 5;
}

export function calculateKm(distance: number) {
  return distance / 1000;
}

export function calculateFuelConsumption(gallonsPerMile: number) {
  console.log("GALLON ", gallonsPerMile)
  const unroundedResult = 235.214 / gallonsPerMile;
  const roundedResult = Math.round(unroundedResult * 100) / 100;
  return roundedResult;
}

// export function getNavigationsMap(API_KEY:string,){
//   let map = tt.map({
//     key: API_KEY,
//     container: "map",
//     stylesVisibility: {
//         trafficFlow: true,
//         trafficIncidents: true
//     },
// })
// setMap(map)
// map.on("load", ()=> {
//     const 
// })
// }
