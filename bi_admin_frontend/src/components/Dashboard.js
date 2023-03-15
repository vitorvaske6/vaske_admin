import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useMutation } from "@apollo/react-hooks";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { GET_DASHBOARD_ITEMS } from "../graphql/queries";
import { UPDATE_DASHBOARD_ITEM } from "../graphql/mutations";
import dragBackground from "./drag-background.svg";
//import dragBackground from "./bgSvg.svg";
import styled from 'styled-components';
const ReactGridLayout = WidthProvider(RGL);


//background: url(${dragBackground});
const DragField = styled(ReactGridLayout)`
  margin: 16px 28px 50px 28px;
  ${props => props.isDragging ? `
   background: url(${dragBackground});
    background-repeat: repeat;
    background-position: 0px -4px;
    background-size: 100% 286;
  `: ''};
`

const Dashboard = ({ children, dashboardItems }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [updateDashboardItem] = useMutation(UPDATE_DASHBOARD_ITEM, {
    refetchQueries: [
      {
        query: GET_DASHBOARD_ITEMS
      }
    ]
  });

  const onLayoutChange = newLayout => {
    newLayout.forEach(l => {
      const item = dashboardItems.find(i => i.id.toString() === l.i);
      const toUpdate = JSON.stringify({
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h
      });

      if (item && toUpdate !== item.layout) {
        updateDashboardItem({
          variables: {
            id: item.id,
            input: {
              layout: toUpdate
            }
          }
        });
      }
    });
  };

  //console.log(children, dashboardItems)

  return (
    <DragField
      margin={[12, 12]}
      containerPadding={[0, 0]}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onResizeStart={() => setIsDragging(true)}
      onResizeStop={() => setIsDragging(false)}
      cols={24}
      rowHeight={1}
      onLayoutChange={onLayoutChange}
      isDragging={isDragging}
     >
      {children}
    </DragField>
  );
};

export default Dashboard;
