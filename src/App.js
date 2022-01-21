import React from "react";
import { Switch } from "react-router";
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoue";
import { ProfileProvider } from "./context/profile.context";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import './styles/main.scss';
function App() {
  return (
    <ProfileProvider>
    <Switch>
      <PublicRoute>
        <SignIn/>
      </PublicRoute>
      <PrivateRoute path="/">
        <Home/>
      </PrivateRoute>
    </Switch>
    </ProfileProvider>
  );
}

export default App;