import request from '@/utils/request'

// 查看账户列表
export function getAccountAuthority() {
  return request({
    url: '/dealer/account/list',
    method: 'post',
    data: {
      customerAccount:""
limit:20
sEcho:1
sortCol:"customerAccountId"
sortDir:"asc"
start:0
    }
  })
}
