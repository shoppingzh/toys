import axios from 'axios'

const service = axios.create({
  baseURL: 'https://aip.baidubce.com/rest/2.0',
  timeout: 60 * 1000
})

service.interceptors.response.use(response => {
  return new Promise((resolve, reject) => {
    const { data } = response
    if (data.err_no === 0 || data.error_code === 0) return resolve(data)
    const e = new Error()
    e.message = data.err_msg || data.error_msg
    e.data = data
    return reject(e)
  })
}, err => {
  return Promise.reject(err)
})

export default service
