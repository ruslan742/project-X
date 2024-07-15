const { Router } = require("express");

const { User } = require("../../db/models");

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, email } = req.body;

  // if (!(username && email && password)) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { username},
  });

  if (!created) return res.status(403).json({ message: "User already exists" });

  // const plainUser = user.get();
  // delete plainUser.password;

  // const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  // return res.cookie("refreshToken", refreshToken, cookiesConfig.refresh).json({ user: plainUser, accessToken });
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!(email && password)) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const user = await User.findOne({ where: { email } });

//   if (!user) {
//     return res.status(401).json({ message: "Incorrect user or password" });
//   }

//   const correctPass = await bcrypt.compare(password, user.password);
//   if (!correctPass) {
//     return res.status(401).json({ message: "Incorrect user or password" });
//   }

//   const plainUser = user.get();
//   delete plainUser.password;

//   const { accessToken, refreshToken } = generateTokens({ user: plainUser });

//   return res.cookie("refreshToken", refreshToken, cookiesConfig.refresh).json({ user: plainUser, accessToken });
// });

// router.get("/logout", (req, res) => {
//   res.clearCookie("refreshToken").sendStatus(200);
// });

module.exports = router;
