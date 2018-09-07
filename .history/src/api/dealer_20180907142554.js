import request from '@/utils/request'

// 查看账户列表
export function getAccountAuthority() {
  return request({
    url: '/dealer/account/list',
    method: 'post',
    data: {
      customerAccountId: '2'
    }
  })
}
