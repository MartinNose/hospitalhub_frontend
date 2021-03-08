import request from '@/utils/request';
import qs from 'qs';
// import baseUrl from '../../config/config.js'
const baseUrl = 'http://47.111.80.33:9800';
export { baseUrl };
export async function AccountLogin(params) {
  // console.log('fakeAccountLogin')
  // console.log(params)
  const { userName, password } = params;
  // console.log(qs.stringify({'accountId':userName,'encodedPassword':password}))
  // return request.post('/login', {
  //   // prefix:'47.111.80.33:9800',
  //   // method: 'post',
  //   // prefix:'',
  //   data: qs.stringify({'accountId':userName,'encodedPassword':window.btoa(password)}),
  //   charset:'utf8',
  //   headers:{'Content-Type':'application/x-www-form-urlencoded','mode':'cors'}
  // })

  return await fetch(baseUrl + '/login', {
    method: 'POST',
    // body: qs.stringify({ accountId: userName, encodedPassword: window.btoa(password) }),
    body: JSON.stringify({ accountId: userName, encodedPassword: window.btoa(password) }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());
  // console.log(temp)
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
