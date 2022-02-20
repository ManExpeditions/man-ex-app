import mongoose from 'mongoose';
import Experience from '../../models/experience';

class ExperienceDao {
  public async get_experiences(): Promise<Experience[] | null> {
    const experiences = await Experience.find({});
    return experiences;
  }

  public async create_new_experience(
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
      deposit: 0,
      videoThumbnailImage: 'Sample thumbnail Image',
      video: 'Sample url',
      heroImage: 'Sample image',
      images: ['Sample image']
    });
    const createdExperience = await experience.save();
    return createdExperience;
  }

  public async find_experience_by_id(
    id: mongoose.Types.ObjectId | string
  ): Promise<Experience | null> {
    const experience = await Experience.findById(id);
    return experience;
  }

  public async delete_experience_by_id(id: mongoose.Types.ObjectId | string) {
    const deletedExperience = await Experience.findByIdAndDelete(id);
    return deletedExperience;
  }

  public async update_experience(
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
    experience.videoThumbnailImage =
      experienceInfo.videoThumbnailImage || experience.videoThumbnailImage;
    experience.video = experienceInfo.video || experience.video;
    experience.heroImage = experienceInfo.heroImage || experience.heroImage;
    experience.images = experienceInfo.images || experience.images;
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

  public async delete_all_experiences(): Promise<void> {
    await Experience.deleteMany();
  }
}

export default new ExperienceDao();