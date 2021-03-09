import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Form, List, Row, Select, Tag } from 'antd';
import StandardFormRow from './components/StandardFormRow';
import { Avatar, Button, Dropdown, Input, Menu, Modal, Progress, Radio } from 'antd';
import { findDOMNode } from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import styles from './style.less';
import TagSelect from './components/TagSelect';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress
        percent={percent}
        status={status}
        strokeWidth={6}
        style={{
          width: 180,
        }}
      />
    </div>
  </div>
);

export const BasicList = (props) => {
  const addBtn = useRef(null);
  const [form] = Form.useForm();
  const {
    loading,
    dispatch,
    hospital: { hosInfo, filter, regRes },
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('确定要预约吗？');

  const urlParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    dispatch({
      type: 'hospital/fetch',
      payload: {
        id: urlParams.get('id') || 1,
      },
    });
  }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const handleOk = async () => {
    if (done) {
      setDone(false);
      setVisible(false);
      setModalText('确定预约？');
      return;
    }

    setConfirmLoading(true);
    await dispatch({
      type: 'hospital/submit',
      payload: {
        doctor: current,
      },
    });
    setConfirmLoading(false);
    setModalText('预约成功');
    setDone(true);
  };

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
    console.log(current);
  };

  const deleteItem = (id) => {
    dispatch({
      type: 'hospital/submit',
      payload: {
        id,
      },
    });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">今日在诊</RadioButton>
        <RadioButton value="waiting">专家号</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current);
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values) => {
    const id = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'hospital/submit',
      payload: {
        id,
        ...values,
      },
    });
  };

  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
    },
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="今日在诊" value="20人" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周平均排队时间" value="2小时32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周已接诊人数" value="68人" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="医生列表"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent}
          >
            <Card bordered={false}>
              <Form
                layout="inline"
                form={form}
                initialValues={{
                  owner: ['wjh', 'zxx'],
                }}
                onValuesChange={(value) => {
                  dispatch({
                    type: 'hospital/select',
                    payload: value,
                  });
                }}
              >
                <StandardFormRow
                  title="所属类目"
                  block
                  style={{
                    paddingBottom: 11,
                  }}
                >
                  <FormItem name="category">
                    <TagSelect>
                      {hosInfo.map((dep) => (
                        <TagSelect.Option value={dep.departmentName}>
                          {dep.departmentName}
                        </TagSelect.Option>
                      ))}
                    </TagSelect>
                  </FormItem>
                </StandardFormRow>
                <StandardFormRow title="其它选项" grid last>
                  <Row gutter={16}>
                    <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                      <FormItem {...formItemLayout} label="活跃用户" name="user">
                        <Select
                          placeholder="不限"
                          style={{
                            maxWidth: 200,
                            width: '100%',
                          }}
                        >
                          <Option value="lisa">李三</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                      <FormItem {...formItemLayout} label="好评度" name="rate">
                        <Select
                          placeholder="不限"
                          style={{
                            maxWidth: 200,
                            width: '100%',
                          }}
                        >
                          <Option value="good">优秀</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                </StandardFormRow>
              </Form>
            </Card>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={hosInfo.filter((item) => {
                if (filter.length === 0) return true;
                return filter.includes(item.departmentName);
              })}
              renderItem={(dep) =>
                dep.doctorModelList.map((item) => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={(e) => {
                          e.preventDefault();
                          showEditModal(item);
                        }}
                      >
                        预约
                      </a>,
                      <MoreBtn key="more" item={item} />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.portraitUrl} shape="square" size="large" />}
                      title={<a href={item.href}>{item.trueName}</a>}
                      description={item.experience}
                    />
                    <ListContent data={item} />
                  </List.Item>
                ))
              }
            />
          </Card>
        </div>
      </PageContainer>

      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};
export default connect(({ hospital, loading }) => ({
  hospital,
  loading: loading.models.hospital,
}))(BasicList);
