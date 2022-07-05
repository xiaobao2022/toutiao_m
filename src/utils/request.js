// 创建一个axios实例
// 通过axios创建出来的实例更axios基本一样，但集成了一些配置项
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://42.192.129.12:8000' // 基础路径
})
export default request
