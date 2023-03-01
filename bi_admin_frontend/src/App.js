import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, Loading } from './components';
import { Login, Register, Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Reports, CustomReports, Companies, NoAccess } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import PrivateRoute from './components/PrivateRoute';
import env from 'react-dotenv';
import C4m from './pages/C4m';

const App = () => {
  const { userReports, navData, profileCompanyInfo, profileInfo, userLoginInfo, appData, isLoggedIn, setCurrentColor, setCurrentMode, currentMode, isNavmenu, currentColor, isSidemenu, themeSettings, setThemeSettings, handleMouseOut, setScreenSize, setIsNavmenu, screenSize, isLoggedin } = useStateContext();

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
    <div className={`${currentMode === 'Dark' && isLoggedIn ? 'dark' : ''} h-[100vh] w-full`}>

      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg w-full">
          {isLoggedIn && (
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

          )}



          <div className='w-full'>
            {!isNavmenu && (
              <>
                {!isSidemenu && (
                    <Sidebar />
                )}
              </>
            )}
            <Navbar />
            <div onMouseOver={() => handleMouseOut()}>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* Private Routes */}
                <Route path='/' element={<PrivateRoute child={<Ecommerce />} isReport={false} linkName='' linkGroup='' permissionRequired={false} />} />

                {/* dashboard  */}
                <Route path="/ecommerce" element={<PrivateRoute child={<Ecommerce />} isReport={false} linkName='Ecommerce' linkGroup='' permissionRequired={false} />} />

                {/* reports */}
                <Route path="/reports/:groupname/:reportName" element={<PrivateRoute child={<Reports />} isReport={true} linkName='Reports' linkGroup='' permissionRequired={true} />} />

                {/* pages  */}
                <Route path="/orders" element={<PrivateRoute child={<Orders />} isReport={false} linkName='Orders' linkGroup='' permissionRequired={true} />} />
                <Route path="/customers" element={<PrivateRoute child={<Customers />} isReport={false} linkName='Customers' linkGroup='' permissionRequired={true} />} />


                {/* registration  */}
                <Route path="/companies" element={<PrivateRoute child={<Companies />} isReport={false} linkName='Empresas' linkGroup='' permissionRequired={true} />} />
                <Route path="/employees" element={<PrivateRoute child={<Employees />} isReport={false} linkName='Funcionários' linkGroup='' permissionRequired={true} />} />
                <Route path="/reports" element={<PrivateRoute child={<CustomReports />} isReport={false} linkName='Reports' linkGroup='' permissionRequired={true} />} />


                {/* Integrations  */}
                <Route path="/integrations/c4m" element={<PrivateRoute child={<C4m />} isReport={false} linkName='C4M' linkGroup='' permissionRequired={true} />} />

                {/* apps  */}
                <Route path="/apps/kanban" element={<PrivateRoute child={<Kanban />} isReport={false} linkName='Kanban' linkGroup='' permissionRequired={true} />} />
                <Route path="/apps/editor" element={<PrivateRoute child={<Editor />} isReport={false} linkName='Editor' linkGroup='' permissionRequired={true} />} />
                <Route path="/apps/calendar" element={<PrivateRoute child={<Calendar isReport={false} linkName='Calendario' linkGroup='' permissionRequired={true} />} />} />
                <Route path="/apps/color-picker" element={<PrivateRoute child={<ColorPicker isReport={false} linkName='Paleta de Cores' linkGroup='' permissionRequired={true} />} />} />

                {/* charts  */}
                <Route path="/charts/line" element={<PrivateRoute child={<Line />} isReport={false} linkName='Linha' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/area" element={<PrivateRoute child={<Area />} isReport={false} linkName='Área' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/bar" element={<PrivateRoute child={<Bar />} isReport={false} linkName='Barra' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/pie" element={<PrivateRoute child={<Pie />} isReport={false} linkName='Pizza' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/financial" element={<PrivateRoute child={<Financial />} isReport={false} linkName='Finanças' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/color-mapping" element={<PrivateRoute child={<ColorMapping />} isReport={false} linkName='Mapeador de Cores' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/pyramid" element={<PrivateRoute child={<Pyramid />} isReport={false} linkName='Piramide' linkGroup='' permissionRequired={true} />} />
                <Route path="/charts/stacked" element={<PrivateRoute child={<Stacked />} isReport={false} linkName='Empilhado' linkGroup='' permissionRequired={true} />} />

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
      </BrowserRouter >


    </div >
  );
};

export default App;


