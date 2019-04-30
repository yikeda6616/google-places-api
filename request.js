import request from 'request';
import { API_KEY } from './config';

var GMap, gmap;
const lat = 49.2798287;
const long = -123.1157398;
const radius = 200;

GMap = (function() {
  function GMap() {}

  GMap.prototype.food = function(arg) {
    var data, index, res, str;
    res = '';
    request.get(
      {
        uri:
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=,&radius=250&types=food&language=ja&key=' +
          API_KEY,
        json: true
      },
      function(err, r, body) {
        str = JSON.stringify(body, null, '    ');
        console.log(str);
        data = JSON.parse(str);
        index = Math.floor(Math.random() * data['results'].length);
        return console.log(
          data['results'][index]['name'] +
            '：住所→ ' +
            data['results'][index]['vicinity']
        );
      }
    );
  };

  return GMap;
})();

gmap = new GMap();

gmap.food();
