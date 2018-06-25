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

//广告
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



//商品分类
export const typeGet = params => { return axios.get(`${base}/product/types`+`${params}`).then(res => res.data)}

export const typePost = params => { return axios.post(`${base}/product/type`, params).then(res => res.data)}

export const typeDel = params => { return axios.delete(`${base}/product/type`+`${params}`).then(res => res.data)}