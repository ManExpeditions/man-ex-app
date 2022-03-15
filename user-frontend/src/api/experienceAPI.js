import Axios from 'axios';

class experienceAPI {
  async getExperiences(filter) {
    // handle parsing of filters
    const isActiveFilter = filter.isActive
      ? `isActive=${filter.isActive}&`
      : '';
    const isFeaturedFilter = filter.isFeatured
      ? `isFeatured=${filter.isFeatured}&`
      : '';

    const { data } = await Axios.get(
      `/api/experience/v1?${isActiveFilter}${isFeaturedFilter}`
    );
    return data;
  }

  async getExperience(id) {
    const { data } = await Axios.get(`/api/experience/v1/${id}`);
    return data;
  }
}

export default new experienceAPI();
