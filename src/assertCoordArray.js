export function isPoint(Assertion, coordinates) {
  new Assertion(coordinates).to.have.lengthOf(2);
};

export function isLineString(Assertion, coordinates) {
  new Assertion(coordinates).to.have.length.above(1);

  coordinates.forEach(point => {
    new Assertion(point).to.be.a('array');
    isPoint(Assertion, point);
  })
}
