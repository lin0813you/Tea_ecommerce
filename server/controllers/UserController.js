import UserService from '../services/UserService.js';

export const register = async (req, res, next) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UserService.login(req.body.username, req.body.password);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
