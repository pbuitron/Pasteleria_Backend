import bcrypt from 'bcrypt';
import User from '../model/user.model.js';

class UserManager {
  async createUser(userData) {
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      const newUser = new User({ ...userData, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email }).populate('cart').lean();
      return user;
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }
  }
}

export default UserManager;