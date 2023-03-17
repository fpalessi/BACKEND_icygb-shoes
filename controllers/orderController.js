import Order from "../models/Order.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../helpers/jwtSecret.js";

const makeOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userInfo) => {
      if (error) throw error;
      const orders = await Order.find({ user: userInfo.id });
      res.json({ orders });
    });
  } else {
    res.json(null);
  }
};

export { makeOrder, getOrders };
