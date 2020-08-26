import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIsLoggedIn } from "../../init/hooks";
import { logOut } from "../Auth/actions";
import { TState } from "../../init/types";
import { TPhotoListState } from "./reducer";
import List from "./List";
import LoadButton from "./LoadButton";

const Main = () => {
  const l = window.location;
  const query = new URLSearchParams(l.search).get('redirect_to');
  const hash = l.hash;

  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const photoList = useSelector(({ photoList }: TState<TPhotoListState>) => photoList);
  const { page, isLoading, requestFailed, list } = photoList;

  return query ? <Redirect to={query.replace(/~and~/g, '&') + hash} /> : !isLoggedIn ? <Redirect to="/auth" /> : (
      <div className="wrapper">
        <button onClick={() => dispatch(logOut())}>
          Выйти
        </button>
        <List
            list={list}
            requestFailed={requestFailed}
            page={page}
            dispatch={dispatch} />
        <LoadButton
            isLoading={isLoading}
            page={page} />
      </div>
  );
};

export default Main;
