import Axios from 'axios';

class experienceAPI {
  async getExperiences() {
    const { data } = await Axios.get('/api/experience/v1/');
    return data;
  }

  async getExperience(id) {
    const { data } = await Axios.get(`/api/experience/v1/${id}`);
    return data;
  }
}

export default new experienceAPI();
