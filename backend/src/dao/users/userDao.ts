import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../models/user';

class UserDao {
  public async createNewUserByEmail(
    email: string,
    encryptedPassword: string,
    id?: mongoose.Types.ObjectId | string,
    isAdmin = false
  ): Promise<User> {
    const user = new User({
      ...(id ? { _id: id } : {}),
      email,
      password: encryptedPassword
    });
    const createdUser = await user.save();
    // If user is admin
    if (isAdmin) {
      createdUser.adminUser = true;
      const adminUser = await createdUser.save();
      return adminUser;
    }
    return createdUser;
  }

  public async getUsers(): Promise<User[] | null> {
    const users = await User.find({});
    return users;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ email });
    return user;
  }

  public async findUserById(
    id: mongoose.Types.ObjectId | string
  ): Promise<User | null> {
    const user = await User.findById(id);
    return user;
  }

  public async findUserByIdAndPopulate(
    id: mongoose.Types.ObjectId | string
  ): Promise<User | null> {
    const user = await User.findById(id)
      .populate({
        path: 'favorites',
        populate: {
          path: 'experiences',
          select: ['_id', 'videoThumbnailImage', 'video', 'firstName']
        }
      })
      .populate({
        path: 'favorites',
        populate: {
          path: 'groups',
          select: ['_id', 'dateText', 'description', 'price'],
          populate: [
            {
              path: 'groupLead',
              select: ['_id', 'firstName', 'profilepic']
            },
            {
              path: 'experience',
              select: ['_id', 'video', 'videoThumbnailImage']
            }
          ]
        }
      });

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
    const user = await this.findUserById(id);
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

  public experienceExistsInFavorites = (
    experienceId: mongoose.Types.ObjectId | string,
    user: User
  ): boolean => {
    const experienceFound = user.favorites.experiences.find(
      (experience: mongoose.Types.ObjectId) => experience.equals(experienceId)
    );
    return experienceFound ? true : false;
  };

  public memberExistsInFavorites = (
    memberId: mongoose.Types.ObjectId | string,
    user: User
  ): boolean => {
    const memberFound = user.favorites.members.find(
      (member: mongoose.Types.ObjectId) => member.equals(memberId)
    );
    return memberFound ? true : false;
  };

  public groupExistsInFavorites = (
    groupId: mongoose.Types.ObjectId | string,
    user: User
  ): boolean => {
    const groupFound = user.favorites.groups.find(
      (group: mongoose.Types.ObjectId) => group.equals(groupId)
    );
    return groupFound ? true : false;
  };

  public async addExperienceToFavorites(
    experienceId: mongoose.Types.ObjectId | string,
    user: User
  ) {
    const experienceObjectId =
      typeof experienceId === 'string'
        ? mongoose.Types.ObjectId(experienceId)
        : experienceId;
    user.favorites.experiences.push(experienceObjectId);
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async addMemberToFavorites(
    memberId: mongoose.Types.ObjectId | string,
    user: User
  ) {
    const memberObjectId =
      typeof memberId === 'string'
        ? mongoose.Types.ObjectId(memberId)
        : memberId;
    user.favorites.members.push(memberObjectId);
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async addGroupToFavorites(
    groupId: mongoose.Types.ObjectId | string,
    user: User
  ) {
    const groupObjectId =
      typeof groupId === 'string' ? mongoose.Types.ObjectId(groupId) : groupId;
    user.favorites.groups.push(groupObjectId);
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async removeExperienceFromFavorites(
    experienceId: mongoose.Types.ObjectId | string,
    user: User
  ) {
    const index = user.favorites.experiences.indexOf(experienceId);
    if (index > -1) {
      user.favorites.experiences.splice(index, 1);
    }
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async removeMemberFromFavorites(
    memberId: mongoose.Types.ObjectId | string,
    user: User
  ) {
    const index = user.favorites.members.indexOf(memberId);
    if (index > -1) {
      user.favorites.members.splice(index, 1);
    }
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async removeGroupFromFavorites(
    groupId: mongoose.Types.ObjectId | string,
    user: User
  ) {
    const index = user.favorites.groups.indexOf(groupId);
    if (index > -1) {
      user.favorites.groups.splice(index, 1);
    }
    const updatedUser = await user.save();
    return updatedUser;
  }
}

export default new UserDao();
