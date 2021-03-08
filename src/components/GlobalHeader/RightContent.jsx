import { Tooltip, Tag, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import qs from 'qs';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;
  const [isModalVisible, setIsModalVisible, diagnosis_res, detailed_symptom] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="输入您的症状，获取智能诊断结果"
        defaultValue="头晕 口渴"
        onSearch={async (value) => {
          const res = await fetch('http://www.neohugh.art/diagnosis', {
            method: 'POST',
            body: qs.stringify({ symptom_discription: value }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }).then((res) => res.json());
          console.log(res);
        }}
        // options={[
        //   {
        //     label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
        //     value: 'umi ui',
        //   },
        //   {
        //     label: <a href="next.ant.design">Ant Design</a>,
        //     value: 'Ant Design',
        //   },
        //   {
        //     label: <a href="https://protable.ant.design/">Pro Table</a>,
        //     value: 'Pro Table',
        //   },
        //   {
        //     label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
        //     value: 'Pro Layout',
        //   },
        // ]} // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <NoticeIconView />
      <Avatar menu />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h3>诊断结果</h3>
        <p></p>
        <p></p>
      </Modal>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
