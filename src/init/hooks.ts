import { useSelector } from "react-redux";
import { TState } from "./types";
import { TAuthState } from "../Pages/Auth/types";

export const useIsLoggedIn = () => useSelector(({ login }: TState<TAuthState>) => login.isLoggedIn);
