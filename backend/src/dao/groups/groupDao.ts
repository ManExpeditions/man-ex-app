import mongoose from 'mongoose';
import Group from '../../models/group';

class GroupDao {
  public async getGroups(experienceId?: string): Promise<Group[] | null> {
    // Optionally find groups relating to a specific experience
    const experienceFilter = experienceId ? { experience: experienceId } : {};

    const groups = await Group.find({ ...experienceFilter });
    return groups;
  }

  public async findGroupById(
    id: mongoose.Types.ObjectId | string
  ): Promise<Group | null> {
    const group = await Group.findById(id);
    return group;
  }

  public async createNewGroup(
    experienceId?: mongoose.Types.ObjectId | string,
    id?: mongoose.Types.ObjectId | string
  ): Promise<Group> {
    const group = new Group({
      ...(id ? { _id: id } : {}),
      isActive: true,
      experience:
        typeof experienceId === 'string'
          ? new mongoose.Types.ObjectId(experienceId)
          : experienceId,
      name: 'Sample group',
      startDate: Date.now(),
      endDate: Date.now(),
      registrationEndDate: Date.now(),
      dateText: 'March 7-10 2022',
      price: 0,
      thriveCartScriptId: 'This script is obtained from thrivecart.',
      capacity: 0,
      description: 'This is a sample description'
    });
    const createdGroup = await group.save();
    return createdGroup;
  }

  public async updateGroup(
    id: mongoose.Types.ObjectId | string,
    groupInfo: Group
  ): Promise<Group | null> {
    const group = await Group.findById(id);
    if (!group) {
      return null;
    }

    group.isActive = groupInfo.isActive || group.isActive;
    group.startDate = groupInfo.startDate || group.startDate;
    group.endDate = groupInfo.endDate || group.endDate;
    group.registrationEndDate =
      groupInfo.registrationEndDate || group.registrationEndDate;
    group.dateText = groupInfo.dateText || group.dateText;
    group.price = groupInfo.price || group.price;
    group.thriveCartScriptId =
      groupInfo.thriveCartScriptId || group.thriveCartScriptId;
    group.capacity = groupInfo.capacity || group.capacity;
    group.description = groupInfo.description || group.description;
    group.groupLead = groupInfo.groupLead || group.groupLead;

    // Update going users
    if (groupInfo.goingUsers) {
      if (groupInfo.goingUsers === 'empty') {
        group.goingUsers = [];
      } else {
        group.goingUsers = decodeURIComponent(groupInfo.goingUsers)
          .split(',')
          .map((id) => new mongoose.Types.ObjectId(String(id)));
      }
    }

    // Update interested users
    if (groupInfo.interestedUsers) {
      if (groupInfo.interestedUsers === 'empty') {
        group.interestedUsers = [];
      } else {
        group.interestedUsers = decodeURIComponent(groupInfo.interestedUsers)
          .split(',')
          .map((id) => new mongoose.Types.ObjectId(String(id)));
      }
    }

    const updatedGroup = await group.save();
    return updatedGroup;
  }

  public async deleteGroupById(id: mongoose.Types.ObjectId | string) {
    const deletedGroup = await Group.findByIdAndDelete(id);
    return deletedGroup;
  }

  public userExistsInGroupGoingUsers = (
    userId: mongoose.Types.ObjectId | string,
    group: Group
  ): boolean => {
    const userFound = group.goingUsers.find((user: mongoose.Types.ObjectId) =>
      user.equals(userId)
    );
    return userFound ? true : false;
  };

  public userExistsInGroupInterestedUsers = (
    userId: mongoose.Types.ObjectId | string,
    group: Group
  ): boolean => {
    const userFound = group.interestedUsers.find(
      (user: mongoose.Types.ObjectId) => user.equals(userId)
    );
    return userFound ? true : false;
  };

  public async addGoingUserToGroup(
    group: Group,
    userId: mongoose.Types.ObjectId | string
  ) {
    const userObjectId =
      typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    group.goingUsers.push(userObjectId);
    const updatedGroup = await group.save();
    return updatedGroup;
  }

  public async addInterestedUserToGroup(
    group: Group,
    userId: mongoose.Types.ObjectId | string
  ) {
    const userObjectId =
      typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    group.interestedUsers.push(userObjectId);
    const updatedGroup = await group.save();
    return updatedGroup;
  }
}

export default new GroupDao();
