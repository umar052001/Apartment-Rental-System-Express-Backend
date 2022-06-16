const handleApartmentInsertion = (req, res, db) => {
  const { owneremail } = req.params;
  const { floors, rooms, washrooms, description, location, price } = req.body;
  if (!rooms || !price || !location) {
    return res.status(400).json("incorrect form submission");
  }

  db.select("*")
    .from("owners")
    .where({ owneremail })
    .returning("owneremail")
    .then((ownerEmail) => {
      return db
        .insert({
          owneremail: ownerEmail[0].owneremail,
          floors: floors,
          loc: location,
          description: description,
          price: price,
          rooms: rooms,
          washrooms: washrooms,
        })
        .into("apartments")
    })
    .then((apartment) => {
      res.json(apartment[0]);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleApartmentInsertion: handleApartmentInsertion,
};
