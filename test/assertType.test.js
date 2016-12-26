const chai = require('chai');

chai.use(require('../dist/chai-geojson.js'));

const expect = chai.expect;

describe('Assert GeoJSON Type', () => {

  it('should validate the GeoJSON type Feature.', () => {
    let geojson = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: {}
    };

    expect(geojson).to.be.a('Feature');
  });

});
