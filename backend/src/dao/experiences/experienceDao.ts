import mongoose from 'mongoose';
import Experience from '../../models/experience';

class ExperienceDao {
  public async getExperiences(): Promise<Experience[] | null> {
    const experiences = await Experience.find({});
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
    const experience = await Experience.findById(id);
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
    experience.name = experienceInfo.name || experience.name;
    experience.description =
      experienceInfo.description || experience.description;
    experience.numberOfDays =
      experienceInfo.numberOfDays || experience.numberOfDays;
    experience.location = experienceInfo.location || experience.location;
    experience.continent = experienceInfo.continent || experience.continent;
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
      ? experienceInfo.images.map((image) => decodeURIComponent(image))
      : experience.images;
    experience.itinerary = experienceInfo.itinerary || experience.itinerary;
    experience.accomodations =
      experienceInfo.accomodations || experience.accomodations;
    experience.activities = experienceInfo.activities || experience.activities;
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

  // public async add_going_user_to_experience_group(
  //   label: string,
  //   userId: mongoose.Types.ObjectId
  // ) {
  //   // const experience = await this.find_experience_by_group_label(label);
  //   // experience?.groups
  //   //   .find((group) => group.label === label)
  //   //   ?.goingUsers.push({ userId: String(userId) });
  //   // const updatedExperience = await experience?.save();
  //   // return updatedExperience;
  // }

  public async deleteAllExperiences(): Promise<void> {
    await Experience.deleteMany();
  }
}

export default new ExperienceDao();
