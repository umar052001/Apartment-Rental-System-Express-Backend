const handleAmenitiesInsertion = (req, res, db) => {
  const {   id, furnished, gym, gameroom, laundry, studio } = req.body;
  //   if (!furnished || !gym || !gameRoom || !laundry || !studio ) {
  //     return res.status(400).json("incorrect form submission");
  //   }

  db("amenities").insert({
    apartmentid: id,
    furnished: furnished,
    gym: gym,
    gameroom: gameroom,
    laundry: laundry,
    studio: studio
  })
    .then((amenities) => {
      res.json(amenities[0]);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleAmenitiesInsertion: handleAmenitiesInsertion,
};
