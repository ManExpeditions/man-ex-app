import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../models/user';

class UserDao {
  public async createNewUserByEmail(
    email: string,
    encryptedPassword: string,
    id?: mongoose.Types.ObjectId | string
  ): Promise<User> {
    const user = new User({
      ...(id ? { _id: id } : {}),
      email,
      password: encryptedPassword
    });
    const createdUser = await user.save();
    return createdUser;
  }

  public async getUsers(): Promise<User[] | null> {
    const users = await User.find({}).populate('favorites');
    return users;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ email });
    return user;
  }

  public async findUserById(
    id: mongoose.Types.ObjectId | string
  ): Promise<User | null> {
    const user = await User.findById(id).populate('favorites');
    return user;
  }

  public async deleteUserById(id: mongoose.Types.ObjectId | string) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }

  public async updateUser(
    id: mongoose.Types.ObjectId | string,
    userInfo: User
  ): Promise<User | null> {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }

    const saltRounds = 10;
    const isHashed = (password: string): boolean => {
      if (password.length <= 30) return false;
      return true;
    };

    user.isActive = userInfo.isActive || user.isActive;
    user.firstName = userInfo.firstName || user.firstName;
    user.lastName = userInfo.lastName || user.lastName;
    user.email = userInfo.email || user.email;
    user.phone = userInfo.phone || user.phone;
    user.password =
      userInfo.password && !isHashed(userInfo.password)
        ? await bcrypt.hash(userInfo.password, saltRounds)
        : user.password;
    user.emailVerified = userInfo.emailVerified || user.emailVerified;
    user.phoneVerified = userInfo.phoneVerified || user.phoneVerified;
    user.gender = userInfo.gender || user.gender;
    user.language = userInfo.language || user.language;
    user.interests = userInfo.interests || user.interests;
    user.continents = userInfo.continents || user.continents;
    user.city = userInfo.city || user.city;
    user.state = userInfo.state || user.state;
    user.country = userInfo.country || user.country;
    user.profilepic = userInfo.profilepic
      ? decodeURIComponent(userInfo.profilepic)
      : user.profilepic;
    user.profilepicVerified =
      userInfo.profilepicVerified || user.profilepicVerified;
    user.verificationProfilepic =
      userInfo.verificationProfilepic || user.verificationProfilepic;
    user.bio = userInfo.bio || user.bio;
    user.socials = userInfo.socials || user.socials;
    user.completedOnboarding =
      userInfo.completedOnboarding || user.completedOnboarding;

    const updatedUser = await user.save();
    return updatedUser;
  }

  public async deleteAllUsers(): Promise<void> {
    await User.deleteMany();
  }

  public async verifyUserEmail(
    user: User,
    email: string
  ): Promise<User | null> {
    user.email = email;
    user.emailVerified = true;
    const updatedUser = await this.updateUser(user._id, user);
    return updatedUser;
  }

  public async verifyAndUpdatePhone(
    user: User,
    phone: string
  ): Promise<User | null> {
    user.phone = phone;
    user.phoneVerified = true;
    const updatedUser = await this.updateUser(user._id, user);
    return updatedUser;
  }
}

export default new UserDao();
