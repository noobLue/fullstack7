import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((response) => response.data)
}

const getOne = (id) => {
  const req = axios.get(`${baseUrl}/${id}`)
  return req.then((response) => response.data)
}

const postUser = async (user) => {
  const res = await axios.post(baseUrl, user)
  return res.data
}

export default { getAll, getOne, postUser }
