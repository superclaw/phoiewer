import React from "react";
import { useParams } from "react-router-dom";
import { TDetailsParams } from "./types";

const Details = () => {
  const { id } = useParams<TDetailsParams>();
  return <div>{id}</div>
};

export default Details;
