import "styles/global.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "layout";
import Main from "pages/Main";
import Details from "pages/Details";
import Auth from "pages/Auth";
import RedirectPage from "pages/Auth/RedirectPage";

const App = () => (
    <Router basename="/phoiewer/build/">
      <Switch>
        <Route exact path="/photo-:id">
          <Layout>
            <Details />
          </Layout>
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/redirect">
          <RedirectPage />
        </Route>
        <Route exact path="/">
          <Layout>
            <Main />
          </Layout>
        </Route>
      </Switch>
    </Router>
);

export default App;
