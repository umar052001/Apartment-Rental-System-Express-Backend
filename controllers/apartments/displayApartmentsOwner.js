const handleApartmentDisplay = (req, res, db) => {
  const{owneremail} = req.params
  db.select()
    .from("apartments").where("owneremail", "=",owneremail)
    .then((apartment) => {
      res.json(apartment);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleApartmentDisplay: handleApartmentDisplay,
};
