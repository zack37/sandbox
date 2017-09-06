function maxBy(collection, projection = x => x) {
  let maxValue = projection(collection[0]);
  let maxItem = collection[0];
  for (var i = 1; i < collection.length; i++) {
    const item = collection[i];
    const value = projection(item);
    if (value > maxValue) {
      maxValue = value;
      maxItem = item;
    }
  }

  return maxItem;
}

const SPORTS = {
  soccer: attrs =>
    attrs.armStrength * 5 +
    attrs.reactionTime * 2 +
    attrs.mentalStrength +
    attrs.armStrength +
    attrs.coreStrength,
  chess: attrs => attrs.mentalStrength * 10,
  football: attrs =>
    attrs.armStrength * 4 + attrs.coreStrength * 3 + attrs.legStrength * 3,
  tennis: attrs =>
    attrs.reactionTime * 3 +
    attrs.armStrength * 4 +
    attrs.coreStrength * 2 +
    attrs.mentalStrength,
  swimming: attrs =>
    attrs.reactionTime +
    attrs.coreStrength * 3 +
    attrs.armStrength * 3 +
    attrs.legStrength * 3,
  basketball: attrs =>
    attrs.legStrength * 2 +
    attrs.armStrength * 5 +
    attrs.mentalStrength * 2 +
    attrs.coreStrength,
  track: attrs =>
    attrs.legStrength * 6 +
    attrs.armStrength * 2 +
    attrs.reactionTime +
    attrs.mentalStrength,
  gymnastics: attrs =>
    attrs.legStrength * 3 +
    attrs.armStrength * 3 +
    attrs.coreStrength * 3 +
    attrs.mentalStrength
};

const strengthAttrs = {
  legStrength: 10,
  armStrength: 10,
  coreStrength: 10,
  mentalStrength: 10,
  reactionTime: 10
};

const sportScores = Object.keys(SPORTS).map(key => [
  key,
  SPORTS[key](strengthAttrs)
]);

const bestSport = maxBy(sportScores, x => x[1])[0];

console.log(bestSport);
