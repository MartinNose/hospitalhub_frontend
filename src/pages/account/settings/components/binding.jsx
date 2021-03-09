import React, { Component } from 'react';
import { baseUrl } from '../../../../services/login';
import qs from 'qs';
import 'antd/dist/antd.css';
import { Avatar, Button, Card, Col, List, Popover, Row, Space, Typography } from 'antd';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class BindingView extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    return await fetch(baseUrl + '/prescription/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.stringify({ token: window.localStorage['token'] }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ listData2: res['data'] }));
  };
  state = {
    listData2: [
      {
        prescriptionId: 3,
        registrationId: '2021-03-09-3',
        patientName: '陈婧',
        doctorName: '贝鹏',
        prescriptionTime: '2021-03-09T00:37:02.000+00:00',
        prescriptionDetail:
          '临床诊断：食道癌晚期\nR： Inj N. S 500ml\n注射用顺铂 10mg×2支 ×5\n氟尿嘧啶注射液 0.25×4支\nSig： i.v.gtt q.d.\n临用前以0.9%氯化钠注射液溶解，氟尿嘧啶按1000mg/m2.d，顺铂按20mg/m2.d，连用5天。间隔3-4周可重复用药。为防止其肾脏毒性，在用药前后，可采用大量输液的水化疗法，以降低顺铂的血浆浓度，增加其肾脏清除率；并可加用甘露醇，以加速肾脏的排泄功能，减少顺铂在肾小管中的积聚。',
        status: 'unpaid',
        medicineDOList: [
          {
            medicineId: 3,
            medicineImageUrl:
              'https://i1.kknews.cc/SIG=109cc4p/ctp-vzntr/6o6867126nsq4325o1q94op884r03o70.jpg',
            medicineName: '盐酸米诺环素胶囊',
            packageQuantity: '50mg * 20粒',
            medicinePrice: 56,
          },
          {
            medicineId: 4,
            medicineImageUrl:
              'https://lh3.googleusercontent.com/proxy/LGYrDRV3WuvpmbRRS0KEQzEAklgFmCp2iubtZuJYzjeS2_5OgCYbIGkuGf2vK7pgyirhN8z1v-zYt01luaNVj3ICeGUUCKE8k56KW3BAJQ',
            medicineName: '酒石酸美托洛尔片',
            packageQuantity: '25mg * 20片',
            medicinePrice: 8.8,
          },
          {
            medicineId: 5,
            medicineImageUrl:
              'http://img01.yun300.cn/repository/image/-TyvVUqzTPW4H1DBx3FAaA.jpg_1180xa.jpg?tenantId=140926&viewType=1&k=1607611065000',
            medicineName: '盐酸艾司洛尔注射液',
            packageQuantity: '10ml:0.1g * 5支',
            medicinePrice: 447,
          },
        ],
        totalPrice: 511.8,
      },
    ],
  };

  render() {
    console.log(this.state.listData2);
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={this.state.listData2}
        footer={
          <div>
            <b>Hospital Hub</b> Trying our best
          </div>
        }
        renderItem={(item) => (
          <List.Item key={item.doctorName}>
            {/* <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        /> */}
            <Row>
              <Col span={5}>
                <List
                  size="small"
                  bordered
                  dataSource={[item.doctorName, item.prescriptionTime, item.status]}
                  renderItem={(itemOfLeftList, index) => (
                    <List.Item key={itemOfLeftList}>
                      <Typography.Text strong>
                        {index === 0 ? '医生姓名： ' : index === 1 ? '就诊时间： ' : '诊断状态:  '}
                      </Typography.Text>{' '}
                      <Typography>{itemOfLeftList}</Typography>
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={2} />
              <Col span={17}>
                <Card
                  title="详细情况说明"
                  extra={
                    <Popover
                      content={
                        <List
                          size="small"
                          bordered
                          dataSource={item.medicineDOList}
                          renderItem={(eachKindOfMedicine, index) => (
                            <List.Item key={eachKindOfMedicine.medicineId}>
                              <Row>
                                <Col span={12}>
                                  <Row>
                                    <Typography.Text strong> 药品名称： </Typography.Text>
                                    <Typography>{eachKindOfMedicine.medicineName} </Typography>
                                  </Row>
                                  <Row>
                                    <Typography.Text strong> 数量总计： </Typography.Text>
                                    <Typography>{eachKindOfMedicine.packageQuantity} </Typography>
                                  </Row>
                                  <Row>
                                    <Typography.Text strong> 药品价格： </Typography.Text>
                                    <Typography>{eachKindOfMedicine.medicinePrice} </Typography>
                                  </Row>
                                </Col>
                                <Col span={12}>
                                  <Avatar src={eachKindOfMedicine.medicineImageUrl} shape="round" />
                                </Col>
                              </Row>
                            </List.Item>
                          )}
                        />
                      }
                    >
                      <Button shape="round">查看药方</Button>
                    </Popover>
                  }
                >
                  <Typography copyable>{item.prescriptionDetail}</Typography>
                </Card>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    );
  }
}

export default BindingView;
