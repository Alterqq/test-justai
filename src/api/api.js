import axios from 'axios';

export const randomUserAPI = {
  getUsers() {
    return axios.get('https://randomuser.me/api/?results=1000').then(r => r.data.results)
  }
}
