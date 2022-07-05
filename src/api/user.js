/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
/**
  * 用户登录
  */
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 获取验证码接口
export const getSmsCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
