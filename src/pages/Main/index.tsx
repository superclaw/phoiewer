import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "./actions";
import { TState } from "init/types";
import { TPhotoListState } from "./reducer";
import List from "./List";
import Button from "modules/Button";
import styles from "./main.module.scss";

const Main = () => {
  const l = window.location;
  const query = new URLSearchParams(l.search).get('redirect_to');
  const hash = l.hash;

  const dispatch = useDispatch();
  const photoList = useSelector(({ photoList }: TState<TPhotoListState>) => photoList);

  const { page, isLoading, requestFailed, list, screenSize } = photoList;

  return query ? <Redirect to={query.replace(/~and~/g, '&') + hash} /> : (
      <div className={styles.main}>
        <List
            list={list}
            requestFailed={requestFailed}
            dispatch={dispatch}
            screenSize={screenSize}
        />
        <Button
          className={styles['load-btn']}
          type="load"
          text="Загрузить ещё..."
          onClick={() => dispatch(loadData(page))}
          isLoading={isLoading}
        />
      </div>
  );
};

export default Main;
