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
    const continentFilter = filter.continent // expecting an array
      ? `continent=${encodeURIComponent(filter.continent)}&`
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

  async experienceInterestedUser(experienceId, userId, userToken) {
    const { data } = await Axios.put(
      `/api/experience/v1/${experienceId}/interested`,
      {
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    return data;
  }
}

export default new experienceAPI();
