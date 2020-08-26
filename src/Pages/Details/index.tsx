import React from "react";
import { useParams } from "react-router-dom";

type ParamsType = {
  id: string;
};

const Details = () => {
  const { id } = useParams<ParamsType>();
  return <div>{id}</div>
};

export default Details;
