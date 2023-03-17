import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { jwtSecret } from "../helpers/jwtSecret.js";

const register = async (req, res) => {
  const { username, email, password, phone, address, city, card } = req.body;
  const validate = await User.findOne({ email: email });
  if (validate) {
    const error = new Error(
      `Ya existe un usuario registrado con este correo $(${email})`
    );
    return res.status(400).json({ msg: error.message });
  }
  const bcryptSalt = bcrypt.genSaltSync(4);
  try {
    const user = await User.create({
      username,
      email,
      phone,
      address,
      city,
      card,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({
      msg: `Usuario creado correctamente: ${user}`,
    });
  } catch (error) {
    res.status(402).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error(
      `No existe ningún usuario con el correo introducido (${email})`
    );
    return res.status(404).json({ msg: error.message });
  } else {
    // Email is correct, check now pwds
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (passwordValid) {
      // Sign JWT
      jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      const error = new Error("La constraseña introducida no es correcta");
      return res.status(403).json({ msg: error.message });
    }
  }
};
const profile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userInfo) => {
      if (error) throw error;
      const { username, email, _id, phone, address, city, card, orders } =
        await User.findById(userInfo.id);
      res.json({ username, email, _id, phone, address, city, card, orders });
    });
  } else {
    res.json(null);
  }
};
const logOut = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(1),
    })
    .json(true);
};

export { register, login, logOut, profile };
