import request from '@/utils/request'

// 查看账户列表
export function getAccountAuthority(customerAccountId) {
  return request({
    url: '/dealer/accountAuthority/query',
    method: 'post',
    data: {
      customerAccountId
    }
  })
}

export function setAccountAuthority(params) {
  return request({
    url: '/dealer/accountAuthority/add',
    method: 'post',
    data: params
  })
}

export function getAccountList(params) {
  return request({
    url: '/dealer/account/list',
    method: 'post',
    data: params
  })
}

// 新增账户
export function addDealer(params) {
  return request({
    url: '/dealer/account/add',
    method: 'post',
    data: params
  })
}
// 编辑账户
export function editDealer(params) {
  return request({
    url: '/dealer/account/edit',
    method: 'post',
    data: params
  })
}
// 获取权限
export function getDealerInfo(customerAccountId) {
  return request({
    url: '/dealer/account/get?customerAccount=&customerAccountId=' + customerAccountId,
    method: 'get'
  })
}

// 获取权限
export function getListCustomer(params) {
  return request({
    url: '/dealer/listCustomer',
    method: 'post',
    data: params
  })
}

// 获取权限
export function queryAccountAuthority(params) {
  return request({
    url: '/dealer/accountAuthority/query',
    method: 'post',
    data: params
  })
}
// 固件列表
export function getProductList(params) {
  return request({
    url: '/dealer/product/list',
    method: 'post',
    data: params
  })
}

export function getWatchFaceList(params) {
  return request({
    url: '/dealer/watchFace/list',
    method: 'post',
    data: params
  })
}

export function getproductInfo(productId) {
  return request({
    url: '/dealer/product/get?productId=' + productId,
    method: 'get'
  })
}

export function editProductInfo(params) {
  return request({
    url: '/dealer/product/edit',
    method: 'post',
    data: params
  })
}

export function pullOffVersion(params) {
  return request({
    url: '/dealer/product/version/pullOff',
    method: 'post',
    data: params
  })
}
export function addProduct(params) {
  return request({
    url: '/dealer/product/add',
    method: 'post',
    data: params
  })
}

export function getTemplate(params) {
  return request({
    url: '/dealer/template/info',
    method: 'post',
    data: params
  })
}
export function addTemplate(params) {
  return request({
    url: '/dealer/template/add',
    method: 'post',
    data: params
  })
}

export function getHardwareVersion(productId) {
  return request({
    url: '/dealer/product/getHardwareVersion?productId=' + productId,
    method: 'get'
  })
}

// 用户列表
export function getUserList(params) {
  return request({
    url: '/dealer/user/listAccount',
    method: 'post',
    data: params
  })
}
// APP列表
export function getAPPList(params) {
  return request({
    url: '/dealer/app/list',
    method: 'post',
    data: params
  })
}
// 操作列表
export function getHistoryList(params) {
  return request({
    url: '/dealer/operationHistory/list',
    method: 'post',
    data: params
  })
}

// 操作列表
export function getTemplateList(params) {
  return request({
    url: '/dealer/template/list',
    method: 'post',
    data: params
  })
}
//
export function getCountRegUser(params) {
  return request({
    url: '/dealer/user/countRegUser',
    method: 'post',
    data: params
  })
}

// 操作列表
export function getCountBindUser(params) {
  return request({
    url: '/dealer/user/countBindUser',
    method: 'post',
    data: params
  })
}

export function getCountActivityUser(params) {
  return request({
    url: '/dealer/user/countActivityUser',
    method: 'post',
    data: params
  })
}

export function addApp(params) {
  return request({
    url: '/dealer/app/add',
    method: 'post',
    data: params
  })
}

export function addAppVersion(params) {
  return request({
    url: '/dealer/app/version/add',
    method: 'post',
    data: params
  })
}

export function updateApp(params) {
  return request({
    url: '/dealer/app/update',
    method: 'post',
    data: params
  })
}

export function getVersionById(versionId) {
  return request({
    url: '/dealer/app/version/listById?versionId=' + versionId,
    method: 'get',
    data: { versionId: versionId }
  })
}

export function getAPPById(versionId) {
  return request({
    url: '/dealer/app/listById?versionId=' + versionId,
    method: 'get',
    data: { versionId: versionId }
  })
}
