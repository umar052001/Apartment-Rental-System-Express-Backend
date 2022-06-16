const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const registerOwner = require("./controllers/registerOwner");
const registerTenant = require("./controllers/registerTenant");
const signinOwner = require("./controllers/signinOwner");
const signinTenant = require("./controllers/signinTenant");
const ownerProfileUpdate = require("./controllers/ownerProfileUpdate");
const ownerProfileGet = require("./controllers/ownerProfileGet");
const tenantProfile = require("./controllers/tenantProfile");
const addApartments = require("./controllers/addApartment");
const updateApartment = require("./controllers/updateApartment");
const deleteApartment = require("./controllers/deleteApartment");
const displayApartment = require("./controllers/displayApartmentsOwner");
const filterByLocation = require("./controllers/filter/ApartmentByLocation");
const filterByPrice = require("./controllers/filter/ApartmentByPrice");

const addAmenities = require("./controllers/addAmenities");
const getAmenities = require("./controllers/displayAmenities");
const displayApartmentsTenant = require("./controllers/displayApartmentsTenant");

const db = knex({
  // connect to database:
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1234",
    database: "Project",
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(db.owners);
  res.send(db.tenant);
});
app.post("/signinOwner", signinOwner.handleOwnerSignin(db, bcrypt));
app.post("/signinTenant", signinTenant.handleTenantSignin(db, bcrypt));
app.post("/registerOwner", (req, res) => {
  registerOwner.handleOwnerRegister(req, res, db, bcrypt);
});
app.post("/registerTenant", (req, res) => {
  registerTenant.handleTenantRegister(req, res, db, bcrypt);
});
app.put("/ownerProfile/:owneremail", (req, res) => {
  ownerProfileUpdate.handleOwnerProfileUpdate(req, res, db);
});
app.get("/ownerProfile/:owneremail", (req, res) => {
  ownerProfileGet.handleOwnerProfileGet(req, res, db);
});
app.put("/tenantProfile/:id", (req, res) => {
  tenantProfile.handleTenantProfileUpdate(req, res, db);
});
// Owners functionalities
app.post("/Apartments/:owneremail", (req, res) => {
  addApartments.handleApartmentInsertion(req, res, db);
});
app.post("/Amenities/:apid", (req, res) => {
  addAmenities.handleAmenitiesInsertion(req, res, db);
});
app.get("/Amenities/:apid", (req, res) => {
  getAmenities.handleAmenitiesGet(req, res, db);
});
app.put("/Apartments/:apid", (req, res) => {
  updateApartment.handleApartmentUpdate(req, res, db);
});
app.delete("/Apartments/:apid", (req, res) => {
  deleteApartment.handleApartmentDelete(req, res, db);
});
app.get("/ownerPanel/:owneremail", (req, res) => {
  displayApartment.handleApartmentDisplay(req, res, db);
});
// Tenant Functionalities
app.get("/tenantPanel", (req, res) => {
  displayApartmentsTenant.handleApartmentDisplayTenant(req, res, db);
});
app.post("/:id/Apartments", (req, res) => {
  filterByLocation.handleApartmentByLocation(req, res, db);
});
app.post("/:id/Apartments", (req, res) => {
  filterByPrice.handleApartmentByPrice(req, res, db);
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
