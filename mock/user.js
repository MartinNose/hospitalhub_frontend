import request from 'umi-request';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '主治医生',
    group: '浙江大学第一人民医院骨科',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '专业',
      },
      {
        key: '3',
        label: '经验丰富',
      },
      {
        key: '4',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /login': async (req, res) => {
    // debugger
    // console.log('post /api/login/account')
    const { password, userName, type } = req.body;
    console.log(req);
    // console.log(req)
    // await waitTime(2000);
    //
    // if (password === 'ant.design' && userName === 'admin') {
    //   res.send({
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'admin',
    //   });
    //   return;
    // }
    //
    // if (password === 'ant.design' && userName === 'user') {
    //   res.send({
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'user',
    //   });
    //   return;
    // }
    //
    // if (type === 'mobile') {
    //   res.send({
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'admin',
    //   });
    //   return;
    // }
    //
    // res.send({
    //   status: 'error',
    //   type,
    //   currentAuthority: 'guest',
    // });

    console.log('start post');
    // await request('47.111.80.33:9800/login', {
    //   method:'POST',
    //   data: {'accountId': userName, 'encodedPassword': password},
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    //   .then((res) => res.json()).then((res) => {
    //     console.log(res);
    //     res.send({
    //       status: 'ok',
    //       type,
    //       currentAuthority: 'admin',
    //     });
    //   }).catch((err) => console.log(err))
    console.log('end of post');
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
