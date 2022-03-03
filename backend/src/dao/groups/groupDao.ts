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
    id?: mongoose.Types.ObjectId | string
  ): Promise<Group> {
    const group = new Group({
      ...(id ? { _id: id } : {}),
      isActive: true,
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
}

export default new GroupDao();
