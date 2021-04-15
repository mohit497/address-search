import { makeVar } from "@apollo/client";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Address } from "./address";

// shape of your local state
export interface AppState {
  searchString: string;
  results: Address[];
  orgid: number| null;
  selectedAddress: Address | null;
  favourites: Address[];
  notification: string | null;
  showFav:boolean;
}

const initialState = {
  searchString: "",
  results: [],
  orgid: null,
  selectedAddress: null,
  favourites: [],
  notification: null,
  showFav: false
};

export const appState = makeVar<AppState>(initialState);
