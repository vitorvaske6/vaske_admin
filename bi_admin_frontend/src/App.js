import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/client";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import client from "./graphql/client";

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, Loading } from './components';
import { Login, Register, Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Reports, CustomReports, Companies, NoAccess, ExplorePage, DashboardPage, ReportsEmbedded, Menus, MenuGroups } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import PrivateRoute from './components/PrivateRoute';
import env from 'react-dotenv';
import C4m from './pages/C4m';
import { ConfigProvider } from 'antd';

const token = '40f05eb803a9dcc3e3d157982432ea864f6a47913ee780f817ebbb0472331d52fe62adbbf480471281323a4f2e7e6248ee2cb619e95dde15612e0d13084d4f2d'

const cubejsApi = cubejs(token, {
  apiUrl: 'http://localhost:4000/cubejs-api/v1'
});

const App = () => {
  const { sidebarSize, userReports, navData, profileCompanyInfo, profileInfo, userLoginInfo, appData, isLoggedIn, setCurrentColor, setCurrentMode, currentMode, isNavmenu, currentColor, isSidemenu, themeSettings, setThemeSettings, handleMouseOut, setScreenSize, setIsNavmenu, screenSize, isLoggedin } = useStateContext();
  const [resizeContent, setResizeContent] = useState('')


  useEffect(() => {
    setResizeContent(`ml-[${sidebarSize}px]`)
  }, [sidebarSize]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize, setIsNavmenu]);

  useEffect(() => {
    if (screenSize < 980) {
      setIsNavmenu(false);
    } else {
      setIsNavmenu(true);
    }
  }, [screenSize, setIsNavmenu]);

  if ((appData === undefined || userReports === undefined || navData?.menusInfo === undefined || profileCompanyInfo === undefined || profileInfo === undefined || userLoginInfo === undefined) && isLoggedIn) {
    return <Loading />;
  }

  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <div className={`${currentMode === 'Dark' && isLoggedIn ? 'dark' : ''} h-full w-full  bg-gray-100 dark:bg-main-dark-bg min-h-screen`}>

            <BrowserRouter>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: currentColor,
                    colorText: currentMode === 'Dark' ? 'white' : 'black'
                  },
                }}>
                <div className="flex relative dark:bg-main-dark-bg w-full h-full">
                  {isLoggedIn && (
                    <>

                      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                        <TooltipComponent
                          content="Settings"
                          position="Top">
                          <button
                            type="button"
                            onClick={() => setThemeSettings(true)}
                            style={{ background: currentColor, borderRadius: '50%' }}
                            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray">
                            <FiSettings />
                          </button>
                        </TooltipComponent>
                      </div>
                    </>
                  )}

                  {isLoggedIn && <Sidebar />}
                  
                  <div style={{marginLeft: isLoggedIn ? sidebarSize : 0 }} className={`w-full h-full`}>
                  <Navbar /> 
                  {/* <Navbar /> 
                    {!isNavmenu && (
                      <>
                        {!isSidemenu && ( 
                          <Sidebar />
                         )}
                      </>
                    )} 
                    <Navbar />
                   */}
                    <div onMouseOver={() => handleMouseOut()}>
                      {themeSettings && (<ThemeSettings />)}

                      <Routes>
                        {/* Private Routes */}
                        <Route path='/' element={<PrivateRoute child={<DashboardPage />} isReport={false} linkName='' linkGroup='' permissionRequired={false} />} />

                        {/* dashboard  */}
                        <Route path="/ecommerce" element={<PrivateRoute child={<Ecommerce />} isReport={false} linkName='Ecommerce' linkGroup='' permissionRequired={false} />} />

                        {/* explore  */}
                        <Route path="/explore" element={<PrivateRoute child={<ExplorePage />} isReport={false} linkName='Explorar' linkGroup='' permissionRequired={false} />} />

                        {/* reports */}
                        <Route path="/relatorios/:groupname/:reportName" element={<PrivateRoute child={<ReportsEmbedded />} isReport={true} linkName='Reports' linkGroup='' permissionRequired={true} />} />

                        {/* pages  */}
                        <Route path="/orders" element={<PrivateRoute child={<Orders />} isReport={false} linkName='Orders' linkGroup='' permissionRequired={true} />} />
                        <Route path="/customers" element={<PrivateRoute child={<Customers />} isReport={false} linkName='Customers' linkGroup='' permissionRequired={true} />} />


                        {/* registration  */}
                        <Route path="/cadastros/empresas" element={<PrivateRoute child={<Companies />} isReport={false} linkName="/cadastros/empresas" linkGroup='' permissionRequired={true} />} />
                        <Route path="/cadastros/funcionarios" element={<PrivateRoute child={<Employees />} isReport={false} linkName="/cadastros/funcionarios" linkGroup='' permissionRequired={true} />} />
                        <Route path="/cadastros/relatorios" element={<PrivateRoute child={<Reports />} isReport={false} linkName="/cadastros/relatorios" linkGroup='' permissionRequired={true} />} />
                        <Route path="/cadastros/menus" element={<PrivateRoute child={<Menus />} isReport={false} linkName='Menus' linkGroup="/cadastros/menus" permissionRequired={true} />} />
                        <Route path="/cadastros/grupos-de-menus" element={<PrivateRoute child={<MenuGroups />} isReport={false} linkName="/cadastros/grupos-de-menus" linkGroup='' permissionRequired={false} />} />


                        {/* Integrations  */}
                        <Route path="/integracoes/c4m" element={<PrivateRoute child={<C4m />} isReport={false} linkName="/integracoes/c4m" linkGroup='' permissionRequired={true} />} />

                        {/* apps  */}
                        <Route path="/aplicativos/kanban" element={<PrivateRoute child={<Kanban />} isReport={false} linkName="/aplicativos/kanban" linkGroup='' permissionRequired={true} />} />
                        <Route path="/aplicativos/editor" element={<PrivateRoute child={<Editor />} isReport={false} linkName="/aplicativos/editor" linkGroup='' permissionRequired={true} />} />
                        <Route path="/aplicativos/calendario" element={<PrivateRoute child={<Calendar isReport={false} linkName="/aplicativos/calendario"  linkGroup='' permissionRequired={true} />} />} />
                        <Route path="/aplicativos/paleta-de-cores" element={<PrivateRoute child={<ColorPicker isReport={false} linkName="/aplicativos/paleta-de-cores" linkGroup='' permissionRequired={true} />} />} />

                        {/* charts  */}
                        <Route path="/graficos/linha" element={<PrivateRoute child={<Line />} isReport={false} linkName="/graficos/linha" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/area" element={<PrivateRoute child={<Area />} isReport={false} linkName="/graficos/area" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/barras" element={<PrivateRoute child={<Bar />} isReport={false} linkName="/graficos/barras" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/pizza" element={<PrivateRoute child={<Pie />} isReport={false} linkName="/graficos/pizza" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/financas" element={<PrivateRoute child={<Financial />} isReport={false} linkName="/graficos/financas" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/mapeador-de-cores" element={<PrivateRoute child={<ColorMapping />} isReport={false} linkName="/graficos/mapeador-de-cores" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/piramide" element={<PrivateRoute child={<Pyramid />} isReport={false} linkName="/graficos/piramide" linkGroup='' permissionRequired={true} />} />
                        <Route path="/graficos/barras-empilhado" element={<PrivateRoute child={<Stacked />} isReport={false} linkName="/graficos/barras-empilhado" linkGroup='' permissionRequired={true} />} />

                        {/* login  */}
                        <Route path="/login" element={<Login />} />

                        {/* register  */}
                        <Route path="/register" element={<Register />} />

                        {/* NoAccess  */}
                        <Route path="/noAccess" element={<NoAccess />} />

                      </Routes>
                      <Footer />
                    </div>
                  </div>
                </div >
              </ConfigProvider>
            </BrowserRouter >
          </div >
        </ApolloHooksProvider>
      </ApolloProvider>
    </CubeProvider>
  );
};

export default App;


