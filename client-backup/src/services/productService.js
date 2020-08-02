import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/product`);
    return res.data || [];
  },
  add:async () => {
    let res = await axios.post(`/api/product`,{name:"Adnan",description:"Adnan is a developer"});
  }
}