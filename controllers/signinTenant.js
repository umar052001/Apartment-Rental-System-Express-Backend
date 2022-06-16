const handleTenantSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("incorrect form submission");
    }
    db.select("email", "hash")
      .from("logintenant")
      .where("email", "=", email)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          return db
            .select("*")
            .from("logintenant")
            .where("email", "=", email)
            .then((tenant) => {
              res.json(tenant[0]);
            })
            .catch((err) => res.status(400).json("unable to get user"));
        } else {
          res.status(400).json("wrong credentials");
        }
      })
      .catch((err) => res.status(400).json("wrong credentials"));
  };
  
  module.exports = {
    handleTenantSignin: handleTenantSignin,
  };
  