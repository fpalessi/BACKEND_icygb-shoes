import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/find/:id", getProductById);

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
