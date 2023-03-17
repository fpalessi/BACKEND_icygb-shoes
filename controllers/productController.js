import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("El producto ha sido eliminado");
  } catch (error) {
    res.status(500).json(error);
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qBrand = req.query.brand;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qBrand) {
      products = await Product.find({ brand: { $in: [qBrand] } });
    } else {
      // if there is no query
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
};
