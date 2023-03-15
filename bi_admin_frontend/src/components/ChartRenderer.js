import React from "react";
import PropTypes from "prop-types";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin, Row, Col, Statistic, Table } from "antd";
import {
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import styled from 'styled-components';

import "./recharts-theme.less";
import moment from "moment";
import numeral from "numeral";
import { useStateContext } from "../contexts/ContextProvider";

const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");
const colors = ['#123E7A','#EA3F3F', '#BBD6B8','#804674','#CCD5AE','#F7C8E0','#B9F3E4','#B5F1CC','#6096B4','#A7727D','#AAE3E2','#B9F3FC','#7286D3','#FD8A8A','#B5D5C5','#FFD4B2','#65647C','#E97777','#FF8787','#9E7676','#98A8F8','#A7D2CB','#F2D388','#554994','#F675A8','#54BAB9','#80558C','#6E85B7','#B2C8DF','#898AA6','#C2DED1','#354259','#68A7AD'];
const xAxisFormatter = (item) => {
  if (moment(item).isValid()) {
    return dateFormatter(item)
  } else {
    return item;
  }
}

const CartesianChart = ({ resultSet, children, ChartComponent, height }) => (
  <ResponsiveContainer width="100%" height={height}>
    <ChartComponent margin={{ left: -10 }} data={resultSet.chartPivot()}>
      <XAxis axisLine={false} tickLine={false} tickFormatter={xAxisFormatter} dataKey="x" minTickGap={20} />
      <YAxis axisLine={false} tickLine={false} tickFormatter={numberFormatter} />
      <CartesianGrid vertical={false} />
      { children }
      <Legend />
      <Tooltip labelFormatter={dateFormatter} formatter={numberFormatter} />
    </ChartComponent>
  </ResponsiveContainer>
)

const TypeToChartComponent = {
  line: ({ resultSet, height }) => (
    <CartesianChart resultSet={resultSet} height={height} ChartComponent={LineChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Line
          key={series.key}
          stackId="a"
          dataKey={series.key}
          name={series.shortTitle}
          stroke={colors[i]}
        />
      ))}
    </CartesianChart>
  ),
  bar: ({ resultSet, height }) => (
    <CartesianChart resultSet={resultSet} height={height} ChartComponent={BarChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Bar
          key={series.key}
          stackId="a"
          dataKey={series.key}
          name={series.shortTitle}
          fill={colors[i]}
        />
      ))}
    </CartesianChart>
  ),
  area: ({ resultSet, height }) => (
    <CartesianChart resultSet={resultSet} height={height} ChartComponent={AreaChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Area
          key={series.key}
          stackId="a"
          dataKey={series.key}
          name={series.shortTitle}
          stroke={colors[i]}
          fill={colors[i]}
        />
      ))}
    </CartesianChart>
  ),
  pie: ({ resultSet, height }) => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          isAnimationActive={false}
          data={resultSet.chartPivot()}
          nameKey="x"
          dataKey={resultSet.seriesNames()[0].key}
          fill="#8884d8"
        >
          {resultSet.chartPivot().map((e, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ),
  table: ({ resultSet }) => {
    function removeDuplicates(arr) {
      let uniqueArr = arr.filter((v,i,a)=>a.findIndex(v2=>(v2.value===v.value))===i)
      let sortedArr = uniqueArr.sort((a, b) => (a.value > b.value) ? 1 : -1)
      return sortedArr
    }
    return (
      <Table
        currentColor={'rgb(3, 201, 215)'}
        pagination={true}
        columns={resultSet.tableColumns().map(c => ({
          ...c,
          title: c.shortTitle,
          width: "200px",
          dataIndex: c.key,
          filters: removeDuplicates(resultSet.tablePivot().map(cf =>
            ({
              text: cf[`${c.key}`],
              value: cf[`${c.key}`]
            })
          )),
          onFilter: (value, record) => record[`${c.key}`].startsWith(value),
          filterSearch: true,
          // sorter: (a, b) =>  c.type === 'string' && (a[`${c.key}`] - b[`${c.key}`]),
          // sortDirections: ['ascend','descend'],
        }))}
        dataSource={resultSet.tablePivot()}
        scroll={{ x: '100vw', y: '400px' }}
      />
    )
  },
  number: ({ resultSet }) => {
    console.log(resultSet.seriesNames())
    
    return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        height: "100%",
        gap:"20px"
      }}
    >
      {resultSet.seriesNames().map(s => (
      <Col>
        
          <>
            {/* { resultSet.length() > 1 ? (<p>{resultSet.totalRow()[s.key]}</p>) : (<></>) } */}
            <Statistic value={resultSet.totalRow()[s.key]} title={resultSet.seriesNames().length > 1 ? s.shortTitle : ''} />
          </>
        
      </Col>
      ))}
    </Row>
  )}
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map(key => ({
    [key]: React.memo(TypeToChartComponent[key])
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const SpinContainer = styled.div`
  text-align: center;
  padding: 30px 50px;
  margin-top: 30px;
`
const Spinner = () => (
  <SpinContainer>
    <Spin size="large"/>
  </SpinContainer>
)

const renderChart = Component => ({ resultSet, error, height }) =>
  (resultSet && <Component height={height} resultSet={resultSet} />) ||
  (error && error.toString()) || <Spinner />;

const ChartRenderer = ({ vizState, chartHeight }) => {
  const { query, chartType } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);
  if (component !== undefined )
    return component && renderChart(component)({ height: chartHeight, ...renderProps });
  else
    return <></>
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object
};
ChartRenderer.defaultProps = {
  vizState: {},
  chartHeight: 300,
  cubejsApi: null
};
export default ChartRenderer;
