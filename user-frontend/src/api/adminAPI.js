import Axios from 'axios';

class adminAPI {
  async createExperience(userToken) {
    const { data } = await Axios.post(
      '/api/admin/v1/experience',
      {},
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    );
    return data;
  }

  async updateExperience(experienceId, userToken, experienceData) {
    const { data } = await Axios.put(
      `/api/admin/v1/experience/${experienceId}`,
      experienceData,
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    );
    return data;
  }

  async createGroup(experienceId, userToken) {
    const { data } = await Axios.post(
      `/api/admin/v1/group/${experienceId}`,
      {},
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    );
    return data;
  }

  async updateGroup(groupId, userToken, groupData) {
    console.log(groupData);
    const { data } = await Axios.put(
      `/api/admin/v1/group/${groupId}`,
      groupData,
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    );
    return data;
  }
}

export default new adminAPI();
