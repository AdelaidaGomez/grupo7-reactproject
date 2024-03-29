import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route} from "react-router-dom"
import TopBar from "./scenes/global/TopBar"
import Dashboard from "./scenes/dashboard"
import SideBar from './scenes/global/SideBar';
import Users from "./scenes/users/users";
import Services from "./scenes/services/services";


function App() {
  const [theme, colorMode] = useMode()

  return(
    <ColorModeContext.Provider value={colorMode}> 
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <SideBar />
          <main className='content'>
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
               <Route path="/users" element={<Users />} /> 
               <Route path="/services" element={<Services />} /> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App