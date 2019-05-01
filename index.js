import axios from 'axios';
import { API_KEY } from './config';

async function getMapResults() {
  const lat = 49.2798287;
  const long = -123.1157398;
  const radius = 200;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&types=restaurant&language=ja&key=${API_KEY}`;

  const response = await axios.get(url);
  const data = response.data;
  const results = data.results;
  return results;
}

async function getRandomResult() {
  const array = await getMapResults();
  const result = array[Math.floor(Math.random() * array.length)];
  return result;
}

async function getDesc(name) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&key=${API_KEY}`;
  const response = await axios.get(url);
  const desc = response.data.predictions[0].description;
  return desc;
}

async function getImageUrl(PHOTO_REFERENCE) {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${PHOTO_REFERENCE}&key=${API_KEY}`;
  return url;
}

async function getData() {
  const result = await getRandomResult();
  const data = {
    name: result.name,
    openNow: result.opening_hours.open_now,
    priceLevel: result.price_level,
    rating: result.rating,
    image: await getImageUrl(result.photos[0].photo_reference),
    desc: await getDesc(result.name)
  };
  return data;
}

async function outputtest() {
  await getData().then(data => console.log(data));
}

outputtest();
