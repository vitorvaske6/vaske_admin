import React from "react";
import { Card, Menu, Dropdown, Modal, Space } from "antd";
import styled from 'styled-components';
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { GET_DASHBOARD_ITEMS } from "../graphql/queries";
import { DELETE_DASHBOARD_ITEM } from "../graphql/mutations";
import ChartIcon from "./ChartIcon";

const StyledCard = styled(Card)`
  box-shadow: 0px 2px 4px rgba(141, 149, 166, 0.1);
  border-radius: 4px;

  .ant-card-head {
    border: none;
  }
  .ant-card-body {
    padding-top: 12px;
  }
`


const DashboardItemDropdown = ({ itemId }) => {
  const [removeDashboardItem] = useMutation(DELETE_DASHBOARD_ITEM, {
    refetchQueries: [
      {
        query: GET_DASHBOARD_ITEMS
      }
    ]
  });

  const onClick = ({ key }) => {
    if(key == 2){
      Modal.confirm({
        title: "Tem certeza que deseja excluir este item?",
        okText: "Sim",
        okType: "danger",
        cancelText: "Não",
  
        onOk() {
          removeDashboardItem({
            variables: {
              id: itemId
            }
          });
        }
      })
    }
  };

  const items = [{
    label: <Link to={`/explore?itemId=${itemId}`}>Edit</Link>,
    key: '1',
  },
  {
    label: 'Excluir',
    key: '2',
  }];

  return (
    <Dropdown
      menu={{items, onClick}}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <p onClick={(e) => e.preventDefault()}>
      <Space>
      <ChartIcon type="menu"/>
      </Space>
      </p>
    </Dropdown>
  );
};

const DashboardItem = ({ itemId, children, title }) => (
  <StyledCard
    title={title}
    bordered={false}
    style={{
      height: "100%",
      width: "100%"
    }}
    extra={<DashboardItemDropdown itemId={itemId} />}
  >
    {children}
  </StyledCard>
);

export default DashboardItem;
