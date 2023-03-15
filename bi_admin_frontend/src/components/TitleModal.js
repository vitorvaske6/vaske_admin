import React from "react";
import { Modal, Input } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { GET_DASHBOARD_ITEMS } from "../graphql/queries";
import {
  CREATE_DASHBOARD_ITEM,
  UPDATE_DASHBOARD_ITEM
} from "../graphql/mutations";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider";
import styled from "styled-components";

const StyledModal = styled(Modal)`
button.ant-btn-primary {
    -webkit-appearance: button;
    background-color: ${props => props.currentColor};
    background-image: none;
}
`

const TitleModal = ({
  history,
  itemId,
  titleModalVisible,
  setTitleModalVisible,
  setAddingToDashboard,
  finalVizState,
  setTitle,
  finalTitle
}) => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext()

  const [addDashboardItem] = useMutation(CREATE_DASHBOARD_ITEM, {
    refetchQueries: [
      {
        query: GET_DASHBOARD_ITEMS
      }
    ]
  });
  const [updateDashboardItem] = useMutation(UPDATE_DASHBOARD_ITEM, {
    refetchQueries: [
      {
        query: GET_DASHBOARD_ITEMS
      }
    ]
  });

  // const StyledModal = styled(Modal)`
  //   button.ant-btn-primary {
  //       -webkit-appearance: button;
  //       background-color: ${currentColor};
  //       background-image: none;
  //   }
  // `

  return (
    <StyledModal
      key="modal"
      title="Salvar Gráfico"
      visible={titleModalVisible}
      currentColor={currentColor}
      onOk={async () => {
        setTitleModalVisible(false);
        setAddingToDashboard(true);

        try {
          await (itemId ? updateDashboardItem : addDashboardItem)({
            variables: {
              id: itemId,
              input: {
                vizState: JSON.stringify(finalVizState),
                name: finalTitle
              }
            }
          });
          navigate("/");
        } finally {
          setAddingToDashboard(false);
        }
      }}
      onCancel={() => setTitleModalVisible(false)}
    >
      <Input
        placeholder="Nome do Item do Dashboard"
        value={finalTitle}
        onChange={e => setTitle(e.target.value)}
      />
    </StyledModal>
  );
};

export default TitleModal;
