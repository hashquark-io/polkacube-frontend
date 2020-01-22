import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'

const filterQuery = query =>
  query
    .match(/([^?=&]+)(=([^&]*))/g)
    .filter(t => {
      const val = t.split('=')[1]
      return !!val
    })
    .join('&')

const filterUrl = url => {
  const [pathname, query] = url.split('?')
  if (query) {
    return [pathname, filterQuery(query)].join('?')
  }
  return url
}

Axios.defaults.timeout = 10000
Axios.defaults.withCredentials = false
Axios.defaults.headers['Accept-Language'] = window._config.locale

const proto = Vue.prototype

Axios.interceptors.request.use(
  config => {
    config.url = filterUrl(config.url)
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => Promise.reject(error)
)

Axios.interceptors.response.use(
  ({ data }) => {
    return data
  },
  error => Promise.reject(error)
)

proto.axios = Axios
