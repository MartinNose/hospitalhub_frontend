import request from 'umi-request';
import qs from 'qs';
export async function queryFakeList(params) {
  // return request('/api/fake_list', {
  const raw = await fetch('http://47.111.80.33:9800/hospital/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({ token: 'd26bb64fd28b47808781f215852a830d' }),
    // new URLSearchParams({'token':'dd8867a006af40b9b5ad62f71babf8d9'})
  });
  let body = await raw.json();
  return body.data;
}
