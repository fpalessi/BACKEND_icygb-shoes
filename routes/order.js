import express from "express";

import { makeOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", makeOrder);

router.get("/", getOrders);

export default router;
