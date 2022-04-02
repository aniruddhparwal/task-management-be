const bigPromise = require("../middleware/bigPromise");
const user = require("../models/user");

exports.home = bigPromise(async (req, res) => {
  console.log(req.user, "req.user");

  const data = await user.findById(req.user.id, { name: 1 });

  console.log(data, "data");
  res.status(200).json({
    success: true,
    greeting: "Welcome from API",
    data,
  });
});
