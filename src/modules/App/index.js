import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {likePhoto, loadData, logIn, logOut} from "../../actions";
import "./index.css";

import Main from "../routes/Main";
import Details from "../routes/Details";
import Auth from "../routes/Auth";
import RedirectPage from "../routes/RedirectPage";

let App = ({state, likePhoto, loadData, logIn, logOut}) => (
    <Router basename="/phoiewer/build/">
      <Switch>
        <Route exact path="/photo-:id">
          <Details />
        </Route>
        <Route exact path="/auth">
          <Auth isLoggedIn={state.login.isLoggedIn} />
        </Route>
        <Route exact path="/redirect">
          <RedirectPage logIn={logIn} />
        </Route>
        <Route exact path="/">
          <Main
              isLoggedIn={state.login.isLoggedIn}
              photoList={state.photoList}
              logOut={logOut}
              likePhoto={likePhoto}
              loadData={loadData} />
        </Route>
      </Switch>
    </Router>
);

App = connect(
    state => ({
      state: state,
    }),
    dispatch => ({
      likePhoto: (id, isLiked, key) => dispatch(likePhoto(id, isLiked, key)),
      loadData: i => dispatch(loadData(i)),
      logIn: accessToken => dispatch(logIn(accessToken)),
      logOut: () => dispatch(logOut()),
    }),
)(App);

export default App;