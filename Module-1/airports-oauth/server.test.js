const app = require("./server");
const request = require("supertest");

//MOCK DATA
const airport = {
  "icao": "TEST",
  "iata": "",
  "name": "New Airport",
  "city": "New city",
  "state": "New state",
  "country": "US",
  "elevation": 450,
  "lat": 53.1234567,
  "lon": -151.1234567,
  "tz": "New America"
}

const airport2 = {
  "icao": "UPDATED",
  "iata": "",
  "name": "New Airport",
  "city": "New city",
  "state": "New state",
  "country": "US",
  "elevation": 450,
  "lat": 53.1234567,
  "lon": -151.1234567,
  "tz": "New America"
}


describe("Homepage", () => {
  it("responds with HTML", (done) => {
    request(app)
      .get("/")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200, done);
  });
});

describe("My Airport server", () => {
  // READ ALL
  it("should read all the airports - status 200", (done) => {
    request(app)
      .get('/airports')
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(res => {
        expect(res.body.length).toBeGreaterThan(28000)
      })
      .expect(200, done)
  })

  //ADD
  it('should add a new airport - status 201', (done) => {
    request(app)
      .post('/airports')
      .send(airport)
      .expect(res => {
        expect(res.body.icao).toBe(airport.icao)
        expect(res.body.name).toBe(airport.name)
      })
      .expect(201, done)
  })

  it('should not add a new airport - status 400 - Airport not created', (done) => {
    request(app)
      .post('/airports')
      .send('I am a string')
      .expect('Airport not created')
      .expect(400, done)
  })

  //READ SINGLE
  it('should read a single airport - status 200', (done) => {
    request(app)
      .get(`/airports/${airport.icao}`)
      .expect(res => {
        expect(res.body.icao).toEqual(airport.icao)
        expect(res.body.name).toEqual(airport.name)
      })
      .expect(200, done)
  })

  it('should not read a single airport - status 404 - Airport not found', (done) => {
    request(app)
      .get(`/airports/aaaaaa`)
      .expect('Airport not found')
      .expect(404, done)
  })

  //UPDATE
  it('should update an existing airport - status 200', (done) => {
    request(app)
      .put(`/airports/${airport.icao}`)
      .send(airport2)
      .expect(res => {
        expect(res.body.icao).toEqual(airport2.icao)
        expect(res.body.name).toEqual(airport2.name)
      })
      .expect(200, done)
  })

  it('should not update an existing airport  - status 404 - Airport not found', (done) => {
    request(app)
      .put(`/airports/${airport.icao}`)
      .send('I am a string')
      .expect('Airport not found')
      .expect(404, done)
  })

  //DELETE
  it('should delete an existing airport - status 200', (done) => {
    request(app)
      .delete(`/airports/${airport2.icao}`)
      .expect(res => {
        expect(res.body.icao).toEqual(airport2.icao)
        expect(res.body.name).toEqual(airport2.name)
      })
      .expect(200, done)
  })

  it('should not delete an existing airport - status 404 - Airport not found', (done) => {
    request(app)
      .delete(`/airports/aaaaaa`)
      .expect('Airport not found')
      .expect(404, done)
  })
})


