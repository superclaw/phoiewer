import { useSelector } from "react-redux";
import { TState } from "./types";
import { TAuthState } from "pages/Auth/reducer";

export const useAuth = () => useSelector(({ login }: TState<TAuthState>) => login);
