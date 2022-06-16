const handleTenantRegister = (req, res, db, bcrypt) => {
  const { email, name, password, address, city, phone } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("logintenant")
      .returning("email")
      .then((loginEmail) => {
        return trx("tenant")
          .returning("*")
          .insert({
            tenantemail: loginEmail[0].email,
            tenantname: name,
            tenantaddress: address,
            tenantcity: city,
            tenantphone: phone,
          })
          .then((owner) => {
            res.json(owner[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleTenantRegister: handleTenantRegister,
};
