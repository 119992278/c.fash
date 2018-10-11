import request from '@/utils/request'
import { getToken, getCookie } from '@/utils/auth'
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

// 保存设置权限
export function setAccountAuthority(params) {
  return request({
    url: '/dealer/accountAuthority/add',
    method: 'post',
    data: params
  })
}

// 获取账户列表
export function getAccountList(params) {
  return request({
    url: '/dealer/account/list',
    method: 'post',
    data: params
  })
}

// 新增账户
export async function addAccount(params) {
  const result = await addHistory('新增账户【' + params.contactUser + '】')
  if (result.code === 0) {
    return request({
      url: '/dealer/account/add',
      method: 'post',
      data: params
    })
  }
}
// 新增账户
export async function addAccount1(params) {
  await addHistory('新增账户【' + params.contactUser + '】').then(response => {
    if (response.code === 0) {
      return request({
        url: '/dealer/account/add',
        method: 'post',
        data: params
      })
    }
  })
}
// 编辑账户
export function editAccount(params) {
  return request({
    url: '/dealer/account/edit',
    method: 'post',
    data: params
  })
}
// 获取权限
export function getAccountInfo(customerAccountId) {
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

// 固件列表
export function getProductList(params) {
  return request({
    url: '/dealer/product/list',
    method: 'post',
    data: params
  })
}

// 获取APP列表
export function getWatchFaceList(params) {
  return request({
    url: '/dealer/watchFace/list',
    method: 'post',
    data: params
  })
}

// 获取固件列表
export function getproductInfo(productId) {
  return request({
    url: '/dealer/product/get?productId=' + productId,
    method: 'get'
  })
}

// 编辑固件信息
export function editProductInfo(params) {
  return request({
    url: '/dealer/product/edit',
    method: 'post',
    data: params
  })
}

// 编辑固件信息
export function editProductInfo1(params) {
  return request({
    url: '/dealer/product/edit',
    method: 'post',
    data: params
  })
}

// 发布固件版本
export function pullOffVersion(params) {
  return request({
    url: '/dealer/product/version/pullOff',
    method: 'post',
    data: params
  })
}

// 新增固件
export function addProduct(params) {
  return request({
    url: '/dealer/product/add',
    method: 'post',
    data: params
  })
}

// 获取模板信息
export function getTemplate(params) {
  return request({
    url: '/dealer/template/info',
    method: 'post',
    data: params
  })
}

// 新增模板
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

// 获取时间段设备注册数
export function getCountBindUser(params) {
  return request({
    url: '/dealer/user/countBindUser',
    method: 'post',
    data: params
  })
}

// 获取时间段用户注册数
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

// 获取注册用户数
export function getRegUserCount(params) {
  return request({
    url: '/dealer/user/listRegUserCount',
    method: 'post',
    data: params
  })
}

// 获取总设备数
export function getDeviceCount(params) {
  return request({
    url: '/dealer/listDeviceCount',
    method: 'post',
    data: params
  })
}

// 获取总设备数
export function getCountAge(params) {
  return request({
    url: '/dealer/user/countAge',
    method: 'post',
    data: params
  })
}

// 获取总设备数
export function getCountSex(params) {
  return request({
    url: '/dealer/user/countSex',
    method: 'post',
    data: params
  })
}

// 获取今日激活设备数
export function getBindUserCount(params) {
  return request({
    url: '/dealer/user/listBindUserCount',
    method: 'post',
    data: params
  })
}

// 获取表盘列表
export function getWatchFacelist(params) {
  return request({
    url: '/dealer/watchFace/list',
    method: 'post',
    data: params
  })
}

// 获取表盘信息
export function getwatchFaceById(watchFaceId) {
  return request({
    url: '/dealer/watchFace/info?watchFaceId=' + watchFaceId,
    method: 'get'
  })
}

// 获取表盘信息
export function editWatchFace(params) {
  return request({
    url: '/dealer/watchFace/update',
    method: 'post',
    data: params
  })
}

// 获取表盘信息
export function delWatchFaceById(params) {
  return request({
    url: '/dealer/watchFace/del',
    method: 'post',
    data: params
  })
}

// 获取表盘信息
export function addWatchFace(params) {
  return request({
    url: '/dealer/watchFace/add',
    method: 'post',
    data: params
  })
}

// 获取表盘信息
export function getSportList(params) {
  return request({
    url: '/dealer/sport/list',
    method: 'post',
    data: params
  })
}

// 添加操作历史
export function addHistory(operate) {
  const tempHistory = {
    operationContent: operate,
    customerAccountId: getCookie('customerAccountId'),
    customerId: getCookie('customerId')
  }
  return request({
    url: '/dealer/operationHistory/add',
    method: 'post',
    data: tempHistory
  })
}

// 获取问题反馈
export function getfeedBackList(params) {
  return request({
    url: '/dealer/feedBack/list',
    method: 'post',
    data: params
  })
}

