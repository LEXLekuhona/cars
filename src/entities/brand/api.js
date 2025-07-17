import axios from 'axios'

export const fetchBrands = (page, size, token) =>
  axios.get(`http://185.239.50.252:8080/brands?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` }
  }); 