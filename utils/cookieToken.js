const cookieToken = async (user, res) => {
  const token = await user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_TIME),
    httpOnly: true,
    domain: "https://task-managemnt.netlify.app",
  };

  user.password = undefined;
  console.log("token", token);

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
