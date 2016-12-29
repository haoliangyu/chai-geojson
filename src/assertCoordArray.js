export function isPoint(assertion, options) {

  options = options || {};

  let coordinates = options.coordinates ? options.coordinates : assertion._obj.coordinates;
  let negativeMsg = options.negativeMsg ? options.negativeMsg : 'Expect coordinates not to be valid point coordinates';
  let positiveMsg = options.positiveMsg ? options.positiveMsg : `Expect [${coordinates}] to be valid point coordinates`;

  assertion.assert(
    coordinates.length === 2 &&
    typeof coordinates[0] === 'number' &&
    !Number.isNaN(coordinates[0]) &&
    typeof coordinates[1] === 'number' &&
    !Number.isNaN(coordinates[1]),
    positiveMsg,
    negativeMsg
  );
}

export function isLineString(assertion, options) {

  options = options || {};

  let negativeMsg = options.negativeMsg ? options.negativeMsg : 'Expect coordinates not to be valid linestring coordinates';
  let coordinates = options.coordinates ? options.coordinates : assertion._obj.coordinates;

  assertion.assert(
    coordinates.length > 1,
    options.positiveMsg ? options.positiveMsg : 'Expect coordinates to have at least two points',
    negativeMsg
  );

  coordinates.forEach(point => {
    isPoint(assertion, {
      coordinates: point,
      negativeMsg: negativeMsg
    });
  });
}

export function isPolygon(assertion, options) {

  options = options || {};

  let negativeMsg = options.negativeMsg ? options.negativeMsg : 'Expect coordinates not to be valid polygon coordinates';
  let coordinates = options.coordinates ? options.coordinates : assertion._obj.coordinates;

  assertion.assert(
    coordinates.length > 0,
    options.positiveMsg ? options.positiveMsg : 'Expect coordinates to have at least one ring',
    negativeMsg
  );

  coordinates.forEach((lineString, index) => {
    isLineString(assertion, {
      coordinates: lineString,
      positiveMsg: `Expect ring ${index + 1} to be valid linestring coordinates`,
      negativeMsg: negativeMsg
    });
  });
}
