import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

axios.defaults.timeout = 15000
axios.defaults.withCredentials = true     //上线要开启
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



const baseUrl='https://www.navbang.com/';
export default baseUrl

let base = 'https://www.navbang.com'

//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }  	//  

//简介
export const decriGet = params => { return axios.get(`${base}/description`).then(res => res.data)}      //

export const introDel = params => { return axios.delete(`${base}/intro/`+`${params}`).then(res => res.data)}      //  