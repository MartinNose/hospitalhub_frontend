import request from 'umi-request';
export async function queryFakeList(params) {
  console.log(params);
  const raw = await fetch('http://47.111.80.33:9800/hospital/detail?hospitalId=' + params.id, {
    method: 'GET',
    // new URLSearchParams({'token':'dd8867a006af40b9b5ad62f71babf8d9'})
  });
  let body = await raw.json();
  return body.data;
}
export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'post' },
  });
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'update' },
  });
}
