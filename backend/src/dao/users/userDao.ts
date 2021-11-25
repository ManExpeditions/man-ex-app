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

  public async find_user_by_id(
    id: mongoose.Types.ObjectId
  ): Promise<User | null> {
    const user = await User.findById(id);
    return user;
  }

  public async delete_user_by_id(id: mongoose.Types.ObjectId) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }

  public async update_user(
    id: mongoose.Types.ObjectId,
    userInfo: User
  ): Promise<User | null> {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    user.firstName = userInfo.firstName || user.firstName;
    user.lastName = userInfo.lastName || user.lastName;
    user.email = userInfo.email || user.email;
    user.phone = userInfo.phone || user.phone;
    user.password = userInfo.password || user.password;
    user.emailVerified = userInfo.emailVerified || user.emailVerified;
    user.phoneVerified = userInfo.phoneVerified || user.phoneVerified;
    user.gender = userInfo.gender || user.gender;
    user.language = userInfo.language || user.language;
    user.interests = userInfo.interests || user.interests;
    user.continents = userInfo.continents || user.continents;
    user.city = userInfo.city || user.city;
    user.state = userInfo.state || user.state;
    user.country = userInfo.country || user.country;
    user.profilepic = userInfo.profilepic || user.profilepic;
    user.profilepicVerified =
      userInfo.profilepicVerified || user.profilepicVerified;
    user.verificationProfilepic =
      userInfo.verificationProfilepic || user.verificationProfilepic;
    user.socials = userInfo.socials || user.socials;
    user.completedOnboarding =
      userInfo.completedOnboarding || user.completedOnboarding;

    const updatedUser = await user.save();
    return updatedUser;
  }
}

export default new UserDao();
