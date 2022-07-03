const handleAmenitiesGet = (req, res, db) => {
  const { apid } = req.params;

  db.select("*")
    .from("amenities")
    .where({ apartmentid: apid })
    .then((amen) => {
      res.json(amen[0]);
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleAmenitiesGet,
};
