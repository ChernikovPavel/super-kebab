const router = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");
const cookieConfig = require("../../configs/cookieConfig");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendCourierApprovalEmail(courierInfo) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Новый запрос на регистрацию курьера",
    html: `
      <h1>Новый курьер зарегистрировался</h1>
      <p>Имя: ${courierInfo.username}</p>
      <p>Email: ${courierInfo.email}</p>
      <p>Нажмите на <a href="http://your-domain.com/admin/couriers/${courierInfo.id}">ссылку</a>, чтобы просмотреть детали и подтвердить курьера.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Сообщение админу о регистрации нового курьера отправлено");
  } catch (error) {
    console.error("Ошибка в отправке email:", error);
  }
}

router
  .post("/signup", async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
      const [user, isCreated] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role,
        },
      });

      if (!isCreated) {
        res.status(400).json({ message: "User alredy exists" });
      } else {
        const plainUser = user.get();
        delete plainUser.password;

        const { accessToken, refreshToken } = generateToken({
          user: plainUser,
        });

        res
          .cookie("refreshToken", refreshToken, cookieConfig.refreshToken)
          .json({ user: plainUser, accessToken });
        if (role === "courier") {
          await sendCourierApprovalEmail(plainUser);
        }
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }

    res.end();
  })
  .post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        res.status(401).json({ message: "Incorrect email or password" });
      } else {
        const plainUser = user.get();
        delete plainUser.password;

        const { accessToken, refreshToken } = generateToken({
          user: plainUser,
        });

        res
          .cookie("refreshToken", refreshToken, cookieConfig.refreshToken)
          .json({ user: plainUser, accessToken });
      }
    } else {
      res.sendStatus(404);
    }
  })
  .get("/logout", (req, res) => {
    try {
      res.clearCookie("refreshToken").sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
