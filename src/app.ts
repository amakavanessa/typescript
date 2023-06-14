import axios from "axios";
import * as config from "../config.json";
const GOOGLE_API_KEY = config.GOOGLE_API_KEY;

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeoCodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULT";
};
function searchAdressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeoCodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
form.addEventListener("submit", searchAdressHandler);
