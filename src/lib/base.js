let Axios

if (process.env.NODE_ENV === 'mock') {
  Axios = require('axios')
  Axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded'
}

export function fetch (url, params = {}) {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'mock') {
    return new Promise((resolve, reject) => {
      Axios.post(url, params)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else {
    console.log('非mock形式的调用！')
  }
}
