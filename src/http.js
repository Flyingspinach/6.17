import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 95000;
axios.defaults.baseURL ='';
// var URL = "http://47.92.219.113/kaokao/index.php/"
var URL = "https://pro.myworldclassroom.com/kaokao/index.php/"
// var URL = "http://localhost/kaokao/index.php/"


//http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     //config.data = JSON.stringify(config.data);
//     if(localStorage.getItem('token') != ''){
//       config.headers = {
//         //'Content-Type':'application/x-www-form-urlencoded',
//         'Authorization':'Bearer '+localStorage.getItem('token')
//       }
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

export function geteData(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(URL+url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
      Message.error('数据请求失败');
    })
  })
}

 export function postData(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(URL+url,data)
          .then(response => {
            resolve(response.data);
            console.log(response.data,url)
          },err => {
            reject(err)
            Message.error('数据请求失败');
          })
   })
 }

export function patchData(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(URL+url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
           Message.error('数据请求失败');
         })
  })
}

export function putData(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(URL+url,data)
        .then(response => {
          resolve(response.data);
          console.log(response.data,url)
        },err => {
          reject(err)
          Message.error('数据请求失败');
        })
  })
}

export function delData(url,data = {}){
return new Promise((resolve,reject) => {
  axios.delete(URL+url,data)
    .then(response => {
      resolve(response.data);
      console.log(response.data,url)
    },err => {
      reject(err)
      Message.error('数据请求失败');
    })
  })
}

