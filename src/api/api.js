import axios from 'axios';

export const randomUserAPI = {
  getUsers() {
    return axios.get('https://randomuser.me/api/?results=500').then(r => r.data.results)
  }
}
