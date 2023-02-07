const API_KEY = process.env.REACT_APP_TOMTOM_API

// api.ts

export const fetchGeocode = (API_KEY: string, query: string) =>
  fetch(`https://api.tomtom.com/search/2/geocode/${query}.json?key=${API_KEY}`).then(res => res.json())

export const fetchAutocomplete = (API_KEY: string, query: string) =>
  fetch(`https://api.tomtom.com/search/2/autocomplete/${query}.json?key=${API_KEY}&language=en-US`).then(res => res.json())
