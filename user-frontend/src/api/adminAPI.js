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

  async deleteExperience(experienceId, userToken) {
    const { data } = await Axios.delete(
      `/api/admin/v1/experience/${experienceId}`,
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
    const { data } = await Axios.put(
      `/api/admin/v1/group/${groupId}`,
      groupData,
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    );
    return data;
  }

  async deleteGroup(experienceId, groupId, userToken) {
    const { data } = await Axios.delete(
      `/api/admin/v1/group/${experienceId}/${groupId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    );
    return data;
  }

  async getUsers(userToken) {
    const { data } = await Axios.get('/api/admin/v1/user', {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    return data;
  }

  async getUser(userId, userToken) {
    const { data } = await Axios.get(`/api/admin/v1/user/${userId}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    return data;
  }
}

export default new adminAPI();
