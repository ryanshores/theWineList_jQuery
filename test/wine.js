process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Wine = require("../models").Wine;

// Require all dev dependancies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe("Wine", () => {
	// empty the db before each test
	beforeEach((done) => {
		Wine.remove({}, (err) => {
			done();
		})
	});

	// test the GET route
	describe("/GET wine", () => {
		it("it should get all the wine", (done) => {
			chai.request(server)
				.get("/api/wine")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	// test the POST route
	describe("/POST Wine", () => {
		it("it should not post a new wine with no name", (done) => {
			let wine = {
				type: "Cab Sav",
				winery: "Bota Box"
			};
			chai.request(server)
			.post("/api/wine")
			.send(wine)
			.end((err, res) => {
				res.should.have.status(206);
				res.body.should.have.a("object");
				res.body.should.have.property("errors");
				res.body.errors.should.have.property('name');
                res.body.errors.name.should.have.property('kind').eql('required');
                done();
			});
		});
		it("it should post a new wine", (done) => {
			let wine = {
				name: "Love",
				winery: "Sandy Beach",
				type: "Blend",
				year: 2011
			};
			chai.request(server)
			.post("/api/wine")
			.send(wine)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a("object");
				res.body.should.have.property("name");
				res.body.should.have.property("winery");
				res.body.should.have.property("type");
				res.body.should.have.property("year");
				done();
			});
		});
	});

	// test the /GET/api/wine/:wineid route
	describe("/GET :wineid", () => {
		it("it should GET a wine by the given id", (done) => {
			let wine = new Wine({
				name: "Love",
				winery: "Sandy Beach",
				type: "Blend",
				year: 2011
			});
			wine.save((err, wine) => {
				chai.request(server)
				.get(`/api/wine/${wine.id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("name");
					res.body.should.have.property("winery");
					res.body.should.have.property("type");
					res.body.should.have.property("year");
					res.body.should.have.property("_id").eql(wine.id);
					done();
				});
			});
		});
	});

	// test the put route
	describe("/PUT :wineid", () => {
		it("it should UPDATE a wine given an id", (done) => {
			let wine = new Wine({
				name: "Love",
				winery: "Sandy Beach",
				type: "Blend",
				year: 2011
			});
			wine.save((err, wine) => {
				chai.request(server)
				.put(`/api/wine/${wine.id}`)
				.send({
					name: "Love",
					winery: "Sandy Beach",
					type: "Blend",
					year: 2009
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.a("object");
					res.body.should.have.property("message").eql("Updated wine!");
					res.body.wine.should.have.property("year").eql(2009);
					done();
				});
			});
		});
	});

	// test the delete route
	describe("/DELETE :wineid", () => {
		it("it should DELETE a wine given an id", (done) => {
			let wine = new Wine({
				name: "Love",
				winery: "Sandy Beach",
				type: "Blend",
				year: 2011
			});
			wine.save((err, wine) => {
				chai.request(server)
				.delete(`/api/wine/${wine.id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.a("object");
					res.body.should.have.property("message").eql("Removed wine.");
					res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
					done();
				});
			});
		});
	});
});