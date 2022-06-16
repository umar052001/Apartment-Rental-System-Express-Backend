const handleApartmentByPrice = (req, res, db) => {
    const { price } = req.body;
    db.select()
      .from("apartments")
      .where({ price })
      .then((apartment) => {
        res.json(apartment[0]);
      })
      .catch((err) => res.status(400).json("unable to get data"));
  };
  
  module.exports = {
    handleApartmentByPrice: handleApartmentByPrice,
  };
  