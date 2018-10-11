import request from '@/utils/request'
export function weixinAccredit(params) {
  return request({
    url: '/accredit',
    method: 'post',
    data: params
  })
}
