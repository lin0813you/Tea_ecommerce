import User from '../models/User.js';

class UserService {
  static async register({ phone, username, password, role = 'customer', name }) {
    const exists = await User.findByPk(phone);
    if (exists) throw new Error('User already exists');
    const user = await User.create({ phone, username, password, role, name });
    return user;
  }

  static async login(username, password) {
    return await User.findOne({ where: { username, password } });
  }
}

export default UserService;
