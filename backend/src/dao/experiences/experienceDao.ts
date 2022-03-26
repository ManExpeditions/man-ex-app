import mongoose from 'mongoose';
import Experience from '../../models/experience';

class ExperienceDao {
  public async getExperiences(filter: {
    isActive?: boolean;
    isFeatured?: boolean;
  }): Promise<Experience[] | null> {
    const experiences = await Experience.find(filter);
    return experiences;
  }

  public async createNewExperience(
    id?: mongoose.Types.ObjectId | string
  ): Promise<Experience> {
    const experience = new Experience({
      ...(id ? { _id: id } : {}),
      isActive: true,
      name: 'Sample Name',
      description: 'Sample Description',
      numberOfDays: 0,
      location: 'Sample Location',
      continent: 'Sample Continent',
      season: 'Sample Season',
      pricing: 0,
      deposit: 0
    });
    const createdExperience = await experience.save();
    return createdExperience;
  }

  public async findExperienceById(
    id: mongoose.Types.ObjectId | string
  ): Promise<Experience | null> {
    const experience = await Experience.findById(id)
      .populate({
        path: 'groups',
        populate: {
          path: 'groupLead',
          select: ['_id', 'profilepic', 'firstName']
        }
      })
      .populate({
        path: 'groups',
        populate: {
          path: 'goingUsers',
          select: ['_id', 'profilepic', 'firstName']
        }
      })
      .populate({
        path: 'groups',
        populate: {
          path: 'interestedUsers',
          select: ['_id', 'profilepic', 'firstName']
        }
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: ['profilepic', 'firstName', 'lastName']
        }
      });

    return experience;
  }

  public async deleteExperienceById(id: mongoose.Types.ObjectId | string) {
    const deletedExperience = await Experience.findByIdAndDelete(id);
    return deletedExperience;
  }

  public async updateExperience(
    id: mongoose.Types.ObjectId | string,
    experienceInfo: Experience
  ): Promise<Experience | null> {
    const experience = await Experience.findById(id);
    if (!experience) {
      return null;
    }

    experience.isActive = experienceInfo.isActive || experience.isActive;
    experience.isFeatured = experienceInfo.isFeatured || experience.isFeatured;
    experience.name = experienceInfo.name || experience.name;
    experience.description =
      experienceInfo.description || experience.description;
    experience.numberOfDays =
      experienceInfo.numberOfDays || experience.numberOfDays;
    experience.location = experienceInfo.location || experience.location;
    experience.continent = experienceInfo.continent
      ? decodeURIComponent(experienceInfo.continent)
      : experience.continent;
    experience.season = experienceInfo.season || experience.season;
    experience.pricing = experienceInfo.pricing || experience.pricing;
    experience.deposit = experienceInfo.deposit || experience.deposit;
    experience.videoThumbnailImage = experienceInfo.videoThumbnailImage
      ? decodeURIComponent(experienceInfo.videoThumbnailImage)
      : experience.videoThumbnailImage;
    experience.video = experienceInfo.video
      ? decodeURIComponent(experienceInfo.video)
      : experience.video;
    experience.heroImage = experienceInfo.heroImage
      ? decodeURIComponent(experienceInfo.heroImage)
      : experience.heroImage;
    experience.images = experienceInfo.images
      ? JSON.parse(decodeURIComponent(experienceInfo.images))
      : experience.images;
    experience.itinerary = experienceInfo.itinerary
      ? JSON.parse(decodeURIComponent(experienceInfo.itinerary))
      : experience.itinerary;
    experience.accomodations = experienceInfo.accomodations
      ? JSON.parse(decodeURIComponent(experienceInfo.accomodations))
      : experience.accomodations;
    experience.activities = experienceInfo.activities
      ? JSON.parse(decodeURIComponent(experienceInfo.activities))
      : experience.activities;
    experience.reviews = experienceInfo.reviews
      ? JSON.parse(decodeURIComponent(experienceInfo.reviews))
      : experience.reviews;
    experience.whatsIncluded =
      experienceInfo.whatsIncluded || experience.whatsIncluded;
    experience.terms = experienceInfo.terms || experience.terms;

    const updatedExperience = await experience.save();
    return updatedExperience;
  }

  public async find_experience_by_group_label(label: string) {
    const experience = await Experience.findOne({
      'groups.label': label
    });
    return experience;
  }

  public async addGroupToExperience(
    experience: Experience,
    groupId: mongoose.Types.ObjectId
  ) {
    experience.groups.push(groupId);
    await experience?.save();
  }

  public async deleteGroupFromExperience(
    experienceId: mongoose.Types.ObjectId | string,
    groupId: string
  ) {
    const experience = await Experience.findById(experienceId);
    const groupIdx = experience?.groups.indexOf(
      mongoose.Types.ObjectId(groupId)
    );
    experience?.groups.splice(groupIdx as number, 1);
    await experience?.save();
  }

  public userExistsInExperienceInterestedUsers = (
    userId: mongoose.Types.ObjectId | string,
    experience: Experience
  ): boolean => {
    const userFound = experience.interestedUsers.find(
      (user: mongoose.Types.ObjectId) => user.equals(userId)
    );
    return userFound ? true : false;
  };

  public async addInterestedUserToExperience(
    userId: mongoose.Types.ObjectId | string,
    experience: Experience
  ) {
    const userObjectId =
      typeof userId === 'string' ? mongoose.Types.ObjectId(userId) : userId;
    experience.interestedUsers.push(userObjectId);
    const updatedExperience = await experience.save();
    return updatedExperience;
  }

  public async deleteAllExperiences(): Promise<void> {
    await Experience.deleteMany();
  }
}

export default new ExperienceDao();
