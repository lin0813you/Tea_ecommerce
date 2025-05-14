// controllers/productController.js
import ProductService from '../services/productService.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await ProductService.getById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProd = await ProductService.create(req.body);
    res.status(201).json({ success: true, data: newProd });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await ProductService.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await ProductService.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
