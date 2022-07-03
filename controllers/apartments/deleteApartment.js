const handleApartmentDelete = (req, res, db) => {
  const { apid } = req.params;

  db("apartments")
    .where({ apartmentid: apid })
    .del()
    .then((apartment) => {
      res.json(apartment[0]);
    })
    .catch((err) => res.status(400).json("unable to delete data"));
  db("amenities")
    .where({ apartmentid: apid })
    .del()
    .then((amen) => {
      res.json(amen[0]);
    })
    .catch((err) => res.status(400).json("unable to delete data"));
};

module.exports = {
  handleApartmentDelete: handleApartmentDelete,
};
