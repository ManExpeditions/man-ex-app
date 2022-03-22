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
    const continentFilter = filter.continent
      ? `continent=${filter.continent}&`
      : '';

    const { data } = await Axios.get(
      `/api/experience/v1?${isActiveFilter}${isFeaturedFilter}${continentFilter}`
    );
    return data;
  }

  async getExperience(id) {
    const { data } = await Axios.get(`/api/experience/v1/${id}`);
    return data;
  }
}

export default new experienceAPI();
