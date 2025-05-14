import Product from '../models/Product.js';

class ProductService {
  /** 取得全部商品 */
  static async getAll() {
    return await Product.findAll();
  }

  /** 以 ID 取得單一商品 */
  static async getById(id) {
    return await Product.findByPk(id);
  }

  /** 新增商品 */
  static async create({ name, description, price }) {
    return await Product.create({ name, description, price });
  }

  /** 更新商品 */
  static async update(id, { name, description, price }) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    return await product.update({ name, description, price });
  }

  /** 刪除商品 */
  static async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.destroy();
    return { success: true };
  }
}

export default ProductService;