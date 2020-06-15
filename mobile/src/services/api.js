import axios from 'axios'

const api = axios.create({
    baseURL: 'http://seu_ip_local:3333/'
})

export default api 