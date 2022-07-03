const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
//Owner Routes
const registerOwner = require("./controllers/owner/registerOwner");
const signinOwner = require("./controllers/owner/signinOwner");
const ownerProfileUpdate = require("./controllers/owner/ownerProfileUpdate");
const ownerProfileGet = require("./controllers/owner/ownerProfileGet");
//Tenant Routes
const registerTenant = require("./controllers/tenant/registerTenant");
const signinTenant = require("./controllers/tenant/signinTenant");
const tenantProfileGet = require("./controllers/tenant/tenantProfileGet");
const tenantProfile = require("./controllers/tenant/tenantProfile");
//Apartment Routes
const addApartments = require("./controllers/apartments/addApartment");
const updateApartment = require("./controllers/apartments/updateApartment");
const deleteApartment = require("./controllers/apartments/deleteApartment");
const displayApartment = require("./controllers/apartments/displayApartmentsOwner");
const displayApartmentsTenant = require("./controllers/apartments/displayApartmentsTenant");
//Amenities Routes
const addAmenities = require("./controllers/amenities/addAmenities");
const getAmenities = require("./controllers/amenities/displayAmenities");
//Filter Routes
const filterByPrice = require("./controllers/filter/ApartmentByPrice");
const filterByLocation = require("./controllers/filter/ApartmentByLocation");

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

//Owner
app.post("/signinOwner", signinOwner.handleOwnerSignin(db, bcrypt));
app.post("/registerOwner", (req, res) => {
  registerOwner.handleOwnerRegister(req, res, db, bcrypt);
});
app.put("/ownerProfile/:owneremail", (req, res) => {
  ownerProfileUpdate.handleOwnerProfileUpdate(req, res, db);
});
app.get("/ownerProfile/:owneremail", (req, res) => {
  ownerProfileGet.handleOwnerProfileGet(req, res, db);
});

//Tenant
app.post("/signinTenant", signinTenant.handleTenantSignin(db, bcrypt));
app.post("/registerTenant", (req, res) => {
  registerTenant.handleTenantRegister(req, res, db, bcrypt);
});
app.get("/tenantProfile/:tenantemail", (req, res) => {
  tenantProfileGet.handleTenantProfileGet(req, res, db);
});
app.put("/tenantProfile/:tenantemail", (req, res) => {
  tenantProfile.handleTenantProfileUpdate(req, res, db);
});
app.get("/tenantPanel", (req, res) => {
  displayApartmentsTenant.handleApartmentDisplayTenant(req, res, db);
});

// Apartments
app.post("/Apartments/:owneremail", (req, res) => {
  addApartments.handleApartmentInsertion(req, res, db);
});
app.put("/Apartments/:apid", (req, res) => {
  updateApartment.handleApartmentUpdate(req, res, db);
});
app.delete("/Apartments/:apid", (req, res) => {
  deleteApartment.handleApartmentDelete(req, res, db);
});

//Filter
app.post("/:id/Apartments", (req, res) => {
  filterByLocation.handleApartmentByLocation(req, res, db);
});
app.post("/:id/Apartments", (req, res) => {
  filterByPrice.handleApartmentByPrice(req, res, db);
});

//Amenities
app.post("/Amenities/:apid", (req, res) => {
  addAmenities.handleAmenitiesInsertion(req, res, db);
});
app.get("/Amenities/:apid", (req, res) => {
  getAmenities.handleAmenitiesGet(req, res, db);
});
app.get("/ownerPanel/:owneremail", (req, res) => {
  displayApartment.handleApartmentDisplay(req, res, db);
});

//Port
app.listen(3001, () => {
  console.log("app is running on port 3001");
});
