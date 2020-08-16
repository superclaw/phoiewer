import React from "react";
import {Redirect} from "react-router-dom";

import List from "../../List";
import LoadButton from "../../List/LoadButton";

const Main = ({isLoggedIn, photoList, logOut, loadData, likePhoto}) => {
  const l = window.location;
  const query = new URLSearchParams(l.search).get('redirect_to');
  const hash = l.hash;

  const {page, isLoading, requestFailed, list} = photoList;

  return query ? <Redirect to={query.replace(/~and~/g, '&') + hash} /> : !isLoggedIn ? <Redirect to="/auth" /> : (
      <div className="wrapper">
        <button onClick={() => logOut()}>
          Выйти
        </button>
        <List
            list={list}
            requestFailed={requestFailed}
            page={page}
            loadData={loadData}
            likePhoto={likePhoto} />
        <LoadButton
            isLoading={isLoading}
            page={page}
            loadData={loadData} />
      </div>
  );
};

export default Main;