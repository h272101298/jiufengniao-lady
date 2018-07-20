import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import router from '../router/index'

axios.defaults.timeout = 1500000
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

		// console.log(error.response.status)
		if(error.response.status==401){
			var that=this;
			// router.push('/login');
			// Message({
			// 	message: '登录超时',
			// 	type: 'error'
			// });
			MessageBox.alert('请重新登录', '登录超时', {
				confirmButtonText: '确定',
				closeOnPressEscape:false,
				showClose:false,
				callback: action => {
					if(action=='confirm'){
						// window.location.href="https://background.geckowing.com/login" 
						router.push('/login');
					}
				}
			});

		}else{
			Message({
				message: error.response.data.msg,
				type: 'error'
			});
		}
		return Promise.reject(error)
	})




// let base = 'http://192.168.1.172/Shop/public/v1'

// let base1 = 'http://192.168.1.172/Shop/public/v2'

let base = 'https://template.geckowing.com/v1'

let base1 = 'https://template.geckowing.com/v2'

export default base

//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

export const requestLogout = params => { return axios.get(`${base}/logout`+`${params}`).then(res => res.data)}

//统计数据
export const countdataGet = params => { return axios.get(`${base}/count`+`${params}`).then(res => res.data)}



//轮播
export const advertsGet = params => { return axios.get(`${base}/adverts`+`${params}`).then(res => res.data)}

export const advertPost = params => { return axios.post(`${base}/advert`, params).then(res => res.data)}

export const advertDel = params => { return axios.delete(`${base}/advert`+`${params}`).then(res => res.data)}

export const posterPost = params => { return axios.post(`${base}/poster/configs`, params).then(res => res.data)}

export const posterGet = params => { return axios.get(`${base}/poster/configs`+`${params}`).then(res => res.data)}


//经营类目
export const categoriesGet = params => { return axios.get(`${base}/store/categories`+`${params}`).then(res => res.data)}

export const categoryPost = params => { return axios.post(`${base}/store/category`, params).then(res => res.data)}

export const categoryDel = params => { return axios.delete(`${base}/store/category`+`${params}`).then(res => res.data)}


//用户
export const userGet = params => { return axios.get(`${base}/wechat/users`+`${params}`).then(res => res.data)}




//入驻
export const sappliesGet = params => { return axios.get(`${base}/settle/applies`+`${params}`).then(res => res.data)}

export const sapplyPost = params => { return axios.post(`${base}/check/settle/apply`, params).then(res => res.data)}



//分销
export const aapplyGet = params => { return axios.get(`${base}/proxy/applies`+`${params}`).then(res => res.data)}

export const aapplyPass = params => { return axios.get(`${base}/proxy/pass`+`${params}`).then(res => res.data)}

export const aapplyReject = params => { return axios.get(`${base}/proxy/reject`+`${params}`).then(res => res.data)}


export const agentGet = params => { return axios.get(`${base}/proxy/users`+`${params}`).then(res => res.data)}


export const ratioPost = params => { return axios.post(`${base}/brokerage/ratio`, params).then(res => res.data)}

export const ratioGet = params => { return axios.get(`${base}/brokerage/ratio`+`${params}`).then(res => res.data)}





export const comGetAll = params => { return axios.get(`${base}/brokerages`+`${params}`).then(res => res.data)}


export const withdrawGet = params => { return axios.get(`${base}/withdraw/applies`+`${params}`).then(res => res.data)}


export const withdrawPass = params => { return axios.get(`${base}/withdraw/pass`+`${params}`).then(res => res.data)}

export const withdrawReject = params => { return axios.get(`${base}/withdraw/reject`+`${params}`).then(res => res.data)}





//店铺
export const shopPost = params => { return axios.post(`${base}/store`, params).then(res => res.data)}

export const shopGet = params => { return axios.get(`${base}/stores`+`${params}`).then(res => res.data)}


//商品列表
export const goodGet = params => { return axios.get(`${base}/products`+`${params}`).then(res => res.data)}

export const goodnotify = params => { return axios.get(`${base}/product/notify`+`${params}`).then(res => res.data)}

export const goodPost = params => { return axios.post(`${base}/product`, params).then(res => res.data)}

export const goodoneGet = params => { return axios.get(`${base}/product`+`${params}`).then(res => res.data)}

export const goodRecycle = params => { return axios.get(`${base}/del/product`+`${params}`).then(res => res.data)}//加入回收站

export const goodDel = params => { return axios.delete(`${base}/product`+`${params}`).then(res => res.data)}//回收站永久删除

export const goodCheck = params => { return axios.get(`${base}/check/product`+`${params}`).then(res => res.data)}//审核

export const goodShelf = params => { return axios.get(`${base}/shelf/product`+`${params}`).then(res => res.data)}//上下架

export const goodhot = params => { return axios.get(`${base}/hot`+`${params}`).then(res => res.data)}//热门
export const goodnew = params => { return axios.get(`${base}/new`+`${params}`).then(res => res.data)}//新品
export const goodoffer = params => { return axios.get(`${base}/offer`+`${params}`).then(res => res.data)}//优惠


//商品分类
export const typeGet = params => { return axios.get(`${base}/product/types`+`${params}`).then(res => res.data)}

export const typePost = params => { return axios.post(`${base}/product/type`, params).then(res => res.data)}

export const typeDel = params => { return axios.delete(`${base}/product/type`+`${params}`).then(res => res.data)}

export const typehot = params => { return axios.get(`${base}/hot/type`+`${params}`).then(res => res.data)}//热门


//商品规格
export const guigeGet = params => { return axios.get(`${base}/product/categories`+`${params}`).then(res => res.data)}

export const guigePost = params => { return axios.post(`${base}/product/category`, params).then(res => res.data)}

export const guigeDel = params => { return axios.delete(`${base}/product/category`+`${params}`).then(res => res.data)}




//订单
export const allorderGet = params => { return axios.get(`${base}/orders`+`${params}`).then(res => res.data)}

export const oneorderGet = params => { return axios.get(`${base}/order`+`${params}`).then(res => res.data)}

export const shipgoods = params => { return axios.post(`${base}/ship/order`, params).then(res => res.data)}

export const refundGet = params => { return axios.get(`${base}/refuses`+`${params}`).then(res => res.data)}

export const refundPost = params => { return axios.get(`${base}/refuse`+`${params}`).then(res => res.data)}

// export const orderDel = params => { return axios.delete(`${base}/order/list`+`${params}`).then(res => res.data)}




//快递
export const deliveryGet = params => { return axios.get(`${base}/expresses`+`${params}`).then(res => res.data)}

export const deliveryPost = params => { return axios.post(`${base}/express`, params).then(res => res.data)}

export const deliveryDel = params => { return axios.delete(`${base}/express`+`${params}`).then(res => res.data)}

//快递配置
export const kdconfigGet = params => { return axios.get(`${base}/express/config`+`${params}`).then(res => res.data)}

export const kdconfigPost = params => { return axios.post(`${base}/express/config`, params).then(res => res.data)}




//帮助文档
export const documentGet = params => { return axios.get(`${base}/documents`+`${params}`).then(res => res.data)}

export const documentPost = params => { return axios.post(`${base}/document`, params).then(res => res.data)}

export const documentDel = params => { return axios.delete(`${base}/document`+`${params}`).then(res => res.data)}



//管理员
export const adminGet = params => { return axios.get(`${base}/users`+`${params}`).then(res => res.data)}

export const adminPost = params => { return axios.post(`${base}/user`, params).then(res => res.data)}

export const adminDel = params => { return axios.delete(`${base}/user`+`${params}`).then(res => res.data)}


//角色
export const permissionGet = params => { return axios.get(`${base}/permissions`+`${params}`).then(res => res.data)}

export const roleGet = params => { return axios.get(`${base}/roles`+`${params}`).then(res => res.data)}

export const rolePost = params => { return axios.post(`${base}/role`, params).then(res => res.data)}

export const roleDel = params => { return axios.delete(`${base}/role`+`${params}`).then(res => res.data)}


//微信设置
export const wxconfigPost = params => { return axios.post(`${base}/tx/config`, params).then(res => res.data)}

export const wxconfigGet = params => { return axios.get(`${base}/tx/config`+`${params}`).then(res => res.data)}

export const wxmodelPost = params => { return axios.post(`${base}/notify/config`, params).then(res => res.data)}

export const wxmodelGet = params => { return axios.get(`${base}/notify/configs`+`${params}`).then(res => res.data)}


//卡牌
export const CardgoodGet = params => { return axios.get(`${base}/type/products`+`${params}`).then(res => res.data)}

export const CardtypeGet = params => { return axios.get(`${base1}/product/stocks`+`${params}`).then(res => res.data)}

export const CardshopPost = params => { return axios.post(`${base1}/card/promotion`, params).then(res => res.data)}

export const CardcheckGet = params => { return axios.get(`${base1}/card/promotions`+`${params}`).then(res => res.data)}

export const CardoneGet = params => { return axios.get(`${base1}/card/promotion`+`${params}`).then(res => res.data)}

export const CardonePut = params => { return axios.put(`${base1}/card/promotion`+`${params}`).then(res => res.data)}

export const Cardcheck = params => { return axios.get(`${base1}/check/promotion`+`${params}`).then(res => res.data)}

export const Carddelete = params => { return axios.delete(`${base1}/card/promotion`+`${params}`).then(res => res.data)}

export const Cardupdown = params => { return axios.get(`${base1}/enable/promotion`+`${params}`).then(res => res.data)}

export const DefaultCardPost = params => { return axios.post(`${base1}/default/card`, params).then(res => res.data)}

export const DefaultCardGet = params => { return axios.get(`${base1}/default/cards`+`${params}`).then(res => res.data)}


// 砍价
export const KanshopPost = params => { return axios.post(`${base1}/bargain/promotion`, params).then(res => res.data)}

export const KancheckGet = params => { return axios.get(`${base1}/bargain/promotions`+`${params}`).then(res => res.data)}

export const KanoneGet = params => { return axios.get(`${base1}/bargain/promotion`+`${params}`).then(res => res.data)}

export const KanonePut = params => { return axios.put(`${base1}/bargain/promotion`+`${params}`).then(res => res.data)}

export const Kancheck = params => { return axios.get(`${base1}/check/bargain/promotion`+`${params}`).then(res => res.data)}

export const Kandelete = params => { return axios.delete(`${base1}/bargain/promotion`+`${params}`).then(res => res.data)}

export const Kanupdown = params => { return axios.get(`${base1}/enable/bargain/promotion`+`${params}`).then(res => res.data)}

export const Kanhot = params => { return axios.get(`${base1}/hot/bargain/promotion`+`${params}`).then(res => res.data)}//推荐