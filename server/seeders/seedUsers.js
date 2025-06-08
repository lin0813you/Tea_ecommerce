import User from '../models/User.js';

const users = [
  { id: 'clerk001', username: '0000', password: '0000', role: 'clerk', name: '店員一號' },
];

export default async function seedUsers() {
  const count = await User.count();
  if (count === 0) {
    await User.bulkCreate(users);
    console.log('使用者資料已初始化');
  }
}
