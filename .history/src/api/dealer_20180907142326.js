import request from '@/utils/request'
export function getAccountAuthority() {
  return request({
    url: '/dealer/accountAuthority/query',
    method: 'post',
    data: {
      customerAccountId: '2'
    }
  })
}
