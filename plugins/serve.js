import Axios from 'axios'

export default function (ctx, inject) {
  const request = () => {
    const axios = Axios.create({
      baseURL: process.env.SERVE_URL + '/',
    })
    const requestSuccess = (req) => {
      return req
    }
    const requesError = (err) => {
      return err
    }
    const responseSuccess = (res) => {
      return res
    }
    const responseError = (err) => {
      return err
    }
    axios.interceptors.request.use(requestSuccess, requesError)
    axios.interceptors.response.use(responseSuccess, responseError)
    return axios
  }
  ctx.$serve = request
  inject('serve', request)
}
