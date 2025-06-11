import User from '../models/User.js';

const users = [
  { phone: '0912345678', username: '0000', password: '0000', role: 'clerk', name: '店員一號' },
];

export default async function seedUsers() {
  const count = await User.count();
  if (count === 0) {
    await User.bulkCreate(users);
    console.log('使用者資料已初始化');
  }
}
