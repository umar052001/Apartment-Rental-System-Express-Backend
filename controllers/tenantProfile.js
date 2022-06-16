const handleTenantProfileGet = (req, res, db) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  db.select("*")
    .from("tenant")
    .where({ ownerid: id })
    .then((owner) => {
      if (owner.length) {
        db.select("tenantname, tenantphone")
          .from("tenant")
          .update({
            tenantname: name,
            tenantphone: phone,
          })
          .catch((err) => res.status(400).json("incorrect data"));
        res.json(owner[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleTenantProfileGet,
};
