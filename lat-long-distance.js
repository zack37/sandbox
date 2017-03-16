let lat1 = 38.898556;
let long1 = -77.037852;
let lat2 = 38.897147;
let long2 = -77.043934;

const toRadians = degrees => degrees * (Math.PI / 180);

const R = 3961
const lat1Rad = toRadians(lat1);
const lat2Rad = toRadians(lat2);
const deltaLat = toRadians(lat2 - lat1);
const deltaLong = toRadians(long2 - long1);

const a = Math.pow(Math.sin(deltaLat/2), 2)
    + Math.cos(lat1Rad) * Math.cos(lat2Rad)
    * Math.pow(Math.sin(deltaLong/2), 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

const d = R*c;

console.log(d);
