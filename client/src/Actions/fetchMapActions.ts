import React from "react";
const API_KEY = process.env.REACT_APP_TOMTOM_API
let shape:Array<string>=[]; 
export function autoCompleteFunction(data: string) {
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
        console.log(shape);
      });
      console.log(shape)
    return shape;
  }

  export async function reverseGeocode(long:number, lat:number){
    const res = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${long},${lat}.json?key=${API_KEY}&radius=20`)
    const data = await res.json()
    return data;
  }