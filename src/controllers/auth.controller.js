import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserManager from '../manager/user_manager.js';

const userManager = new UserManager();

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userManager.getUserByEmail(email);
    if (!user) {
      return res.redirect('/register');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.redirect('/login');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const register = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const existingUser = await userManager.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const newUser = await userManager.createUser({ first_name, last_name, email, age, password });
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};