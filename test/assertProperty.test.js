const chai = require('chai');

chai.use(require('../dist/chai-geojson.js'));

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

const polygons = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-78.861923, 43.033262], [-78.861923, 43.062366], [-78.804244, 43.062366], [-78.804244, 43.033262], [-78.861923, 43.033262]
          ]
        ]
      }
    }
  ]
};

describe('Expect to assert GeoJSON properties', () => {

  it('should assert GeoJSON area', () => {
    expect(polygons).to.have.areaOf(15194923, 0.01);
    expect(polygons).to.not.have.areaOf(100);

    expect(polygons).to.have.area.above(15000000);
    expect(polygons).to.have.area.below(16000000);
    expect(polygons).to.have.area.within(15000000, 16000000);
  });

});

describe('Should assert GeoJSON properties', () => {

  it('should assert GeoJSON area', () => {
    polygons.should.have.areaOf(15194923, 0.01);
    polygons.should.not.have.areaOf(100);

    polygons.should.have.area.above(15000000);
    polygons.should.have.area.below(16000000);
    polygons.should.have.area.within(15000000, 16000000);
  });

});
