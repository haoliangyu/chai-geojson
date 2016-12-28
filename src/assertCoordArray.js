export function isPoint(assertion, positiveMsg, negativeMsg) {
  assertion.assert(
    assertion._obj.coordinates.length === 2,
    positiveMsg,
    negativeMsg
  );
}

export function isLineString(assertion, positiveMsg, negativeMsg) {
  assertion.assert(
    assertion._obj.coordinates.length > 1,
    positiveMsg,
    negativeMsg
  );

  assertion._obj.coordinates.forEach(point => {
    assertion.assert(
      Array.isArray(point) && point.length === 2,
      positiveMsg,
      negativeMsg
    );
  });
}

export function isPolygon(assertion, positiveMsg, negativeMsg) {
  assertion.assert(
    assertion._obj.coordinates.length > 0,
    positiveMsg,
    negativeMsg
  );

  assertion._obj.coordinates.forEach(lineString => {
    assertion.assert(
      Array.isArray(lineString) && lineString.length > 1,
      positiveMsg,
      negativeMsg
    );

    lineString.forEach(point => {
      assertion.assert(
        Array.isArray(point) && point.length === 2,
        positiveMsg,
        negativeMsg
      );
    });
  });
}
