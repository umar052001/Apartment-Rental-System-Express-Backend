const handleOwnerProfileUpdate = (req, res, db) => {
  const { owneremail } = req.params;
  const { ownerphone } = req.params;

  db.select("*")
    .from("owners")
    .where({ owneremail })
    .then((owner) => {
      if (owner.length) {
        db.select("ownerphone")
          .from("owners")
          .update({ ownerphone })
          .catch((err) => res.status(400).json("incorrect data"));
        res.json(owner[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleOwnerProfileUpdate,
};
