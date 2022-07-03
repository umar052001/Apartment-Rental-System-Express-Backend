const handleTenantProfileUpdate = (req, res, db) => {
  const { tenantemail } = req.params;
  const { name, phone } = req.body;
  db.select("*")
    .from("tenant")
    .where({ tenantemail })
    .then((tenant) => {
      if (tenant.length) {
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
  handleTenantProfileUpdate,
};
