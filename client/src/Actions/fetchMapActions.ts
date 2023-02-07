
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