const handleApartmentByLocation = (req, res, db) => {
  const { location } = req.body;
  db("apartments")
  .innerJoin("amenities", function () {
    this.on("apartments.apartmentid", "=", "amenities.apartmentid");
  })  .where(function () {
    this.where("location", location)
      .orWhere("price", price)
      .orWhere("rooms", rooms);
  })

  .then((apartment) => {
    res.json(apartment);
  })
  .catch((err) => res.status(400).json(err));
};

    
  
module.exports = {
  handleApartmentByLocation: handleApartmentByLocation,
};
