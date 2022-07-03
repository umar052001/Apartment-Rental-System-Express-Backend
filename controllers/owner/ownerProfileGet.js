const handleOwnerProfileGet = (req, res, db) => {
  const { owneremail } = req.params;

  db.select("*")
    .from("owners")
    .where({ owneremail })
    .then((owner)=>{
        res.json(owner[0])
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleOwnerProfileGet,
};
