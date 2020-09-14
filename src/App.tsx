import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "layout";
import Main from "pages/Main";
import Details from "pages/Details";
import Auth from "pages/Auth";
import RedirectPage from "pages/Auth/RedirectPage";
import NotFound from "pages/NotFound";
import "styles/global.scss";

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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
);

export default App;
