import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Button, Spin } from "antd";
import { useQuery } from "@apollo/react-hooks";
import ExploreQueryBuilder from "../components/QueryBuilder/ExploreQueryBuilder";
import { GET_DASHBOARD_ITEM } from "../graphql/queries";
import TitleModal from "../components/TitleModal.js";
import { useCubeQuery } from "@cubejs-client/react";
import PageHeader from "../components/PageHeader.js";
import ExploreTitle from "../components/ExploreTitle.js";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";

const ExplorePage = ({ history, location }) => {
  const { currentColor } = useStateContext()
  const [addingToDashboard, setAddingToDashboard] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemId = searchParams.get("itemId")
  const { loading, error, data } = useQuery(GET_DASHBOARD_ITEM, {
    variables: {
      id: itemId
    },
    skip: !itemId
  });

  const [vizState, setVizState] = useState(null);
  const finalVizState =
    vizState ||
    (itemId && !loading && data && JSON.parse(data.dashboardItem.vizState)) ||
    {};

  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [title, setTitle] = useState(null);
  const finalTitle =
    title != null
      ? title
      : (itemId && !loading && data && data.dashboardItem.name) || "Novo Gráfico";

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type="error" message={error.toString()} />;
  }

  const isDisabled = finalVizState.query === undefined || finalVizState.query === {} || ((finalVizState.query.measures === undefined || finalVizState.query.measures.length === 0) && (finalVizState.query.dimensions === undefined || finalVizState.query.dimensions.length === 0) && (finalVizState.query.timeDimensions === undefined || finalVizState.query.timeDimensions.length === 0)) ? true : false
  
  return (
    <div className="p-2 m-2 min-h-[90vh]">
      <TitleModal
        history={history}
        itemId={itemId}
        titleModalVisible={titleModalVisible}
        setTitleModalVisible={setTitleModalVisible}
        setAddingToDashboard={setAddingToDashboard}
        finalVizState={finalVizState}
        setTitle={setTitle}
        finalTitle={finalTitle}
      />
      <Header
        itemTitle={<ExploreTitle itemId={itemId} />}
        title={itemId ? "Editar Gráfico" : "Novo Gráfico"}
        category={'Custom'}
        hasButton={true}
        button={
          <Button
            loading={addingToDashboard}
            disabled={isDisabled}
            onClick={() => setTitleModalVisible(true)}
          >
            {itemId ? "Atualizar" : "Adicionar ao Dashboard"}
          </Button>
        }
      />
      <ExploreQueryBuilder
        vizState={finalVizState}
        setVizState={setVizState}
      />
    </div>
  );
};
export default ExplorePage;
