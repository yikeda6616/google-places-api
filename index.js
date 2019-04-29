import axios from 'axios';
import { API_KEY } from './config';

let results = [];

axios
  .get(
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.059856,141.343081&radius=500&types=food&language=ja&key=' +
      API_KEY
  )
  .then(response => {
    const data = response.data;
    results = data.results;
    results = results.map((item, i) => {
      return { id: i, ...item };
    });
    console.log(results);
    console.log(results.length);
  })
  .catch(() => {
    console.log('error');
  });
