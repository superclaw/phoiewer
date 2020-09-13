import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { TState } from "./types";
import { TAuthState } from "pages/Auth/reducer";

export const useAuth = () => useSelector(({ login }: TState<TAuthState>) => login);

export const useScreenSize = () => {
  const [size, setSize] = useState(window.innerWidth);
  const setCurrentSize = useCallback(() => {
    setSize(window.innerWidth);
    return size;
  }, [size]);
  const getSize = () => size;
  return [getSize, setCurrentSize];
};
