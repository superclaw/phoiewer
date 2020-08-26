import { useSelector } from "react-redux";
import { TState } from "./types";
import { TAuthState } from "../Pages/Auth/reducer";

export const useIsLoggedIn = () => useSelector(({ login }: TState<TAuthState>) => login.isLoggedIn);
