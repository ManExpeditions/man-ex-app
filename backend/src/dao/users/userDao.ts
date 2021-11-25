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
}

export default new UserDao();
