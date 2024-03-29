function distance(p1, p2) {
  const EARTH_RADIUS = 3958.8;
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLong = radians(p2.long) - radians(p1.long);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(p2.lat)) *
      Math.cos(radians(p1.lat)) *
      Math.pow(Math.sin(dLong / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

function calculateDistance(points) {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}
function radians(degrees) {}

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance(points);
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };
}
