const handleApartmentUpdate = (req, res, db) => {
  const { apid } = req.params;
  const { floors, rooms, washrooms, description, location, price } = req.body;
  if (!rooms || !price || !location) {
    return res.status(400).json("incorrect form submission");
  }
  db("apartments")
    .where({ apartmentid: apid })
    .update({
      floors: floors,
      loc: location,
      description: description,
      price: price,
      rooms: rooms,
      washrooms: washrooms,
    })
    .then((apartment) => {
      res.json(apartment[0]);
    })
    .catch((err) => res.status(400).json("unable to update data"));
};

module.exports = {
  handleApartmentUpdate: handleApartmentUpdate,
};
