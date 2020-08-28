import "./index.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Pages/Main";
import Details from "./Pages/Details";
import Auth from "./Pages/Auth";
import RedirectPage from "./Pages/Auth/RedirectPage";

const App = () => (
    <Router basename="/phoiewer/build/">
      <Switch>
        <Route exact path="/photo-:id">
          <Details />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/redirect">
          <RedirectPage />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
);

export default App;
