import { Tooltip, Tag, Modal, Divider, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import qs from 'qs';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailedSymptom, setDetailedSymptom] = useState(false);
  const [possibleCauses, setPossibleCauses] = useState(false);
  const [treatmentAdvice, setTreatmentAdvice] = useState(false);
  const [result, setResult] = useState(false);

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
          setDetailedSymptom(res['more_symptoms']);
          setPossibleCauses(res['possible_causes']);
          setTreatmentAdvice(res['treatment_advice']);
          setResult(res['result']);
          showModal();
          // console.log(this.state)
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
        defaultOpen={true}
        open={true}
      />
      <NoticeIconView />
      <Avatar menu />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <Modal
        title="您的诊断结果是——"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Typography>
          <Title>诊断结果</Title>
          <Paragraph>{result}</Paragraph>
        </Typography>
        <Divider></Divider>
        <Typography>
          <Title>病症分析</Title>
          <Paragraph>{detailedSymptom}</Paragraph>
        </Typography>
        <Typography>
          <Title>常见病因</Title>
          <Paragraph>{possibleCauses}</Paragraph>
        </Typography>
        <Typography>
          <Title>治疗方案</Title>
          <Paragraph>{treatmentAdvice}</Paragraph>
        </Typography>
      </Modal>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
