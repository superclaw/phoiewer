import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "init/hooks";
import { loadData } from "./actions";
import { logOut } from "pages/Auth/actions";
import { TState} from "init/types";
import { TPhotoListState } from "./reducer";
import List from "./List";
import Button from "modules/Button";

const Main = () => {
  const l = window.location;
  const query = new URLSearchParams(l.search).get('redirect_to');
  const hash = l.hash;

  const dispatch = useDispatch();
  const isLoggedIn = useAuth().isLoggedIn;
  const photoList = useSelector(({ photoList }: TState<TPhotoListState>) => photoList);

  const { page, isLoading, requestFailed, list } = photoList;

  return query ? <Redirect to={query.replace(/~and~/g, '&') + hash} /> : !isLoggedIn ? <Redirect to="/auth" /> : (
      <div className="wrapper">
        <Button text="Выйти" onClick={() => dispatch(logOut())} />
        <List
            list={list}
            requestFailed={requestFailed}
            dispatch={dispatch}
        />
        <Button type="load" text="Загрузить ещё..." onClick={() => dispatch(loadData(page))} isLoading={isLoading} />
      </div>
  );
};

export default Main;
