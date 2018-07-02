import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

axios.defaults.timeout = 15000
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'


//请求拦截器
axios.interceptors.request.use(config => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	return config
}, 
error => {
	console.log('错误的传参！')
})

//响应拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		Message({
			message: error.response.data.msg,
			type: 'error'
		});
		return Promise.reject(error)
	})


let base = 'http://192.168.1.172/Shop/public/v1'
// let base = ''



//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }




//轮播
export const advertsGet = params => { return axios.get(`${base}/adverts`+`${params}`).then(res => res.data)}

export const advertPost = params => { return axios.post(`${base}/advert`, params).then(res => res.data)}

export const advertDel = params => { return axios.delete(`${base}/advert`+`${params}`).then(res => res.data)}




//经营类目
export const categoriesGet = params => { return axios.get(`${base}/store/categories`+`${params}`).then(res => res.data)}

export const categoryPost = params => { return axios.post(`${base}/store/category`, params).then(res => res.data)}

export const categoryDel = params => { return axios.delete(`${base}/store/category`+`${params}`).then(res => res.data)}



//入驻
export const sappliesGet = params => { return axios.get(`${base}/settle/applies`+`${params}`).then(res => res.data)}

export const sapplyPost = params => { return axios.post(`${base}/check/settle/apply`, params).then(res => res.data)}




//店铺
export const shopPost = params => { return axios.post(`${base}/store`, params).then(res => res.data)}

export const shopGet = params => { return axios.get(`${base}/stores`+`${params}`).then(res => res.data)}


//商品列表
export const goodGet = params => { return axios.get(`${base}/products`+`${params}`).then(res => res.data)}

export const goodPost = params => { return axios.post(`${base}/product`, params).then(res => res.data)}

export const goodRecycle = params => { return axios.get(`${base}/del/product`+`${params}`).then(res => res.data)}//加入回收站

export const goodDel = params => { return axios.delete(`${base}/product`+`${params}`).then(res => res.data)}//回收站永久删除






//商品分类
export const typeGet = params => { return axios.get(`${base}/product/types`+`${params}`).then(res => res.data)}

export const typePost = params => { return axios.post(`${base}/product/type`, params).then(res => res.data)}

export const typeDel = params => { return axios.delete(`${base}/product/type`+`${params}`).then(res => res.data)}


//商品规格
export const guigeGet = params => { return axios.get(`${base}/product/categories`+`${params}`).then(res => res.data)}

export const guigePost = params => { return axios.post(`${base}/product/category`, params).then(res => res.data)}

export const guigeDel = params => { return axios.delete(`${base}/product/category`+`${params}`).then(res => res.data)}




//订单
// export const orderGet = params => { return axios.get(`${base}/order/lists`+`${params}`).then(res => res.data)}

// export const orderDel = params => { return axios.delete(`${base}/order/list`+`${params}`).then(res => res.data)}




//快递
export const deliveryGet = params => { return axios.get(`${base}/expresses`+`${params}`).then(res => res.data)}

export const deliveryPost = params => { return axios.post(`${base}/express`, params).then(res => res.data)}

export const deliveryDel = params => { return axios.delete(`${base}/express`+`${params}`).then(res => res.data)}


//帮助文档
export const documentGet = params => { return axios.get(`${base}/documents`+`${params}`).then(res => res.data)}

export const documentPost = params => { return axios.post(`${base}/document`, params).then(res => res.data)}

export const documentDel = params => { return axios.delete(`${base}/document`+`${params}`).then(res => res.data)}



//管理员
export const userGet = params => { return axios.get(`${base}/users`+`${params}`).then(res => res.data)}

export const userPost = params => { return axios.post(`${base}/user`, params).then(res => res.data)}

export const userDel = params => { return axios.delete(`${base}/user`+`${params}`).then(res => res.data)}


//角色
export const permissionGet = params => { return axios.get(`${base}/permissions`+`${params}`).then(res => res.data)}

export const roleGet = params => { return axios.get(`${base}/roles`+`${params}`).then(res => res.data)}

export const rolePost = params => { return axios.post(`${base}/role`, params).then(res => res.data)}

export const roleDel = params => { return axios.delete(`${base}/role`+`${params}`).then(res => res.data)}