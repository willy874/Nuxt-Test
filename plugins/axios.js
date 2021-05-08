import Axios from 'axios'
import Cookies from 'js-cookie'

export default function (ctx, inject) {
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  /**
   * @param {Function} ops.resolve 處理成功
   * @param {Function} ops.reject  處理失敗
   * @param {RequestHeaders} ops.headers 請求頭部資訊
   */
  const request = (ops = {}) => {
    const axios = Axios.create({
      baseURL: ctx.env.baseUrl + '/',
      headers: {
        'X-Client-Version': ctx.env.version,
        ...ops.headers,
      },
    })
    const token = Cookies.get('token')
    if (token) {
      axios.defaults.headers.common.Authorization = token
    }
    /**
     * 當成功發出情求時要攔截處理的行為
     * @param {Request} req
     * @returns {Request}
     */
    const requestSuccess = async (req) => {
      await new Promise((resolve) => resolve())
      return req
    }
    /**
     * 當情求失敗時要攔截處理的行為
     * @param {Error} err
     * @returns {Error}
     */
    const requesError = async (err) => {
      await new Promise((resolve) => resolve())
      return err
    }
    /**
     * 當成功收到回應時要攔截處理的行為
     * @param {Response} res
     * @returns {Response}
     */
    const responseSuccess = async (res) => {
      await new Promise((resolve) => resolve())
      return res
    }
    /**
     * 當收到失敗回應時要攔截處理的行為
     * @param {Error} err
     * @returns {Error}
     */
    const responseError = async (err) => {
      await new Promise((resolve) => resolve())
      return err
    }
    axios.interceptors.request.use(requestSuccess, requesError)
    axios.interceptors.response.use(responseSuccess, responseError)
    const AxiosRequest = function (...args) {
      return axios(...args)
    }
    Object.keys(axios).forEach((on) => {
      if (typeof axios[on] === 'function') {
        AxiosRequest[on] = async (...args) => {
          const promiseResult = axios[on](...args)
          return await new Promise((resolve, reject) => {
            ops.resolve = resolve
            ops.reject = reject
            promiseResult.then(resolve).catch(reject)
          })
        }
      }
    })
    return AxiosRequest
  }
  ctx.$axios = request
  inject('axios', request)
}
