import Axios from 'axios';

class groupAPI {
  async groupInterestedUser(groupId, userId, userToken) {
    const { data } = await Axios.put(
      `/api/group/v1/${groupId}/interested`,
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

export default new groupAPI();
