import logo from './logo.svg'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React, {createContext, useReducer} from 'react'
import './App.css'
import ColorManager from "./components/states/context/ColorManager"
import GitHubUser from './components/security/GitHubUser'
import Divider from "@mui/material/Divider"
import AppBar from './components/drawer/AppBar'
import Drawer from './components/drawer/PermanentDrawer'
import Login from './components/oauth2/login'
import Page404 from './components/Page404'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initialState, reducer } from "./components/security/Reducer";
import OAuthPopup from "./components/oauth2/popup";
import ProtectedRoute from "./components/security/ProtectedRoute";


export const AuthContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }} >
    <Router>
      <Drawer>
        <Routes>
          <Route path="/" element={
            <h2>Hello world</h2>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/cb" element={
            <OAuthPopup />
          } />
          <Route path="/color" element={
            <ProtectedRoute>
              <ColorManager />
            </ProtectedRoute>
          } />
          <Route path="/github" element={
            <ProtectedRoute>
              <GitHubUser login="jeantsai" />
            </ProtectedRoute>
          } />
          <Route path="*" element={
            <Page404 />
          } />
        </Routes>
      </Drawer>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
