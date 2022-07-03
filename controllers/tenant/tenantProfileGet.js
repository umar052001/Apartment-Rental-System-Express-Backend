const handleTenantProfileGet = (req, res, db) => {
  const { tenantemail } = req.params;
  db.select("*")
    .from("tenant")
    .where({ tenantemail })
    .then((tenant) => {
      res.json(tenant[0]);
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleTenantProfileGet,
};
