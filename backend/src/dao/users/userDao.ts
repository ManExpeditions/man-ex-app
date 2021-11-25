import mongoose from 'mongoose';
import User from '../../models/user';

class UserDao {
  public async create_new_user_by_email(
    email: string,
    encryptedPassword: string
  ): Promise<User> {
    const user = new User({
      email,
      password: encryptedPassword
    });
    const createdUser = await user.save();
    return createdUser;
  }

  public async find_user_by_email(email: string): Promise<User | null> {
    const user = await User.findOne({ email });
    return user;
  }

  public async delete_user_by_id(id: mongoose.Types.ObjectId) {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error('User does not exist.');
      return error;
    }
    await user.remove();
  }
}

export default new UserDao();
